# Getting SpinDay live

About an hour, in this order. Everything here has a free tier; the only cost is your domain (about $15 a year) and Stripe's fee on each sale.

## 1. Put the code on GitHub (5 min)
1. Make a free account at github.com if you don't have one.
2. Click **New repository**, name it `spinday`, set it to **Private**, and create it (leave every box unticked).
3. Connect it to this project in Claude so the code can be pushed there.

## 2. Supabase: accounts and database (15 min)
1. Sign up at supabase.com → **New project**. Name `spinday`, pick a strong database password, region closest to you (Canada Central).
2. When it's ready: **SQL Editor** → **New query** → paste all of `supabase/migrations/0001_init.sql` → **Run**. Then do the same with `supabase/migrations/0002_guest_spins.sql`, then `0003_subscriptions.sql`, then `0004_ranks.sql` (leaderboard and proof videos; it also creates the private `proofs` storage bucket).
3. **Project Settings → API**: copy the **Project URL**, the **anon public** key and the **service_role** key. Keep the service_role key secret.
4. **Authentication → URL Configuration**: Site URL = your domain (e.g. `https://spinday.ca`). Add redirect URLs `https://spinday.ca/auth/callback` and `http://localhost:3000/auth/callback`.
5. **Authentication → Sign In / Providers → Email**: leave it on. Magic links work out of the box (Supabase's built-in sender is limited to a few emails an hour, so before launch add a sender like Resend under **Authentication → SMTP**).

## 3. Google sign-in (15 min)
1. Go to console.cloud.google.com → create a project called `SpinDay`.
2. **APIs & Services → OAuth consent screen**: External, app name SpinDay, your support email, add your domain, and link `/privacy` and `/terms`. Publish it.
3. **Credentials → Create credentials → OAuth client ID** → Web application. Under **Authorized redirect URIs** paste the callback URL Supabase shows in **Authentication → Sign In / Providers → Google** (it looks like `https://xxxx.supabase.co/auth/v1/callback`).
4. Copy the **Client ID** and **Client secret** into that Google provider page in Supabase and turn it on.

## 4. Stripe: payments (10 min)
1. Sign up at stripe.com. Stay in **Test mode** at first.
2. **Developers → API keys**: copy the **Secret key** (`sk_test_…`).
3. After the site is on Vercel (step 5): **Developers → Webhooks → Add endpoint** → URL `https://spinday.ca/api/stripe/webhook`, events `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `customer.subscription.created`, `customer.subscription.updated` and `customer.subscription.deleted`. Copy the **Signing secret** (`whsec_…`).
4. **Settings → Payment methods**: make sure **Apple Pay** and **Google Pay** are on. Checkout then shows them on iPhones, Macs with Safari and Android/Chrome.
4b. **Settings → Billing → Customer portal**: turn it on and allow customers to cancel subscriptions and update payment methods (this is where "Manage plan" sends people).
5. Test with card `4242 4242 4242 4242`, any future date, any CVC. When it works, finish Stripe's business verification, switch to **Live mode**, and swap in the live secret key and a live webhook secret.

## 5. Vercel: hosting (10 min)
1. Sign up at vercel.com with GitHub → **Add New → Project** → pick the `spinday` repo → Deploy.
2. **Settings → Environment Variables**: add every line from `.env.example` with the values above, plus `ADMIN_EMAILS` = the email you sign in to SpinDay with (comma separated for more than one). Only those accounts can approve proof videos at `/admin`. Then **Deployments → Redeploy** so the page picks them up.
3. **Settings → Deployment Protection**: set **Vercel Authentication** to **Disabled** (or only open your main address under Domains). Otherwise visitors are asked to sign in to Vercel.
4. **Settings → Domains**: buy or add your domain and follow the DNS steps it shows.

## 6. Final check
- Sign in with Google and with an email link.
- Spin once (free), then spin again: the $1 screen should appear. Buy a pack with the test card: spins should show up straight away.
- Reload the page: your landed plan should still be there and the free spin should still be used.
- Open `/leaderboard`, pick a name, post a short video, then approve it at `/admin`. It should show under Latest proof and you should move up to Hustler.
