import "server-only";
import { cookies, headers } from "next/headers";
import { DEMO, GUEST_SPINS_PER_NETWORK, IP_SALT, RESET_TZ, today } from "@/lib/config";
import { supabaseAdmin, supabaseServer } from "@/lib/supabase/server";

/**
 * Who is spinning. Everyone gets one: people signed in with Google or email are "u:<account id>",
 * everyone else is "g:<random id>" kept in a long-lived cookie on their browser.
 */
export interface Viewer {
  owner: string;
  guest: boolean;
  email: string | null;
}
export interface Wallet {
  freeLeft: boolean;
  credits: number;
}
export type SpinKind = "free" | "paid" | "none" | "ip_limit";
export type SpinResult = { kind: SpinKind; wallet: Wallet };

export const GUEST_COOKIE = "spinday_guest";
const DEMO_COOKIE = "spinday_demo_user";
const YEAR = 60 * 60 * 24 * 365;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// ---------- Demo backend (before Supabase is connected): kept in server memory ----------
type DemoRow = { free_spin_date: string | null; credits: number; days: string[]; last?: { idea: string; at: string } };
type DemoState = { wallets: Map<string, DemoRow>; purchases: Set<string>; ips: Map<string, number> };
const g = globalThis as unknown as { __spinDemo2?: DemoState };
const demo = (g.__spinDemo2 ??= { wallets: new Map(), purchases: new Set(), ips: new Map() });
function demoRow(owner: string): DemoRow {
  let r = demo.wallets.get(owner);
  if (!r) demo.wallets.set(owner, (r = { free_spin_date: null, credits: 0, days: [] }));
  return r;
}

// ---------- identity ----------
async function signedIn(): Promise<{ id: string; email: string | null } | null> {
  if (DEMO) {
    const id = (await cookies()).get(DEMO_COOKIE)?.value;
    return id ? { id, email: decodeURIComponent(id.split(":")[1] ?? "") || null } : null;
  }
  const { data } = await (await supabaseServer()).auth.getUser();
  return data.user ? { id: data.user.id, email: data.user.email ?? null } : null;
}

/**
 * The current visitor. With create=true a guest id is made (and saved in a cookie) if there isn't one;
 * only route handlers may pass create=true, because they are allowed to set cookies.
 */
export async function getViewer(create = false): Promise<Viewer | null> {
  const user = await signedIn();
  if (user) return { owner: `u:${user.id}`, guest: false, email: user.email };
  const jar = await cookies();
  let id = jar.get(GUEST_COOKIE)?.value;
  if (!id || !UUID.test(id)) {
    if (!create) return null;
    id = crypto.randomUUID();
    jar.set(GUEST_COOKIE, id, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: YEAR });
  }
  return { owner: `g:${id}`, guest: true, email: null };
}

/** Salted hash of the visitor's network address, so it can be counted without being stored. */
export async function networkHash(): Promise<string> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "local").trim();
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${IP_SALT}|${ip}`));
  return Buffer.from(bytes).toString("base64url");
}

export async function demoSignIn(email: string) {
  (await cookies()).set(DEMO_COOKIE, `demo:${encodeURIComponent(email)}`, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
}
export async function demoSignOut() {
  (await cookies()).delete(DEMO_COOKIE);
}

// ---------- wallet ----------
export async function getWallet(owner: string): Promise<Wallet> {
  const t = today();
  if (DEMO) {
    const r = demoRow(owner);
    return { freeLeft: r.free_spin_date !== t, credits: r.credits };
  }
  const { data } = await supabaseAdmin().from("wallets").select("free_spin_date, credits").eq("owner", owner).maybeSingle();
  return { freeLeft: !data || data.free_spin_date !== t, credits: data?.credits ?? 0 };
}

/** Days in a row (ending today or yesterday) with at least one spin. */
function streakFrom(days: string[]): number {
  const set = new Set(days);
  const d = new Date(`${today()}T12:00:00Z`);
  if (!set.has(today())) d.setUTCDate(d.getUTCDate() - 1);
  let n = 0;
  while (set.has(d.toISOString().slice(0, 10))) { n++; d.setUTCDate(d.getUTCDate() - 1); }
  return n;
}

/** Today's most recent idea (so the plan survives a reload) and the current streak. */
export async function history(owner: string): Promise<{ last: string | null; streak: number }> {
  const t = today();
  if (DEMO) {
    const r = demoRow(owner);
    return { last: r.last && r.last.at === t ? r.last.idea : null, streak: streakFrom(r.days) };
  }
  const { data } = await supabaseAdmin()
    .from("spins")
    .select("idea_id, spin_day")
    .eq("owner", owner)
    .order("created_at", { ascending: false })
    .limit(200);
  const rows = data ?? [];
  return { last: rows[0]?.spin_day === t ? rows[0].idea_id : null, streak: streakFrom(rows.map((r) => r.spin_day)) };
}

/** Atomically spends today's free spin (guests: if their network still has one today), or one paid spin. */
export async function spendSpin(v: Viewer, ideaId: string, filters: unknown): Promise<SpinResult> {
  const t = today();
  const ip = v.guest ? await networkHash() : null;
  if (DEMO) {
    const r = demoRow(v.owner);
    let kind: SpinKind = "none";
    if (r.free_spin_date !== t) {
      const key = `${t}|${ip}`;
      const used = ip ? demo.ips.get(key) ?? 0 : 0;
      if (!ip || used < GUEST_SPINS_PER_NETWORK) {
        if (ip) demo.ips.set(key, used + 1);
        r.free_spin_date = t;
        kind = "free";
      } else kind = "ip_limit";
    }
    if (kind !== "free" && r.credits > 0) { r.credits--; kind = "paid"; }
    if (kind === "free" || kind === "paid") { r.last = { idea: ideaId, at: t }; r.days.push(t); }
    return { kind, wallet: { freeLeft: r.free_spin_date !== t, credits: r.credits } };
  }
  const { data, error } = await supabaseAdmin().rpc("use_spin", {
    p_owner: v.owner, p_today: t, p_idea: ideaId, p_filters: filters, p_ip_hash: ip, p_ip_limit: GUEST_SPINS_PER_NETWORK,
  });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  const freeLeft = row.kind === "ip_limit" ? false : row.free_spin_date !== t;
  return { kind: row.kind, wallet: { freeLeft, credits: row.credits } };
}

/** Credits a purchase once per checkout session. */
export async function addCredits(sessionId: string, owner: string, spins: number, amount: number | null, currency: string | null) {
  if (DEMO) {
    if (demo.purchases.has(sessionId)) return false;
    demo.purchases.add(sessionId);
    demoRow(owner).credits += spins;
    return true;
  }
  const { data, error } = await supabaseAdmin().rpc("add_credits", {
    p_session: sessionId, p_owner: owner, p_spins: spins, p_amount: amount, p_currency: currency,
  });
  if (error) throw error;
  return data === true;
}

/** Moves a guest's spins, streak and purchases onto the account they just signed in to. */
export async function mergeGuestInto(userOwner: string) {
  const jar = await cookies();
  const id = jar.get(GUEST_COOKIE)?.value;
  if (!id || !UUID.test(id)) return;
  const from = `g:${id}`;
  if (DEMO) {
    const f = demo.wallets.get(from);
    if (f) {
      const to = demoRow(userOwner);
      to.credits += f.credits;
      if (!to.free_spin_date || (f.free_spin_date && f.free_spin_date > to.free_spin_date)) to.free_spin_date = f.free_spin_date;
      to.days.push(...f.days);
      if (f.last && (!to.last || f.last.at >= to.last.at)) to.last = f.last;
      demo.wallets.delete(from);
    }
  } else {
    const { error } = await supabaseAdmin().rpc("merge_owner", { p_from: from, p_to: userOwner });
    if (error) throw error;
  }
  jar.delete(GUEST_COOKIE);
}

export { RESET_TZ };
