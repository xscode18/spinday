# SpinDay

Spin once a day for a real way to make money today. Next.js (App Router) + Supabase (sign-in and database) + Stripe (paid spins), hosted on Vercel.

## Run it on your computer

```bash
npm install
npm run dev        # http://localhost:3000
```

With no keys in `.env.local` the site runs in **preview mode**: sign-in and payments are pretend and kept in memory, so you can click through everything.

## How the rules are enforced

- Signing in is required to spin (Google or an emailed link, no passwords, no Apple).
- The server picks the idea and spends the spin (`src/app/api/spin/route.ts` → `use_spin` in `supabase/migrations/0001_init.sql`). The free spin is stored per account with today's date, so reloading, clearing the browser or a second tab can't get another one.
- Paid spins are added only by Stripe: the webhook (`/api/stripe/webhook`) and the return page both call `add_credits`, which credits each checkout session exactly once.
- The free spin resets at midnight in `SPIN_RESET_TIMEZONE` (default Toronto time) for everyone.

## Where things live

| What | File |
| --- | --- |
| The 30 ideas and the full "Edit TikToks" plan | `src/lib/ideas.ts` |
| Filter and pick logic | `src/lib/spin.ts` |
| The page (reel, plan, packs, sign-in) | `src/components/SpinApp.tsx` |
| The 9:16 clip recorder | `src/components/clip.ts` |
| Database tables and functions | `supabase/migrations/0001_init.sql` |
| Spin packs and prices | `src/lib/config.ts` (`PACKS`) and `PACKS` in `SpinApp.tsx` |

To add a full plan for another idea, add an entry to `GUIDES` in `src/lib/ideas.ts` using the same id as the idea.

## Going live

See **GO-LIVE.md** for the step-by-step account setup (Supabase, Google, Stripe, Vercel, domain).
