import "server-only";
import { ADMIN_EMAILS, DEMO, today } from "@/lib/config";
import { IDEAS } from "@/lib/ideas";
import { supabaseAdmin } from "@/lib/supabase/server";
import { NICK_RULE, SCORE, tierFor, type TierInfo } from "@/lib/tiers";
import { demoSpinDays, type Viewer } from "@/lib/wallet";

export const BUCKET = "proofs";
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024;
export const VIDEO_TYPES: Record<string, string> = { "video/mp4": "mp4", "video/quicktime": "mov", "video/webm": "webm" };
const UPLOADS_PER_DAY = 3;
const BOARD_SIZE = 50;
const LINK_SECONDS = 60 * 60;

export type Range = "week" | "all";
export interface BoardRow { place: number; nickname: string; you: boolean; value: number; detail: string }
export interface FeedVideo {
  id: string; nickname: string; idea: string; caption: string | null; likes: number; liked: boolean; mine: boolean; url: string; at: string;
}
export interface PendingVideo { id: string; nickname: string; idea: string; caption: string | null; url: string; at: string }

const ideaName = (id: string) => IDEAS.find((i) => i.id === id)?.name ?? "A SpinDay idea";
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
const weekAgo = () => new Date(Date.now() - 7 * 864e5);
function daysBefore(day: string, n: number) {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

// ---------- Demo backend: kept in server memory, with a few pretend players so the boards aren't empty ----------
type DemoVideo = { id: string; owner: string; idea_id: string; caption: string | null; status: string; created_at: string; type?: string; buf?: Buffer };
type DemoRanks = { profiles: Map<string, string>; videos: DemoVideo[]; likes: Map<string, string> /* video|owner → at */ };
const g = globalThis as unknown as { __spinRanks?: DemoRanks };
const demo: DemoRanks = (g.__spinRanks ??= { profiles: new Map(), videos: [], likes: new Map() });
const SEED = [
  { nickname: "maya.edits", videos: 4, likes: 31, days: 19, current: 12, best: 14 },
  { nickname: "jordan_builds", videos: 3, likes: 12, days: 23, current: 23, best: 23 },
  { nickname: "sam.writes", videos: 1, likes: 6, days: 9, current: 3, best: 6 },
  { nickname: "priya_v", videos: 2, likes: 2, days: 14, current: 0, best: 8 },
];

// ---------- nicknames ----------
const BLOCKED = /(fuck|shit|cunt|nigg|fag|bitch|whore|slut|rape|nazi|hitler|porn|admin|spinday|support)/i;
export function cleanNick(raw: unknown): string | null {
  const n = String(raw ?? "").trim();
  if (!/^[A-Za-z0-9._]{3,20}$/.test(n) || BLOCKED.test(n)) return null;
  return n;
}

export async function getNickname(owner: string): Promise<string | null> {
  if (DEMO) return demo.profiles.get(owner) ?? null;
  const { data } = await supabaseAdmin().from("profiles").select("nickname").eq("owner", owner).maybeSingle();
  return data?.nickname ?? null;
}

export async function setNickname(v: Viewer, raw: unknown): Promise<{ ok: true; nickname: string } | { ok: false; error: string }> {
  if (v.guest) return { ok: false, error: "Sign in first." };
  const nick = cleanNick(raw);
  if (!nick) return { ok: false, error: `Use ${NICK_RULE}.` };
  if (DEMO) {
    const taken = [...demo.profiles].some(([o, n]) => o !== v.owner && n.toLowerCase() === nick.toLowerCase())
      || SEED.some((s) => s.nickname.toLowerCase() === nick.toLowerCase());
    if (taken) return { ok: false, error: "That name is taken." };
    demo.profiles.set(v.owner, nick);
    return { ok: true, nickname: nick };
  }
  const { error } = await supabaseAdmin().from("profiles").upsert({ owner: v.owner, nickname: nick }, { onConflict: "owner" });
  if (error) return { ok: false, error: error.code === "23505" ? "That name is taken." : "Couldn't save that. Try again." };
  return { ok: true, nickname: nick };
}

export function isAdmin(v: Viewer | null): boolean {
  if (!v || v.guest) return false;
  if (DEMO && !ADMIN_EMAILS.length) return true;
  return !!v.email && ADMIN_EMAILS.includes(v.email.toLowerCase());
}

// ---------- your rank ----------
export async function myStats(owner: string): Promise<{ videos: number; likes: number; pending: number; tier: TierInfo }> {
  let videos = 0, likes = 0, pending = 0;
  if (DEMO) {
    const mine = demo.videos.filter((x) => x.owner === owner);
    videos = mine.filter((x) => x.status === "approved").length;
    pending = mine.filter((x) => x.status === "pending").length;
    const ids = new Set(mine.filter((x) => x.status === "approved").map((x) => x.id));
    demo.likes.forEach((_, k) => { if (ids.has(k.split("|")[0])) likes++; });
  } else {
    const db = supabaseAdmin();
    const { data } = await db.from("videos").select("id, status").eq("owner", owner).in("status", ["approved", "pending"]);
    const approved = (data ?? []).filter((x) => x.status === "approved").map((x) => x.id);
    videos = approved.length;
    pending = (data ?? []).length - videos;
    if (approved.length) {
      const { count } = await db.from("video_likes").select("video_id", { count: "exact", head: true }).in("video_id", approved);
      likes = count ?? 0;
    }
  }
  return { videos, likes, pending, tier: tierFor(videos * SCORE.video + likes * SCORE.like) };
}

// ---------- uploading ----------
export type UploadStart =
  | { ok: true; id: string; path: string; token?: string; demo?: boolean }
  | { ok: false; status: number; error: string };

export async function startUpload(v: Viewer, body: { idea?: unknown; caption?: unknown; type?: unknown; size?: unknown }): Promise<UploadStart> {
  if (v.guest) return { ok: false, status: 401, error: "Sign in to post a video." };
  if (!(await getNickname(v.owner))) return { ok: false, status: 409, error: "Pick your leaderboard name first." };
  const ideaId = String(body.idea ?? "");
  if (!IDEAS.some((i) => i.id === ideaId)) return { ok: false, status: 400, error: "Pick which idea you did." };
  const type = String(body.type ?? "");
  const ext = VIDEO_TYPES[type];
  if (!ext) return { ok: false, status: 400, error: "Use an MP4, MOV or WebM video." };
  const size = Number(body.size);
  if (!(size > 0) || size > MAX_VIDEO_BYTES) return { ok: false, status: 400, error: "Videos can be up to 50 MB. Trim it or record at a lower quality." };
  const caption = String(body.caption ?? "").replace(/\s+/g, " ").trim().slice(0, 140) || null;
  const since = new Date(Date.now() - 864e5).toISOString();
  const id = crypto.randomUUID();
  const path = `${v.owner.replace(/[^A-Za-z0-9-]/g, "_")}/${id}.${ext}`;

  if (DEMO) {
    if (demo.videos.filter((x) => x.owner === v.owner && x.created_at >= since).length >= UPLOADS_PER_DAY)
      return { ok: false, status: 429, error: "That's 3 videos today. Post more tomorrow." };
    demo.videos.push({ id, owner: v.owner, idea_id: ideaId, caption, status: "uploading", created_at: new Date().toISOString() });
    return { ok: true, id, path, demo: true };
  }
  const db = supabaseAdmin();
  const { count } = await db.from("videos").select("id", { count: "exact", head: true }).eq("owner", v.owner).gte("created_at", since);
  if ((count ?? 0) >= UPLOADS_PER_DAY) return { ok: false, status: 429, error: "That's 3 videos today. Post more tomorrow." };
  const { error } = await db.from("videos").insert({ id, owner: v.owner, idea_id: ideaId, caption, path, status: "uploading" });
  if (error) throw error;
  const { data, error: e2 } = await db.storage.from(BUCKET).createSignedUploadUrl(path);
  if (e2 || !data) throw e2 ?? new Error("no upload link");
  return { ok: true, id, path: data.path, token: data.token };
}

/** Preview mode: the file comes straight to the server and stays in memory. */
export function demoSaveFile(owner: string, id: string, type: string, buf: Buffer): boolean {
  const vid = demo.videos.find((x) => x.id === id && x.owner === owner && x.status === "uploading");
  if (!vid) return false;
  vid.buf = buf; vid.type = type; vid.status = "pending";
  return true;
}
export function demoFile(id: string): { type: string; buf: Buffer } | null {
  const vid = demo.videos.find((x) => x.id === id);
  return vid?.buf && vid.type ? { type: vid.type, buf: vid.buf } : null;
}

/** After the browser has uploaded the file: check it's really there, then queue it for review. */
export async function finishUpload(owner: string, id: string): Promise<boolean> {
  if (DEMO) return demo.videos.some((x) => x.id === id && x.owner === owner && x.status === "pending");
  const db = supabaseAdmin();
  const { data: row } = await db.from("videos").select("path, status").eq("id", id).eq("owner", owner).maybeSingle();
  if (!row || row.status !== "uploading") return false;
  const slash = row.path.lastIndexOf("/");
  const { data: files } = await db.storage.from(BUCKET).list(row.path.slice(0, slash), { search: row.path.slice(slash + 1) });
  if (!files?.some((f) => f.name === row.path.slice(slash + 1))) return false;
  const { error } = await db.from("videos").update({ status: "pending" }).eq("id", id).eq("status", "uploading");
  return !error;
}

// ---------- watching and liking ----------
async function links(rows: { id: string; path?: string }[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  if (DEMO) { rows.forEach((r) => out.set(r.id, `/api/videos/file?id=${r.id}`)); return out; }
  const withPath = rows.filter((r) => r.path);
  if (!withPath.length) return out;
  const { data } = await supabaseAdmin().storage.from(BUCKET).createSignedUrls(withPath.map((r) => r.path!), LINK_SECONDS);
  const byPath = new Map((data ?? []).filter((d) => d.signedUrl).map((d) => [d.path, d.signedUrl]));
  withPath.forEach((r) => { const u = byPath.get(r.path!); if (u) out.set(r.id, u); });
  return out;
}

async function nicknames(owners: string[]): Promise<Map<string, string>> {
  if (DEMO) return new Map(owners.map((o) => [o, demo.profiles.get(o) ?? "someone"]));
  if (!owners.length) return new Map();
  const { data } = await supabaseAdmin().from("profiles").select("owner, nickname").in("owner", [...new Set(owners)]);
  return new Map((data ?? []).map((p) => [p.owner, p.nickname]));
}

export async function feed(viewer: string | null, limit = 30): Promise<FeedVideo[]> {
  let rows: { id: string; owner: string; idea_id: string; caption: string | null; path?: string; created_at: string }[];
  let likeRows: { video_id: string; owner: string }[];
  if (DEMO) {
    rows = demo.videos.filter((x) => x.status === "approved").sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, limit);
    likeRows = [...demo.likes.keys()].map((k) => { const [video_id, owner] = k.split("|"); return { video_id, owner }; });
  } else {
    const db = supabaseAdmin();
    const { data } = await db.from("videos").select("id, owner, idea_id, caption, path, created_at").eq("status", "approved").order("created_at", { ascending: false }).limit(limit);
    rows = data ?? [];
    const { data: l } = rows.length ? await db.from("video_likes").select("video_id, owner").in("video_id", rows.map((r) => r.id)) : { data: [] };
    likeRows = l ?? [];
  }
  const [urls, names] = await Promise.all([links(rows), nicknames(rows.map((r) => r.owner))]);
  return rows.filter((r) => urls.has(r.id)).map((r) => {
    const mine = likeRows.filter((l) => l.video_id === r.id);
    return {
      id: r.id, nickname: names.get(r.owner) ?? "someone", idea: ideaName(r.idea_id), caption: r.caption,
      likes: mine.length, liked: !!viewer && mine.some((l) => l.owner === viewer), mine: r.owner === viewer, url: urls.get(r.id)!, at: r.created_at,
    };
  });
}

export async function toggleLike(v: Viewer, videoId: string): Promise<{ ok: true; liked: boolean; likes: number } | { ok: false; status: number; error: string }> {
  if (v.guest) return { ok: false, status: 401, error: "Sign in to like videos." };
  if (DEMO) {
    const vid = demo.videos.find((x) => x.id === videoId && x.status === "approved");
    if (!vid) return { ok: false, status: 404, error: "Video not found." };
    if (vid.owner === v.owner) return { ok: false, status: 400, error: "You can't like your own video." };
    const key = `${videoId}|${v.owner}`;
    const liked = !demo.likes.has(key);
    if (liked) demo.likes.set(key, new Date().toISOString()); else demo.likes.delete(key);
    return { ok: true, liked, likes: [...demo.likes.keys()].filter((k) => k.startsWith(`${videoId}|`)).length };
  }
  const db = supabaseAdmin();
  const { data: vid } = await db.from("videos").select("owner").eq("id", videoId).eq("status", "approved").maybeSingle();
  if (!vid) return { ok: false, status: 404, error: "Video not found." };
  if (vid.owner === v.owner) return { ok: false, status: 400, error: "You can't like your own video." };
  const { data: had } = await db.from("video_likes").select("video_id").eq("video_id", videoId).eq("owner", v.owner).maybeSingle();
  if (had) await db.from("video_likes").delete().eq("video_id", videoId).eq("owner", v.owner);
  else await db.from("video_likes").upsert({ video_id: videoId, owner: v.owner }, { onConflict: "video_id,owner", ignoreDuplicates: true });
  const { count } = await db.from("video_likes").select("video_id", { count: "exact", head: true }).eq("video_id", videoId);
  return { ok: true, liked: !had, likes: count ?? 0 };
}

// ---------- reviewing (admin) ----------
export async function pendingVideos(): Promise<PendingVideo[]> {
  let rows: { id: string; owner: string; idea_id: string; caption: string | null; path?: string; created_at: string }[];
  if (DEMO) rows = demo.videos.filter((x) => x.status === "pending");
  else {
    const { data } = await supabaseAdmin().from("videos").select("id, owner, idea_id, caption, path, created_at").eq("status", "pending").order("created_at").limit(50);
    rows = data ?? [];
  }
  const [urls, names] = await Promise.all([links(rows), nicknames(rows.map((r) => r.owner))]);
  return rows.map((r) => ({ id: r.id, nickname: names.get(r.owner) ?? "someone", idea: ideaName(r.idea_id), caption: r.caption, url: urls.get(r.id) ?? "", at: r.created_at }));
}

export async function review(id: string, approve: boolean): Promise<boolean> {
  const status = approve ? "approved" : "rejected";
  if (DEMO) {
    const vid = demo.videos.find((x) => x.id === id && x.status === "pending");
    if (!vid) return false;
    vid.status = status;
    if (!approve) vid.buf = undefined;
    return true;
  }
  const db = supabaseAdmin();
  const { data, error } = await db.from("videos").update({ status, reviewed_at: new Date().toISOString() }).eq("id", id).eq("status", "pending").select("path").maybeSingle();
  if (error || !data) return false;
  if (!approve) await db.storage.from(BUCKET).remove([data.path]); // rejected files aren't kept
  return true;
}

// ---------- leaderboards ----------
function finish(rows: { owner: string; nickname: string; value: number; detail: string }[], viewer: string | null): BoardRow[] {
  let place = 0, last = NaN;
  return rows.map((r, i) => {
    if (r.value !== last) { place = i + 1; last = r.value; }
    return { place, nickname: r.nickname, you: r.owner === viewer, value: r.value, detail: r.detail };
  });
}

export async function boardVideos(range: Range, viewer: string | null): Promise<BoardRow[]> {
  const since = range === "week" ? weekAgo() : new Date(0);
  let rows: { owner: string; nickname: string; videos: number; likes: number; points: number }[];
  if (DEMO) {
    const iso = since.toISOString();
    const map = new Map<string, { videos: number; likes: number }>();
    const bump = (o: string, k: "videos" | "likes") => { const e = map.get(o) ?? { videos: 0, likes: 0 }; e[k]++; map.set(o, e); };
    demo.videos.filter((x) => x.status === "approved" && x.created_at >= iso).forEach((x) => bump(x.owner, "videos"));
    demo.likes.forEach((at, k) => { const vid = demo.videos.find((x) => x.id === k.split("|")[0]); if (vid && at >= iso) bump(vid.owner, "likes"); });
    rows = [
      ...[...map].map(([owner, e]) => ({ owner, nickname: demo.profiles.get(owner) ?? "someone", ...e, points: e.videos * SCORE.video + e.likes * SCORE.like })),
      ...SEED.map((s) => {
        const k = range === "week" ? 0.5 : 1;
        const videos = Math.round(s.videos * k), likes = Math.round(s.likes * k);
        return { owner: `seed:${s.nickname}`, nickname: s.nickname, videos, likes, points: videos * SCORE.video + likes * SCORE.like };
      }),
    ].filter((r) => r.points > 0).sort((a, b) => b.points - a.points).slice(0, BOARD_SIZE);
  } else {
    const { data, error } = await supabaseAdmin().rpc("board_videos", { p_since: since.toISOString(), p_video_pts: SCORE.video, p_like_pts: SCORE.like, p_limit: BOARD_SIZE });
    if (error) throw error;
    rows = data ?? [];
  }
  return finish(rows.map((r) => ({ owner: r.owner, nickname: r.nickname, value: r.points, detail: `${plural(r.videos, "video")} · ${plural(r.likes, "like")}` })), viewer);
}

export async function boardSpins(range: Range, viewer: string | null): Promise<BoardRow[]> {
  const since = range === "week" ? daysBefore(today(), 6) : "2000-01-01";
  let rows: { owner: string; nickname: string; days: number }[];
  if (DEMO) {
    rows = [
      ...[...demoSpinDays()].filter(([o]) => demo.profiles.has(o)).map(([owner, days]) => ({ owner, nickname: demo.profiles.get(owner)!, days: new Set(days.filter((d) => d >= since)).size })),
      ...SEED.map((s) => ({ owner: `seed:${s.nickname}`, nickname: s.nickname, days: range === "week" ? Math.min(7, s.current || 2) : s.days })),
    ].filter((r) => r.days > 0).sort((a, b) => b.days - a.days).slice(0, BOARD_SIZE);
  } else {
    const { data, error } = await supabaseAdmin().rpc("board_spins", { p_since: since, p_limit: BOARD_SIZE });
    if (error) throw error;
    rows = data ?? [];
  }
  return finish(rows.map((r) => ({ owner: r.owner, nickname: r.nickname, value: r.days, detail: plural(r.days, "day") + " spun" })), viewer);
}

export async function boardStreaks(viewer: string | null): Promise<BoardRow[]> {
  const t = today();
  let rows: { owner: string; nickname: string; current: number; best: number }[];
  if (DEMO) {
    const streaks = (days: string[]) => {
      const sorted = [...new Set(days)].sort();
      let best = 0, run = 0, prev = "", current = 0;
      for (const d of sorted) { run = prev && daysBefore(d, 1) === prev ? run + 1 : 1; best = Math.max(best, run); prev = d; }
      if (prev === t || prev === daysBefore(t, 1)) current = run;
      return { current, best };
    };
    rows = [
      ...[...demoSpinDays()].filter(([o]) => demo.profiles.has(o)).map(([owner, days]) => ({ owner, nickname: demo.profiles.get(owner)!, ...streaks(days) })),
      ...SEED.map((s) => ({ owner: `seed:${s.nickname}`, nickname: s.nickname, current: s.current, best: s.best })),
    ].filter((r) => r.best > 0).sort((a, b) => b.current - a.current || b.best - a.best).slice(0, BOARD_SIZE);
  } else {
    const { data, error } = await supabaseAdmin().rpc("board_streaks", { p_today: t, p_limit: BOARD_SIZE });
    if (error) throw error;
    rows = data ?? [];
  }
  return finish(rows.map((r) => ({ owner: r.owner, nickname: r.nickname, value: r.current, detail: `Best ${plural(r.best, "day")}` })), viewer);
}
