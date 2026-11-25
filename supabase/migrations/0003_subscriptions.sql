-- SpinDay update: $10/month unlimited spins. Paste this whole file into Supabase → SQL Editor → Run (once).
-- Safe to run on top of 0002; nothing existing is changed.

create table if not exists public.subscriptions (
  owner text primary key,
  stripe_customer text,
  stripe_subscription text unique,
  status text not null,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

-- Only the server touches this table.
alter table public.subscriptions enable row level security;
