"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Pending { id: string; nickname: string; idea: string; caption: string | null; url: string; at: string }

// Approve or reject proof videos before they show on the leaderboard.
export default function AdminVideos() {
  const [list, setList] = useState<Pending[] | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    fetch("/api/admin/videos").then(async (r) => {
      if (r.status === 403) { setDenied(true); return; }
      setList((await r.json()).videos ?? []);
    }).catch(() => setList([]));
  }, []);

  const decide = async (id: string, approve: boolean) => {
    setList((l) => l?.filter((v) => v.id !== id) ?? null);
    await fetch("/api/admin/videos", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, approve }) });
  };

  return (
    <main className="lb in">
      <div className="lbhead">
        <h1>Review videos</h1>
        <p>Approve proof that shows someone actually doing a SpinDay idea. Reject anything with private info, hate, nudity or spam. Rejected files are deleted.</p>
        <p><Link href="/leaderboard">← Back to the leaderboard</Link></p>
      </div>
      {denied ? <div className="empty"><h3>Not allowed</h3><p>Sign in with an email listed in ADMIN_EMAILS.</p></div>
        : list === null ? <div className="rows skel" />
        : list.length === 0 ? <div className="empty"><h3>All caught up</h3><p>No videos waiting.</p></div>
        : (
          <div className="vgrid">
            {list.map((v) => (
              <article className="vcard" key={v.id}>
                {v.url ? <video src={v.url} controls playsInline preload="metadata" /> : <div className="nofile">File missing</div>}
                <div className="vmeta"><div><b>{v.nickname}</b><span>{v.idea} · {new Date(v.at).toLocaleString()}</span>{v.caption && <p>{v.caption}</p>}</div></div>
                <div className="review">
                  <button className="btn white" onClick={() => decide(v.id, false)}>Reject</button>
                  <button className="btn" onClick={() => decide(v.id, true)}>Approve</button>
                </div>
              </article>
            ))}
          </div>
        )}
    </main>
  );
}
