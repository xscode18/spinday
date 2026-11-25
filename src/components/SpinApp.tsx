"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Footer from "@/components/Footer";
import { makeClip } from "@/components/clip";
import { supabaseBrowser } from "@/lib/supabase/browser";

/* ---------- types shared with the API ---------- */
interface GuideStep { t: string; min?: string; d?: string; go?: [string, string][]; script?: string }
interface Guide { phases: { when: string; sub: string; steps: GuideStep[] }[]; pricing: [string, string, string][]; pricenote: string; mistakes: string[] }
type Plan = { kind: "full"; guide: Guide } | { kind: "short"; steps: string[]; tools: string[] };
interface Idea { id: string; name: string; how: string; real: string; earn: string; cost: string; time: 1 | 2 | 3; diff: string; plan: Plan }
interface Wallet { freeLeft: boolean; credits: number }
interface Me { signedIn: boolean; email?: string | null; wallet?: Wallet; streak?: number; last?: Idea | null }
type Filters = { time: string; budget: string; kind: string; diff: string };

const TIME_LABEL = ["", "Under 30 min", "1–2 hours", "All day"];
const PACKS = [
  { id: "1", n: 1, price: 1, note: "" },
  { id: "5", n: 5, price: 4, note: "SAVE 20%" },
  { id: "12", n: 12, price: 9, note: "BEST DEAL" },
];
const FILTER_GROUPS: { key: keyof Filters; label: string; opts: [string, string][] }[] = [
  { key: "time", label: "Time", opts: [["1", "Under 30 min"], ["2", "1–2 hrs"], ["3", "All day"]] },
  { key: "budget", label: "Budget", opts: [["0", "$0"], ["20", "≤ $20"]] },
  { key: "kind", label: "Type", opts: [["any", "Any"], ["design", "Design"], ["video", "Video"], ["writing", "Writing"], ["helping", "Helping"]] },
  { key: "diff", label: "Level", opts: [["any", "Any"], ["Easy", "Easy"], ["Medium", "Medium"]] },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const localDay = () => new Date().toLocaleDateString("en-CA");
const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};

interface Props { names: string[]; demo: boolean; paymentsLive: boolean; supabaseUrl: string; supabaseAnonKey: string }

export default function SpinApp({ names, demo, paymentsLive, supabaseUrl, supabaseAnonKey }: Props) {
  const [filters, setFilters] = useState<Filters>({ time: "2", budget: "0", kind: "any", diff: "any" });
  const [me, setMe] = useState<Me | null>(null);
  const [idea, setIdea] = useState<Idea | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [kicker, setKicker] = useState("Today you're going to…");
  const [locked, setLocked] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [modal, setModal] = useState<null | "auth" | "pay" | "sent">(null);
  const [authCopy, setAuthCopy] = useState({ title: "Make your account", why: "" });
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [pack, setPack] = useState(PACKS[0]);
  const [busy, setBusy] = useState(false);
  const [menu, setMenu] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [landKey, setLandKey] = useState(0);
  const [nextDrop, setNextDrop] = useState("Next update soon");
  const [clipBusy, setClipBusy] = useState(false);
  const [networkUsed, setNetworkUsed] = useState(false);
  const [saveEmail, setSaveEmail] = useState("");

  const reelRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const afterAuth = useRef<null | "spin" | "pay">(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reduce = useRef(false);

  const supabase = useMemo(
    () => (supabaseUrl && supabaseAnonKey ? supabaseBrowser(supabaseUrl, supabaseAnonKey) : null),
    [supabaseUrl, supabaseAnonKey],
  );

  const toast = useCallback((m: string) => {
    setToastMsg(m);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 3200);
  }, []);

  /** Shows a landed idea and restores any progress saved for it today. */
  const showIdea = useCallback((i: Idea) => {
    let saved: { locked: boolean; checked: Record<string, boolean> } | null = null;
    try { saved = JSON.parse(store.get(`sd-plan-${localDay()}-${i.id}`) ?? "null"); } catch { /* ignore */ }
    setLocked(saved?.locked ?? false);
    setChecked(saved?.checked ?? {});
    setIdea(i);
  }, []);

  /* ---------- reel ---------- */
  const flipTo = useCallback((text: string, ms: number, cls?: string) => {
    const reel = reelRef.current;
    if (!reel) return Promise.resolve();
    const old = reel.querySelector(".word:last-child") as HTMLElement | null;
    const w = document.createElement("div");
    w.className = "word" + (cls ? " " + cls : "");
    const span = document.createElement("span");
    span.textContent = text;
    w.appendChild(span);
    reel.appendChild(w);
    if (reduce.current || ms < 1) { old?.remove(); return Promise.resolve(); }
    const landedWord = cls === "landed";
    const easing = landedWord ? "cubic-bezier(.2,1.3,.4,1)" : "linear";
    if (!landedWord && ms < 120) w.classList.add("fast");
    w.animate([{ transform: "translateY(70%) rotateX(-75deg)", opacity: 0.2 }, { transform: "translateY(0) rotateX(0)", opacity: 1 }], { duration: ms, easing, fill: "forwards" });
    old?.animate([{ transform: "translateY(0) rotateX(0)", opacity: 1 }, { transform: "translateY(-70%) rotateX(75deg)", opacity: 0 }], { duration: ms, easing, fill: "forwards" });
    return sleep(ms).then(() => old?.remove());
  }, []);

  const celebrate = useCallback(() => {
    if (reduce.current) return;
    const sc = screenRef.current, reel = reelRef.current;
    if (!sc || !reel) return;
    sc.classList.remove("flash"); void sc.offsetWidth; sc.classList.add("flash");
    const b = document.createElement("div");
    b.className = "burst";
    b.style.top = reel.offsetTop + reel.offsetHeight / 2 + "px";
    sc.appendChild(b);
    for (let i = 0; i < 22; i++) {
      const d = document.createElement("i");
      b.appendChild(d);
      const a = (Math.PI * 2 * i) / 22 + Math.random() * 0.3, r = 140 + Math.random() * 220;
      d.animate([{ transform: "translate(0,0) scale(1)", opacity: 1 }, { transform: `translate(${Math.cos(a) * r}px,${Math.sin(a) * r * 0.55}px) scale(.3)`, opacity: 0 }], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.1,.7,.3,1)", fill: "forwards" });
    }
    setTimeout(() => b.remove(), 1600);
  }, []);

  /* ---------- load ---------- */
  const loadMe = useCallback(async () => {
    const r = await fetch("/api/me", { cache: "no-store" });
    const data: Me = await r.json();
    setMe(data);
    return data;
  }, []);

  useEffect(() => {
    reduce.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reel = reelRef.current;
    if (reel && !reel.children.length) {
      const w = document.createElement("div");
      w.className = "word idle";
      w.innerHTML = "<span>Your next move</span>";
      reel.appendChild(w);
    }
    (async () => {
      const d = new Date(), n = (8 - d.getDay()) % 7 || 7;
      setNextDrop(`Next update in ${n} day${n > 1 ? "s" : ""}`);
      const params = new URLSearchParams(location.search);
      const paid = params.get("paid");
      if (params.has("paid") || params.has("canceled") || params.has("signin")) history.replaceState(null, "", "/");
      if (params.get("signin") === "failed") toast("That sign-in link didn't work. Try again.");
      if (params.get("signin") === "ok") toast("You're in. Your streak and spins are saved to your email.");
      if (params.has("canceled")) toast("Payment canceled. Nothing was charged.");
      if (paid) {
        const r = await fetch("/api/checkout/confirm", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ session_id: paid }) });
        const j = await r.json().catch(() => ({}));
        if (j.paid) toast(`Payment done. ${j.spins} spin${j.spins > 1 ? "s" : ""} added.`);
      }
      const data = await loadMe();
      if (data.last && !paid) {
        showIdea(data.last);
        await flipTo(data.last.name, 0, "landed");
      }
    })();
  }, [flipTo, loadMe, toast, showIdea]);

  /* ---------- plan progress (kept in this browser) ---------- */
  const planKey = idea ? `sd-plan-${localDay()}-${idea.id}` : "";
  const savePlan = (l: boolean, c: Record<string, boolean>) => planKey && store.set(planKey, JSON.stringify({ locked: l, checked: c }));

  const stepKeys = useMemo(() => {
    if (!idea) return [];
    if (idea.plan.kind === "full") return idea.plan.guide.phases.flatMap((p, pi) => p.steps.map((_, si) => `${pi}-${si}`));
    return idea.plan.steps.map((_, i) => `s-${i}`);
  }, [idea]);
  const doneCount = stepKeys.filter((k) => checked[k]).length;

  /* ---------- actions ---------- */
  const openAuth = (title: string, why: string, after: null | "spin" | "pay" = null) => {
    setAuthCopy({ title, why });
    afterAuth.current = after;
    setModal("auth");
  };

  const spin = useCallback(async () => {
    if (spinning || !me) return;
    if (me.wallet && !me.wallet.freeLeft && me.wallet.credits < 1) { setModal("pay"); return; }

    setSpinning(true);
    setKicker("Spinning…");
    const res = await fetch("/api/spin", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(filters) });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      setSpinning(false);
      setKicker("Today you're going to…");
      if (j.wallet) setMe((m) => (m ? { ...m, wallet: j.wallet } : m));
      if (j.error === "nospins") { setNetworkUsed(false); setModal("pay"); }
      else if (j.error === "network") { setNetworkUsed(true); setModal("pay"); }
      else if (j.error === "nomatch") toast("Nothing fits all those filters yet. Loosen one and spin again.");
      else toast("Something went wrong. Your spin wasn't used. Try again.");
      return;
    }
    const pick: Idea = j.idea;
    setMe((m) => (m ? { ...m, wallet: j.wallet, streak: j.streak } : m));
    if (!reduce.current) {
      let last = "";
      for (let k = 0; k < 34; k++) {
        const p = k / 34, ms = Math.round(45 + Math.pow(p, 3) * 330);
        let t;
        do t = names[Math.floor(Math.random() * names.length)]; while ((t === last || t === pick.name) && names.length > 2);
        last = t;
        await flipTo(t, ms);
      }
    }
    await flipTo(pick.name, reduce.current ? 0 : 520, "landed");
    setKicker("Today you're going to…");
    setSpinning(false);
    showIdea(pick);
    setLandKey((k) => k + 1);
    celebrate();
  }, [spinning, me, filters, names, flipTo, celebrate, toast, showIdea]);

  const afterSignIn = useCallback(async () => {
    const data = await loadMe();
    const next = afterAuth.current;
    afterAuth.current = null;
    if (!data.signedIn) return;
    if (next === "pay") setModal("pay");
    else if (next === "spin") setTimeout(() => document.getElementById("spin")?.click(), 300);
  }, [loadMe]);

  const google = async () => {
    if (demo) {
      await fetch("/api/demo/signin", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "google-user@demo" }) });
      setModal(null); toast("Demo: signed in as a Google user. Nothing was created."); afterSignIn();
      return;
    }
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${location.origin}/auth/callback` } });
    if (error) { setBusy(false); toast("Google sign-in isn't working right now. Try email."); }
  };

  const emailSignIn = async (e: React.FormEvent, raw = email) => {
    e.preventDefault();
    const v = raw.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { toast("Enter your email to continue."); return; }
    if (demo) {
      await fetch("/api/demo/signin", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: v }) });
      setModal(null); toast("Demo: signed in. On the real site you'd get an email link."); afterSignIn();
      return;
    }
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({ email: v, options: { emailRedirectTo: `${location.origin}/auth/callback` } });
    setBusy(false);
    if (error) { toast(error.status === 429 ? "Too many tries. Wait a minute and try again." : "Couldn't send the email. Check the address."); return; }
    setSentTo(v);
    setModal("sent");
  };

  const signOut = async () => {
    setMenu(false);
    await fetch("/auth/signout", { method: "POST" });
    if (supabase) await supabase.auth.signOut().catch(() => {});
    location.reload();
  };

  const buy = async () => {
    setBusy(true);
    const r = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pack: pack.id }) });
    const j = await r.json().catch(() => ({}));
    if (j.url) { location.href = j.url; return; }
    setBusy(false);
    if (j.test) {
      setModal(null);
      setMe((m) => (m ? { ...m, wallet: j.wallet } : m));
      toast(`Test mode: ${pack.n} spin${pack.n > 1 ? "s" : ""} added. Nothing was charged.`);
      setTimeout(() => document.getElementById("spin")?.click(), 500);
      return;
    }
    toast("Payments aren't switched on yet. Your free spin is back tomorrow.");
  };

  const lock = () => {
    setLocked(true);
    savePlan(true, checked);
    toast("Locked in. Day 1 of your streak.");
    document.getElementById("plan")?.scrollIntoView({ behavior: reduce.current ? "auto" : "smooth" });
  };

  const toggle = (k: string) => {
    const c = { ...checked, [k]: !checked[k] };
    setChecked(c);
    savePlan(locked, c);
    if (stepKeys.every((s) => c[s])) toast("All done. That's a day won.");
  };

  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); toast("Copied. Paste it into your DM."); }
    catch { toast("Couldn't copy. Press and hold the text to copy it."); }
  };

  const clip = async () => {
    if (!idea) { toast("Spin first, then make your clip."); return; }
    setClipBusy(true);
    try {
      const ghosts = names.filter((n) => n !== idea.name).sort(() => Math.random() - 0.5);
      const file = await makeClip(idea.name, ghosts);
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "My spin" }).catch(() => {});
      } else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = file.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        toast("Clip saved. Post it on TikTok, Reels or Shorts.");
      }
    } catch {
      toast("This browser can't record clips. Try Chrome or Safari.");
    }
    setClipBusy(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setModal(null); setMenu(false); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- view ---------- */
  const w = me?.wallet;
  const signedIn = !!me?.signedIn;
  const streak = me?.streak ?? 0;
  const pill = w?.freeLeft ? "1 free spin today" : w && w.credits > 0 ? `${w.credits} spin${w.credits > 1 ? "s" : ""} left` : "Free spin used";
  const spinLabel = !w || w.freeLeft ? "Spin" : w && w.credits > 0 ? "Spin again" : "Spin again · $1";
  const daily = w && !w.freeLeft
    ? <>Your <b>free spin</b> comes back tomorrow. Extra spins are $1.</>
    : <>You get <b>1 free spin every day</b>. Extra spins are $1.</>;
  const initial = (me?.email ?? "?").trim().charAt(0).toUpperCase() || "?";
  const ghosts = idea ? names.filter((n) => n !== idea.name).slice(0, 2) : names.slice(0, 2);

  return (
    <>
      {demo && <div className="notice"><b>Preview mode.</b> Sign-in and payments are pretend until the accounts are connected.</div>}
      <header className="topbar">
        <div className="in">
          <div className="brand">spin<i>day</i></div>
          <div className="filters" role="group" aria-label="Filters">
            {FILTER_GROUPS.map((g) => (
              <div className="fg" key={g.key}>
                <span>{g.label}</span>
                {g.opts.map(([v, label]) => (
                  <button key={v} className="chip" aria-pressed={filters[g.key] === v} disabled={spinning}
                    onClick={() => setFilters((f) => ({ ...f, [g.key]: v }))}>{label}</button>
                ))}
              </div>
            ))}
          </div>
          <div className="right">
            {streak > 0 && <span className="pill streak" title="Days in a row you've spun">🔥 {streak}-day streak</span>}
            <span className="pill">{me ? pill : " "}</span>
            {me && !signedIn && (
              <button className="signbtn" onClick={() => openAuth("Save your streak", "Optional. Add your email so your streak, plans and spins follow you to any device.")}>Sign in</button>
            )}
            {signedIn && (
              <div className="acct">
                <button className="avatar" aria-label="Account" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>{initial}</button>
                {menu && (
                  <div className="menu">
                    <small>{me?.email}</small>
                    <button onClick={() => { setMenu(false); setModal("pay"); }}>Buy spins</button>
                    <button onClick={signOut}>Sign out</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="ticker" aria-hidden="true"><div>{"ONE FREE SPIN EVERY DAY   ·   NEW IDEAS EVERY SEVEN DAYS   ·   NO COURSES   ·   NO GURUS   ·   SPIN   ·   ACT   ·   GET PAID   ·   ".repeat(2)}</div></div>

      <main>
        <div className="in hero" id="top">
          <h1 className="headline">Stop scrolling. <mark>Spin</mark> for today&apos;s money move.</h1>
          <div className="screen" ref={screenRef}>
            <span className="sticker s1">1 free spin daily</span>
            <span className="sticker s2">New ideas weekly</span>
            <div className="kicker">{kicker}</div>
            <div className="reel" ref={reelRef} aria-live="polite" />
            <div className="cta">
              <button className={`btn${!idea && !spinning ? " idle" : ""}`} id="spin" disabled={spinning || !me} onClick={spin}>{spinLabel}</button>
              {idea && !locked && <button className="btn pinkb" disabled={spinning} onClick={lock}>Lock it in</button>}
            </div>
            <div className="daily">{daily}</div>
            {idea && !spinning && (
              <div className="landing show" key={landKey}>
                <p className="how"><b>How you get paid:</b> {idea.how}</p>
                <div className="stats">
                  {[["First try makes", idea.earn], ["Costs", idea.cost], ["Time", TIME_LABEL[idea.time]], ["Level", idea.diff]].map(([k, v]) => (
                    <div className="stat" key={k}><small>{k}</small><strong>{v}</strong></div>
                  ))}
                </div>
                <p className="realtalk"><b>Real talk</b>{idea.real}</p>
                {!signedIn && (
                  <form className="savestreak" onSubmit={(e) => emailSignIn(e, saveEmail)} noValidate>
                    <p><b>{streak > 1 ? `Keep your ${streak}-day streak.` : "Start a streak."}</b> Add your email so it isn&apos;t lost if you clear your browser. Optional, no password.</p>
                    <div>
                      <label className="sr" htmlFor="saveemail">Email</label>
                      <input id="saveemail" type="email" placeholder="you@email.com" autoComplete="email" value={saveEmail} onChange={(e) => setSaveEmail(e.target.value)} />
                      <button className={`btn white${busy ? " busy" : ""}`} type="submit">Save it</button>
                    </div>
                  </form>
                )}
                <a className="scrollcue" href="#plan">See the full plan ↓</a>
              </div>
            )}
          </div>
        </div>

        <section className="block" id="plan"><div className="in">
          <div className="bhead"><h2>{idea ? idea.name : "Your plan"}</h2><span className="tag">{!idea ? "Spin to unlock" : idea.plan.kind === "full" ? "Full step-by-step plan" : "Quick-start plan"}</span></div>
          {idea && !locked && (
            <div className="lockbar"><p>No overthinking. Lock it in and tick it off as you go.</p><button className="btn white" onClick={lock}>Lock it in</button></div>
          )}
          <div className="progress" aria-hidden="true"><i style={{ width: `${stepKeys.length ? (doneCount / stepKeys.length) * 100 : 0}%` }} /></div>
          {!idea && (
            <div className="card"><h3>Spin first</h3><p style={{ margin: 0 }}>Your step-by-step plan shows up here, with the exact sites to use and what to say.</p></div>
          )}
          {idea?.plan.kind === "full" && (
            <>
              {idea.plan.guide.phases.map((ph, pi) => (
                <div className="phase" key={pi}>
                  <div className="phase-label"><span className="when">{ph.when}</span><span className="sub">{ph.sub}</span></div>
                  <ol className="steps">
                    {ph.steps.map((s, si) => {
                      const k = `${pi}-${si}`;
                      return (
                        <li className={`step${checked[k] ? " done" : ""}`} key={k}>
                          <input type="checkbox" disabled={!locked} checked={!!checked[k]} onChange={() => toggle(k)} aria-label={s.t} />
                          <div className="t">{s.t}{s.min && <span className="mins">{s.min}</span>}</div>
                          {s.d && <p className="d" dangerouslySetInnerHTML={{ __html: s.d }} />}
                          {s.go && <div className="go">{s.go.map(([l, u]) => <a key={u} href={u} target="_blank" rel="noopener noreferrer">{l} ↗</a>)}</div>}
                          {s.script && <div className="script"><button className="copy" type="button" onClick={() => copy(s.script!)}>Copy</button><span>{s.script}</span></div>}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}
              <div className="twocol">
                <div className="card">
                  <h3>What to charge</h3>
                  <div className="tablewrap"><table><thead><tr><th>Package</th><th>What they get</th><th>Price</th></tr></thead>
                    <tbody>{idea.plan.guide.pricing.map((r) => <tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td className="num">{r[2]}</td></tr>)}</tbody></table></div>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>{idea.plan.guide.pricenote}</p>
                </div>
                <div className="card"><h3>Mistakes that kill this</h3><ul className="bad">{idea.plan.guide.mistakes.map((m, i) => <li key={i} dangerouslySetInnerHTML={{ __html: m }} />)}</ul></div>
              </div>
            </>
          )}
          {idea?.plan.kind === "short" && (
            <>
              <ol className="steps">
                {idea.plan.steps.map((s, i) => {
                  const k = `s-${i}`;
                  return (
                    <li className={`step${checked[k] ? " done" : ""}`} key={k}>
                      <input type="checkbox" disabled={!locked} checked={!!checked[k]} onChange={() => toggle(k)} aria-label={s} />
                      <div className="t">{s}</div>
                    </li>
                  );
                })}
              </ol>
              <p style={{ color: "var(--muted)", marginTop: 20 }}>What you&apos;ll use: {idea.plan.tools.join(", ")}.</p>
            </>
          )}
          {idea && (
            <p className="disclaim">
              <b>Heads up:</b> this is an idea, not a promise. Earnings are rough ranges and many people make less or nothing. It isn&apos;t financial, legal or tax advice. Follow each site&apos;s rules and age limits and the laws where you live. <a href="/terms">Terms</a>
            </p>
          )}
        </div></section>

        <section className="block" id="fresh"><div className="in">
          <div className="bhead"><h2>Fresh every 7 days</h2><span className="tag">{nextDrop}</span></div>
          <div className="fresh">
            <div className="fcard"><span className="big">+</span><h3>New ideas added</h3><p>Every 7 days we add new money moves that have a better chance of working right now.</p></div>
            <div className="fcard"><span className="big">−</span><h3>Outdated ones removed</h3><p>Ideas that stop working, like a dead app or a played-out trend, get pulled from the spin.</p></div>
            <div className="fcard"><span className="big">↻</span><h3>Plans kept current</h3><p>Steps, links and prices get updated so the plan you land on still works this week.</p></div>
          </div>
        </div></section>

        <section className="block" id="share"><div className="in">
          <div className="bhead"><h2>Post your spin</h2></div>
          <div className="share">
            <div className="phone" aria-label="Clip preview">
              <div className="q">what am I doing today?</div>
              <div className="ghosts" aria-hidden="true">{ghosts.map((g) => <div key={g}>{g}</div>)}</div>
              <div className="res">{idea ? idea.name : "Your next move"}</div>
              <div className="wm">spinday</div>
            </div>
            <div className="sharecopy">
              <p><b>One tap makes a 9:16 clip</b> of the words flying past and landing on yours, ready for TikTok, Reels or Shorts.</p>
              <button className={`btn${clipBusy ? " busy" : ""}`} onClick={clip} disabled={clipBusy}>{clipBusy ? "Recording…" : "Make my clip"}</button>
            </div>
          </div>
        </div></section>
      </main>
      <Footer />

      {modal === "auth" && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="autht" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className="mcard">
            <h3 id="autht">{authCopy.title}</h3>
            <p>{authCopy.why}</p>
            <button className={`auth${busy ? " busy" : ""}`} onClick={google}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z" /><path fill="#34A853" d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.4 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 23.5z" /><path fill="#FBBC05" d="M5.6 14.2a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4z" /><path fill="#EA4335" d="M12 4.6c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 6.8l3.8 3C6.5 6.6 9 4.6 12 4.6z" /></svg>
              Continue with Google
            </button>
            <div className="or"><span>or</span></div>
            <form className="emailform" onSubmit={emailSignIn} noValidate>
              <label className="sr" htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="you@email.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className={`auth emailbtn${busy ? " busy" : ""}`} type="submit">Email me a sign-in link</button>
            </form>
            <button className="btn white" onClick={() => { setModal(null); afterAuth.current = null; }}>Not now</button>
            <p className="demo">No password needed</p>
          </div>
        </div>
      )}

      {modal === "sent" && (
        <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className="mcard sent">
            <span className="big" aria-hidden="true">✉️</span>
            <h3>Check your email</h3>
            <p>We sent a sign-in link to <b>{sentTo}</b>. Open it on this device and you&apos;ll land back here, signed in.</p>
            <button className="btn white" onClick={() => setModal(null)}>Done</button>
          </div>
        </div>
      )}

      {modal === "pay" && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="payt" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className="mcard">
            {w && !w.freeLeft && <span className="tag" style={{ alignSelf: "flex-start" }}>{networkUsed ? "Today's free spin on this Wi-Fi is used" : "Today's free spin is used"}</span>}
            <h3 id="payt">Keep spinning</h3>
            <p>{networkUsed && !signedIn
              ? "Someone on this network already used today's free spin. Add your email to get your own, or grab one now."
              : "Your free spin comes back tomorrow. Want another one now? Bought spins never expire."}</p>
            <div className="packs">
              {PACKS.map((p) => (
                <button key={p.id} className="pack" aria-pressed={pack.id === p.id} onClick={() => setPack(p)}>
                  <b>{p.n} spin{p.n > 1 ? "s" : ""}</b><span>${p.price}</span><em>{p.note || " "}</em>
                </button>
              ))}
            </div>
            <button className={`btn${busy ? " busy" : ""}`} onClick={buy}>Pay ${pack.price} and spin</button>
            {!signedIn && (
              <button className="linkbtn" type="button" onClick={() => { setModal(null); openAuth(networkUsed ? "Get your own free spin" : "Keep your spins safe", "Add your email (optional). Spins you buy and your streak stay with you on any device.", networkUsed ? "spin" : "pay"); }}>
                {networkUsed ? "Add my email for my own free spin" : "Add my email so my spins are saved"}
              </button>
            )}
            <button className="btn white" onClick={() => setModal(null)}>Maybe tomorrow</button>
            <p className="demo">{paymentsLive ? "Secure checkout by Stripe" : "Test mode · no real payment"}</p>
          </div>
        </div>
      )}

      {toastMsg && <div className="toast" role="status">{toastMsg}</div>}
    </>
  );
}
