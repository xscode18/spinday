// Ranks come from proof videos. Shared by the server and the browser (no secrets here).

/** Points for each approved proof video, and for each like a video gets from someone else. */
export const SCORE = { video: 100, like: 10 } as const;

export const TIERS = [
  { name: "Rookie", min: 0 },
  { name: "Hustler", min: 100 },
  { name: "Grinder", min: 300 },
  { name: "Builder", min: 700 },
  { name: "Boss", min: 1500 },
  { name: "Mogul", min: 3000 },
  { name: "Legend", min: 6000 },
] as const;

export interface TierInfo {
  name: string;
  points: number;
  next: { name: string; min: number } | null;
  /** 0–1 progress from this rank to the next. */
  progress: number;
}

export function tierFor(points: number): TierInfo {
  let i = 0;
  while (i + 1 < TIERS.length && points >= TIERS[i + 1].min) i++;
  const cur = TIERS[i], next = TIERS[i + 1] ?? null;
  return {
    name: cur.name,
    points,
    next: next ? { name: next.name, min: next.min } : null,
    progress: next ? (points - cur.min) / (next.min - cur.min) : 1,
  };
}

export const NICK_RULE = "3–20 letters, numbers, dots or underscores";
