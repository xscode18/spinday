import "server-only";
import { IDEAS, type Guide, type Idea } from "@/lib/ideas";
import { GUIDES } from "@/lib/guides";

export interface Filters {
  time: 1 | 2 | 3;
  budget: 0 | 20;
  where: "any" | "home" | "out" | "online";
  diff: "any" | "Easy" | "Medium";
}

export function parseFilters(raw: unknown): Filters {
  const r = (raw ?? {}) as Record<string, unknown>;
  const time = [1, 2, 3].includes(Number(r.time)) ? (Number(r.time) as 1 | 2 | 3) : 3;
  const budget = Number(r.budget) === 0 ? 0 : 20;
  const where = ["home", "out", "online"].includes(String(r.where)) ? (r.where as Filters["where"]) : "any";
  const diff = ["Easy", "Medium"].includes(String(r.diff)) ? (r.diff as Filters["diff"]) : "any";
  return { time, budget, where, diff };
}

/** Ideas that fit: take no longer than the time picked, cost no more than the budget, match where and level. */
export function matching(f: Filters): Idea[] {
  return IDEAS.filter(
    (i) =>
      i.time <= f.time &&
      i.budget <= f.budget &&
      (f.where === "any" || i.where === f.where) &&
      (f.diff === "any" || i.diff === f.diff),
  );
}

export function pick(f: Filters, avoid?: string | null): Idea | null {
  const pool = matching(f);
  if (!pool.length) return null;
  const fresh = pool.length > 1 && avoid ? pool.filter((i) => i.id !== avoid) : pool;
  const bytes = crypto.getRandomValues(new Uint32Array(1));
  return fresh[bytes[0] % fresh.length];
}

export type PlanPayload =
  | { kind: "full"; guide: Guide }
  | { kind: "short"; steps: string[]; tools: string[] };

export interface LandedIdea {
  id: string;
  name: string;
  how: string;
  real: string;
  earn: string;
  cost: string;
  time: 1 | 2 | 3;
  diff: string;
  plan: PlanPayload;
}

export function landed(idea: Idea): LandedIdea {
  const guide = GUIDES[idea.id];
  return {
    id: idea.id,
    name: idea.name,
    how: idea.how,
    real: idea.real,
    earn: idea.earn,
    cost: idea.cost,
    time: idea.time,
    diff: idea.diff,
    plan: guide ? { kind: "full", guide } : { kind: "short", steps: idea.steps, tools: idea.tools },
  };
}

export function byId(id: string | null): Idea | null {
  return id ? IDEAS.find((i) => i.id === id) ?? null : null;
}

/** Just the names, for the reel to flick through. */
export const REEL_NAMES = IDEAS.map((i) => i.name);
