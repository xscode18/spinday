import "server-only";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";
export const CURRENCY = (process.env.STRIPE_CURRENCY ?? "cad").toLowerCase();
/** The free spin resets at midnight in this time zone (the same for everyone, so it can't be gamed). */
export const RESET_TZ = process.env.SPIN_RESET_TIMEZONE ?? "America/Toronto";

/**
 * Demo mode runs the whole site with fake sign-in and fake payments, kept in memory.
 * It turns on by itself when the Supabase keys are missing, so the site works before any accounts exist.
 * It is refused in production unless ALLOW_DEMO=1.
 */
export const DEMO = !SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY;
export const PAYMENTS_LIVE = !DEMO && !!STRIPE_SECRET_KEY;

export const PACKS = {
  "1": { spins: 1, cents: 100, label: "1 spin" },
  "5": { spins: 5, cents: 400, label: "5 spins" },
  "12": { spins: 12, cents: 900, label: "12 spins" },
} as const;
export type PackId = keyof typeof PACKS;

/** Monthly plan: unlimited spins while it's active. */
export const PLAN = { cents: 1000, label: "Unlimited spins", interval: "month" } as const;

/** Today's date (YYYY-MM-DD) in the reset time zone. */
export function today(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: RESET_TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Free spins a day for browsers without an account, per network (home Wi-Fi, phone data…). */
export const GUEST_SPINS_PER_NETWORK = Math.max(1, Number(process.env.GUEST_SPINS_PER_NETWORK ?? 1) || 1);
/** Salt for hashing network addresses (falls back to the service key so nothing extra must be set). */
export const IP_SALT = process.env.SPIN_IP_SALT || SUPABASE_SERVICE_ROLE_KEY || "spinday-demo";
