import "server-only";
import { cookies } from "next/headers";
import { DEMO, today } from "@/lib/config";
import { supabaseAdmin, supabaseServer } from "@/lib/supabase/server";

export interface Viewer {
  id: string;
  email: string | null;
}
export interface Wallet {
  freeLeft: boolean;
  credits: number;
}
export type SpinResult = { kind: "free" | "paid" | "none"; wallet: Wallet };

// ---------- Demo backend (no accounts yet): everything lives in server memory ----------
type DemoRow = { free_spin_date: string | null; credits: number; last?: { idea: string; at: string } ; purchases: Set<string> };
const g = globalThis as unknown as { __spinDemo?: Map<string, DemoRow> };
const demo = (g.__spinDemo ??= new Map());
const DEMO_COOKIE = "spinday_demo_user";
function demoRow(id: string): DemoRow {
  let r = demo.get(id);
  if (!r) demo.set(id, (r = { free_spin_date: null, credits: 0, purchases: new Set() }));
  return r;
}

// ---------- Shared API ----------
export async function getViewer(): Promise<Viewer | null> {
  if (DEMO) {
    const id = (await cookies()).get(DEMO_COOKIE)?.value;
    return id ? { id, email: decodeURIComponent(id.split(":")[1] ?? "") || null } : null;
  }
  const { data } = await (await supabaseServer()).auth.getUser();
  return data.user ? { id: data.user.id, email: data.user.email ?? null } : null;
}

export async function demoSignIn(email: string) {
  (await cookies()).set(DEMO_COOKIE, `demo:${encodeURIComponent(email)}`, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
}
export async function demoSignOut() {
  (await cookies()).delete(DEMO_COOKIE);
}

export async function getWallet(userId: string): Promise<Wallet> {
  const t = today();
  if (DEMO) {
    const r = demoRow(userId);
    return { freeLeft: r.free_spin_date !== t, credits: r.credits };
  }
  const { data } = await supabaseAdmin().from("wallets").select("free_spin_date, credits").eq("user_id", userId).maybeSingle();
  return { freeLeft: !data || data.free_spin_date !== t, credits: data?.credits ?? 0 };
}

/** The idea this account landed on most recently today, if any. */
export async function lastSpinToday(userId: string): Promise<string | null> {
  const t = today();
  if (DEMO) {
    const l = demoRow(userId).last;
    return l && l.at === t ? l.idea : null;
  }
  const { data } = await supabaseAdmin()
    .from("spins")
    .select("idea_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data) return null;
  return today(new Date(data.created_at)) === t ? data.idea_id : null;
}

/** Atomically spends today's free spin, or one paid spin. */
export async function spendSpin(userId: string, ideaId: string, filters: unknown): Promise<SpinResult> {
  const t = today();
  if (DEMO) {
    const r = demoRow(userId);
    let kind: SpinResult["kind"] = "none";
    if (r.free_spin_date !== t) { r.free_spin_date = t; kind = "free"; }
    else if (r.credits > 0) { r.credits--; kind = "paid"; }
    if (kind !== "none") r.last = { idea: ideaId, at: t };
    return { kind, wallet: { freeLeft: r.free_spin_date !== t, credits: r.credits } };
  }
  const { data, error } = await supabaseAdmin().rpc("use_spin", { p_user: userId, p_today: t, p_idea: ideaId, p_filters: filters });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  return { kind: row.kind, wallet: { freeLeft: row.free_spin_date !== t, credits: row.credits } };
}

/** Credits a purchase once per checkout session. */
export async function addCredits(sessionId: string, userId: string, spins: number, amount: number | null, currency: string | null) {
  if (DEMO) {
    const r = demoRow(userId);
    if (r.purchases.has(sessionId)) return false;
    r.purchases.add(sessionId);
    r.credits += spins;
    return true;
  }
  const { data, error } = await supabaseAdmin().rpc("add_credits", {
    p_session: sessionId, p_user: userId, p_spins: spins, p_amount: amount, p_currency: currency,
  });
  if (error) throw error;
  return data === true;
}
