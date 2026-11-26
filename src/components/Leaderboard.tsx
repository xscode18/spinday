"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { NICK_RULE, SCORE, TIERS } from "@/lib/tiers";

type Board = "videos" | "spins" | "streaks";
type Range = "week" | "all";
interface Row { place: number; nickname: string; you: boolean; value: number; detail: string }
interface Video { id: string; nickname: string; idea: string; caption: string | null; likes: number; liked: boolean; mine: boolean; url: string; at: string }
interface Tier { name: string; points: number; next: { name: string; min: number } | null; progress: number }
interface Profile { signedIn: boolean; nickname?: string | null; admin?: boolean; videos?: number; likes?: number; pending?: number; tier?: Tier }
interface Props { demo: boolean; ideas: { id: string; name: string }[]; supabaseUrl: string; supabaseAnonKey: string }

const BOARDS: { id: Board; label: string; unit: string; blurb: string }[] = [
  { id: "videos", label: "Videos uploaded", unit: "pts", blurb: `Post a video of you doing your spin. ${SCORE.video} points when it's approved, ${SCORE.like} more for every like.` },
  { id: "spins", label: "Spins", unit: "days", blurb: "Days you spun. Only one spin a day counts, so buying spins doesn't buy rank." },
  { id: "streaks", label: "Streaks", unit: "days", blurb: "Days in a row you've spun. Miss a day and it starts over." },
];
const ACCEPT = "video/mp4,video/quicktime,video/webm";
const MAX_MB = 50;

async function post<T = Record<string, unknown>>(url: string, body: unknown): Promise<{ ok: boolean; j: T & { error?: string } }> {
  const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  return { ok: r.ok, j: await r.json().catch(() => ({})) };
}

export default function Leaderboard({ demo, ideas, supabaseUrl, supabaseAnonKey }: Props) {
  const router = useRouter();
  const q = useSearchParams().get("board");
  const initialBoard: Board = q === "spins" || q === "streaks" ? q : "videos";
  const [board, setBoard] = useState<Board>(initialBoard);
  const [range, setRange] = useState<Range>("all");
  const [data, setData] = useState<{ key: string; rows: Row[] } | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [me, setMe] = useState<Profile | null>(null);
  const [nick, setNick] = useState("");
  const [nickErr, setNickErr] = useState("");
  const [upload, setUpload] = useState(false);
  const [todayIdea, setTodayIdea] = useState<string>("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastT = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((m: string) => {
    setToastMsg(m);
    if (toastT.current) clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToastMsg(null), 3200);
  }, []);

  const loadMe = useCallback(async () => {
    const r = await fetch("/api/profile").then((x) => x.json()).catch(() => ({ signedIn: false }));
    setMe(r);
  }, []);
  const loadVideos = useCallback(async () => {
    const r = await fetch("/api/videos").then((x) => x.json()).catch(() => ({ videos: [] }));
    setVideos(r.videos ?? []);
  }, []);

  useEffect(() => {
    (async () => { await loadMe(); await loadVideos(); })();
    fetch("/api/me").then((x) => x.json()).then((j) => j.last?.id && setTodayIdea(j.last.id)).catch(() => {});
  }, [loadMe, loadVideos]);

  const key = `${board}|${range}|${me?.nickname ?? ""}`;
  const rows = data?.key === key ? data.rows : null;
  useEffect(() => {
    let live = true;
    fetch(`/api/leaderboard?board=${board}&range=${range}`).then((x) => x.json())
      .then((j) => live && setData({ key, rows: j.rows ?? [] }))
      .catch(() => live && setData({ key, rows: [] }));
    return () => { live = false; };
  }, [board, range, key]);

  const pickTab = (b: Board) => {
    setBoard(b);
    history.replaceState(null, "", b === "videos" ? "/leaderboard" : `/leaderboard?board=${b}`);
  };

  const saveNick = async (e: React.FormEvent) => {
    e.preventDefault();
    setNickErr("");
    const { ok, j } = await post<{ nickname?: string }>("/api/profile", { nickname: nick });
    if (!ok) { setNickErr(j.error ?? "Couldn't save that."); return; }
    toast(`You're on the board as ${j.nickname}.`);
    loadMe();
  };

  const like = async (v: Video) => {
    if (!me?.signedIn) { router.push("/?join=1"); return; }
    const { ok, j } = await post<{ liked: boolean; likes: number }>("/api/videos/like", { id: v.id });
    if (!ok) { toast(j.error ?? "Couldn't like that."); return; }
    setVideos((list) => list.map((x) => (x.id === v.id ? { ...x, liked: j.liked, likes: j.likes } : x)));
  };

  const cur = BOARDS.find((b) => b.id === board)!;
  const tier = me?.tier;
  const youRow = rows?.find((r) => r.you);

  return (
    <>
      {demo && <div className="notice"><b>Preview mode.</b> Sign-in is pretend and some players are made up until the accounts are connected.</div>}
      <header className="topbar">
        <div className="in">
          <Link href="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>spin<i>day</i></Link>
          <div className="right">
            {me?.admin && <Link className="pill" href="/admin">Review videos</Link>}
            <Link className="signbtn" href="/" style={{ textDecoration: "none" }}>Spin</Link>
          </div>
        </div>
      </header>

      <main className="lb in">
        <div className="lbhead">
          <h1>Leaderboard</h1>
          <p>Prove you did it. Post the video, collect likes, climb the ranks.</p>
        </div>

        {/* your rank */}
        <section className="rankcard" aria-label="Your rank">
          {!me ? <div className="rk-skel" /> : !me.signedIn ? (
            <div className="rk-row">
              <div><span className="rk-label">Your rank</span><strong className="rk-name">Unranked</strong><p>Sign in with Google or email to post videos and show up here.</p></div>
              <Link className="btn white" href="/?join=1">Sign in</Link>
            </div>
          ) : !me.nickname ? (
            <form className="rk-nick" onSubmit={saveNick} noValidate>
              <div><span className="rk-label">Pick your leaderboard name</span><p>This is the only thing people see. Not your email.</p></div>
              <div className="rk-nickrow">
                <label className="sr" htmlFor="nick">Name</label>
                <input id="nick" value={nick} onChange={(e) => setNick(e.target.value)} placeholder="e.g. maya.edits" maxLength={20} autoComplete="nickname" />
                <button className="btn" type="submit">Save</button>
              </div>
              <small className={nickErr ? "err" : ""}>{nickErr || NICK_RULE}</small>
            </form>
          ) : tier && (
            <div className="rk-row">
              <div className="rk-main">
                <span className="rk-label">{me.nickname}{youRow ? ` · #${youRow.place} on ${cur.label.toLowerCase()}` : ""}</span>
                <strong className="rk-name">{tier.name}</strong>
                <div className="rk-bar" aria-hidden="true"><i style={{ width: `${Math.round(tier.progress * 100)}%` }} /></div>
                <p>
                  <b>{tier.points} pts</b> · {me.videos} video{me.videos === 1 ? "" : "s"} · {me.likes} like{me.likes === 1 ? "" : "s"}
                  {tier.next ? <> · {tier.next.min - tier.points} to {tier.next.name}</> : <> · top rank</>}
                  {me.pending ? <> · {me.pending} waiting for review</> : null}
                </p>
              </div>
              <button className="btn" onClick={() => setUpload(true)}>Post a proof video</button>
            </div>
          )}
          <ol className="tiers" aria-label="All ranks">
            {TIERS.map((t) => <li key={t.name} className={tier?.name === t.name ? "on" : ""}><b>{t.name}</b><span>{t.min}</span></li>)}
          </ol>
        </section>

        {/* boards */}
        <div className="tabs" role="tablist" aria-label="Leaderboards">
          {BOARDS.map((b) => (
            <button key={b.id} role="tab" id={`tab-${b.id}`} aria-selected={board === b.id} aria-controls="board" onClick={() => pickTab(b.id)}>{b.label}</button>
          ))}
        </div>
        <section id="board" role="tabpanel" aria-labelledby={`tab-${board}`} className="boardpanel">
          <div className="boardtop">
            <p>{cur.blurb}</p>
            {board !== "streaks" && (
              <div className="seg" role="group" aria-label="Time range">
                <button className="chip" aria-pressed={range === "week"} onClick={() => setRange("week")}>This week</button>
                <button className="chip" aria-pressed={range === "all"} onClick={() => setRange("all")}>All time</button>
              </div>
            )}
          </div>
          {rows === null ? <div className="rows skel" /> : rows.length === 0 ? (
            <div className="empty">
              <h3>{board === "videos" ? "No videos yet" : "Nobody here yet"}</h3>
              <p>{board === "videos" ? "Be the first to post proof. First video gets you Hustler rank." : "Pick a leaderboard name and spin today to get on the board."}</p>
            </div>
          ) : (
            <ol className="rows">
              {rows.map((r, i) => (
                <li key={`${r.nickname}-${i}`} className={r.you ? "you" : ""}>
                  <span className={`place p${r.place}`}>{r.place}</span>
                  <span className="who"><b>{r.nickname}</b>{r.you && <em>you</em>}<small>{r.detail}</small></span>
                  <span className="val">{r.value}<small>{cur.unit}</small></span>
                </li>
              ))}
            </ol>
          )}
        </section>

        {board === "videos" && (
          <section className="proofs" aria-labelledby="proofh">
            <div className="bhead"><h2 id="proofh">Latest proof</h2>
              {me?.signedIn && me.nickname && <button className="btn white" onClick={() => setUpload(true)}>Post yours</button>}
            </div>
            {videos.length === 0 ? (
              <div className="empty"><h3>Nothing posted yet</h3><p>Did your spin today? Film your screen while you do it and post it here.</p></div>
            ) : (
              <div className="vgrid">
                {videos.map((v) => (
                  <article className="vcard" key={v.id}>
                    <video src={v.url} controls playsInline preload="metadata" />
                    <div className="vmeta">
                      <div><b>{v.nickname}</b><span>{v.idea}</span>{v.caption && <p>{v.caption}</p>}</div>
                      <button className="likebtn" aria-pressed={v.liked} disabled={v.mine} title={v.mine ? "Your video" : v.liked ? "Unlike" : "Like"} onClick={() => like(v)}>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.6 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.6 0 5.8 3.5 4.5 6.8-1.8 4.6-9.3 9.2-9.3 9.2z" /></svg>
                        <span>{v.likes}</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />

      {upload && (
        <UploadModal
          demo={demo} ideas={ideas} defaultIdea={todayIdea} supabaseUrl={supabaseUrl} supabaseAnonKey={supabaseAnonKey}
          onClose={() => setUpload(false)}
          onDone={() => { setUpload(false); toast("Sent! It goes live once it's checked, usually within a day."); loadMe(); }}
        />
      )}
      {toastMsg && <div className="toast" role="status">{toastMsg}</div>}
    </>
  );
}

function UploadModal({ demo, ideas, defaultIdea, supabaseUrl, supabaseAnonKey, onClose, onDone }: {
  demo: boolean; ideas: { id: string; name: string }[]; defaultIdea: string; supabaseUrl: string; supabaseAnonKey: string; onClose: () => void; onDone: () => void;
}) {
  const [idea, setIdea] = useState(defaultIdea || "");
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!idea) return setErr("Pick which idea you did.");
    if (!file) return setErr("Choose a video.");
    if (file.size > MAX_MB * 1024 * 1024) return setErr(`Videos can be up to ${MAX_MB} MB. Trim it or record at a lower quality.`);
    if (!ok) return setErr("Tick the box to confirm the rules.");
    setBusy(true);
    try {
      const start = await post<{ id: string; path: string; token?: string; demo?: boolean }>("/api/videos", { idea, caption, type: file.type, size: file.size });
      if (!start.ok) throw new Error(start.j.error ?? "Couldn't start the upload.");
      if (start.j.demo) {
        const fd = new FormData();
        fd.append("id", start.j.id);
        fd.append("file", file);
        const r = await fetch("/api/videos/demo-upload", { method: "POST", body: fd });
        if (!r.ok) throw new Error("The upload didn't go through.");
      } else {
        const sb = supabaseBrowser(supabaseUrl, supabaseAnonKey);
        const { error } = await sb.storage.from("proofs").uploadToSignedUrl(start.j.path, start.j.token!, file, { contentType: file.type });
        if (error) throw new Error("The upload didn't go through. Check your connection and try again.");
      }
      const done = await post("/api/videos/done", { id: start.j.id });
      if (!done.ok) throw new Error(done.j.error ?? "The upload didn't finish.");
      onDone();
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Something went wrong.");
      setBusy(false);
    }
  };

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="upt" onClick={(e) => e.target === e.currentTarget && !busy && onClose()}>
      <form className="mcard upload" onSubmit={send} noValidate>
        <h3 id="upt">Post your proof</h3>
        <p>Film yourself doing the idea: your screen, your work, your first message to a client. Up to {MAX_MB} MB.</p>
        <label className="fld"><span>Which idea did you do?</span>
          <select value={idea} onChange={(e) => setIdea(e.target.value)}>
            <option value="">Choose an idea</option>
            {ideas.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        </label>
        <label className="fld"><span>Video</span>
          <input type="file" accept={ACCEPT} onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <label className="fld"><span>Caption <i>(optional)</i></span>
          <input value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={140} placeholder="Day 1: sent 10 pitches" />
        </label>
        <label className="agree">
          <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />
          <span>It&apos;s my own video. No one else&apos;s private info (blur names and emails), nothing hateful, sexual or illegal. I&apos;m OK with it showing on SpinDay. <Link href="/terms#videos">Rules</Link></span>
        </label>
        {err && <p className="err" role="alert">{err}</p>}
        <button className={`btn${busy ? " busy" : ""}`} type="submit">{busy ? "Uploading…" : "Send for review"}</button>
        <p className="demo">{demo ? "Preview mode · kept in memory only" : "Every video is checked before it goes public"}</p>
      </form>
    </div>
  );
}
