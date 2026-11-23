"use client";

// Records a 9:16 video of the reel flicking through ideas and landing on yours.
// Runs fully in the browser: canvas + MediaRecorder, nothing is uploaded.

const W = 1080, H = 1920, FPS = 30;

function pickMime(): { mime: string; ext: string } {
  const options = [
    { mime: "video/mp4;codecs=avc1", ext: "mp4" },
    { mime: "video/mp4", ext: "mp4" },
    { mime: "video/webm;codecs=vp9", ext: "webm" },
    { mime: "video/webm", ext: "webm" },
  ];
  for (const o of options) if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(o.mime)) return o;
  throw new Error("no recorder");
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(" "), lines: string[] = [];
  let line = "";
  for (const w of words) {
    const t = line ? line + " " + w : w;
    if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

export async function makeClip(result: string, others: string[]): Promise<File> {
  const { mime, ext } = pickMime();
  const css = getComputedStyle(document.documentElement);
  const v = (n: string, f: string) => css.getPropertyValue(n).trim() || f;
  const bg = v("--surface", "#fff"), fg = v("--fg", "#141414"), dim = v("--dim", "#9A9993"), accent = v("--accent", "#2F5BFF"), faint = v("--line2", "#D6D5D0");
  const font = getComputedStyle(document.body).fontFamily;

  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const stream = canvas.captureStream(FPS);
  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 6_000_000 });
  const chunks: Blob[] = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  const done = new Promise<void>((r) => (rec.onstop = () => r()));

  // Timeline: ~2.6s of flicks slowing down, then the landing, held for ~2s.
  const flicks: { word: string; ms: number }[] = [];
  for (let k = 0; k < 26; k++) flicks.push({ word: others[k % others.length], ms: Math.round(50 + Math.pow(k / 26, 3) * 300) });
  flicks.push({ word: result, ms: 500 });
  const total = flicks.reduce((s, f) => s + f.ms, 0) + 2000;

  const drawWord = (word: string, y: number, alpha: number, color: string, scale = 1, blur = 0) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.filter = blur ? `blur(${blur}px)` : "none";
    ctx.font = `600 ${Math.round(112 * scale)}px ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const lines = wrap(ctx, word, W - 140);
    const lh = 118 * scale;
    lines.forEach((l, i) => ctx.fillText(l, W / 2, y + (i - (lines.length - 1) / 2) * lh));
    ctx.restore();
  };

  rec.start();
  const t0 = performance.now();
  await new Promise<void>((resolve) => {
    const frame = () => {
      const t = performance.now() - t0;
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = dim; ctx.font = `500 52px ${font}`; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
      ctx.fillText("what am I doing today?", W / 2, 360);
      ctx.font = `400 34px ${font}`; ctx.fillText("spinday", W / 2, H - 160);

      let acc = 0, i = 0;
      while (i < flicks.length - 1 && acc + flicks[i].ms <= t) { acc += flicks[i].ms; i++; }
      const cur = flicks[i], p = Math.min(1, (t - acc) / cur.ms);
      const landed = i === flicks.length - 1;
      const cy = H / 2;
      if (i > 0 && p < 1) drawWord(flicks[i - 1].word, cy - p * 260, 1 - p, fg, 1, cur.ms < 120 ? 3 : 0);
      if (landed) {
        const s = p < 0.55 ? 0.82 + (p / 0.55) * 0.23 : 1.05 - ((p - 0.55) / 0.45) * 0.05;
        drawWord(cur.word, cy + (1 - Math.min(1, p * 1.6)) * 260, Math.min(1, 0.4 + p), accent, s, Math.max(0, 8 * (1 - p * 1.8)));
        drawWord(flicks[i - 1].word, cy - 340, 0.5, faint, 0.6);
      } else {
        drawWord(cur.word, cy + (1 - p) * 260, 0.2 + p * 0.8, fg, 1, cur.ms < 120 ? 3 : 0);
      }
      if (t < total) requestAnimationFrame(frame); else resolve();
    };
    requestAnimationFrame(frame);
  });
  rec.stop();
  await done;
  return new File([new Blob(chunks, { type: mime.split(";")[0] })], `my-spin.${ext}`, { type: mime.split(";")[0] });
}
