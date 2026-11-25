# SpinDay

Spin once a day for a real way to make money today. Next.js (App Router) + Supabase (sign-in and database) + Stripe (paid spins), hosted on Vercel.

## Run it on your computer

```bash
npm install
npm run dev        # http://localhost:3000
```

With no keys in `.env.local` the site runs in **preview mode**: sign-in and payments are pretend and kept in memory, so you can click through everything.

## How the rules are enforced

- No account needed to spin. A browser without an account gets a random id in a long-lived cookie, and its free spin is checked on the server against **that id and its network** (a salted hash of the IP address). Reloading, a private window or clearing cookies on the same Wi-Fi doesn't give another free spin. `GUEST_SPINS_PER_NETWORK` (default 1) sets how many free guest spins a network gets per day.
- Email (magic link) or Google is optional. Signing in moves the browser's spins, streak and purchases onto the account (`merge_owner`) and gives that person their own daily free spin even on a shared network.
- The server picks the idea and spends the spin (`src/app/api/spin/route.ts` → `use_spin` in `supabase/migrations/0002_guest_spins.sql`).
- Paid spins are added only by Stripe: the webhook (`/api/stripe/webhook`) and the return page both call `add_credits`, which credits each checkout session exactly once.
- The free spin resets at midnight in `SPIN_RESET_TIMEZONE` (default Toronto time) for everyone.

## Where things live

| What | File |
| --- | --- |
| The 30 ideas | `src/lib/ideas.ts` |
| Full step-by-step plan for every idea | `src/lib/guides.ts` |
| Filter and pick logic | `src/lib/spin.ts` |
| The page (reel, plan, packs, sign-in) | `src/components/SpinApp.tsx` |
| The 9:16 clip recorder | `src/components/clip.ts` |
| Database tables and functions | `supabase/migrations/0001_init.sql` |
| Spin packs and prices | `src/lib/config.ts` (`PACKS`) and `PACKS` in `SpinApp.tsx` |

To add an idea, add it to `IDEAS` in `src/lib/ideas.ts` and its plan to `GUIDES` in `src/lib/guides.ts` under the same id.

Apple Pay and Google Pay: Stripe Checkout shows them automatically on supported devices when they're switched on in Stripe → Settings → Payment methods. No code change needed.

## Going live

See **GO-LIVE.md** for the step-by-step account setup (Supabase, Google, Stripe, Vercel, domain).
