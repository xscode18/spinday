-- SpinDay database. Paste this whole file into Supabase → SQL Editor → Run (once).

-- One row per account: when they last used their free spin, and how many paid spins they have left.
create table if not exists public.wallets (
  user_id uuid primary key references auth.users (id) on delete cascade,
  free_spin_date date,
  credits integer not null default 0 check (credits >= 0),
  created_at timestamptz not null default now()
);

-- Every spin, so the landed plan survives a reload and we can see which ideas people get.
create table if not exists public.spins (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  idea_id text not null,
  paid boolean not null,
  filters jsonb,
  created_at timestamptz not null default now()
);
create index if not exists spins_user_created on public.spins (user_id, created_at desc);

-- Every Stripe payment. The session id as primary key means a payment can never be credited twice.
create table if not exists public.purchases (
  stripe_session_id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  spins integer not null,
  amount_total integer,
  currency text,
  created_at timestamptz not null default now()
);

-- Visitors can read their own rows; all writes go through the functions below from the server.
alter table public.wallets enable row level security;
alter table public.spins enable row level security;
alter table public.purchases enable row level security;
drop policy if exists "own wallet" on public.wallets;
create policy "own wallet" on public.wallets for select using (auth.uid() = user_id);
drop policy if exists "own spins" on public.spins;
create policy "own spins" on public.spins for select using (auth.uid() = user_id);
drop policy if exists "own purchases" on public.purchases;
create policy "own purchases" on public.purchases for select using (auth.uid() = user_id);

-- Uses today's free spin if it's still there, otherwise one paid spin. Locks the row so two
-- spins at the same moment can't both be free.
create or replace function public.use_spin(p_user uuid, p_today date, p_idea text, p_filters jsonb)
returns table (kind text, credits integer, free_spin_date date)
language plpgsql security definer set search_path = public as $$
declare w public.wallets%rowtype;
begin
  insert into public.wallets (user_id) values (p_user) on conflict (user_id) do nothing;
  select * into w from public.wallets where user_id = p_user for update;
  if w.free_spin_date is distinct from p_today then
    update public.wallets set free_spin_date = p_today where user_id = p_user;
    insert into public.spins (user_id, idea_id, paid, filters) values (p_user, p_idea, false, p_filters);
    return query select 'free'::text, w.credits, p_today;
  elsif w.credits > 0 then
    update public.wallets set credits = w.credits - 1 where user_id = p_user;
    insert into public.spins (user_id, idea_id, paid, filters) values (p_user, p_idea, true, p_filters);
    return query select 'paid'::text, w.credits - 1, w.free_spin_date;
  else
    return query select 'none'::text, w.credits, w.free_spin_date;
  end if;
end $$;

-- Adds paid spins once per Stripe checkout session. Returns false if it was already credited.
create or replace function public.add_credits(p_session text, p_user uuid, p_spins integer, p_amount integer, p_currency text)
returns boolean
language plpgsql security definer set search_path = public as $$
begin
  insert into public.purchases (stripe_session_id, user_id, spins, amount_total, currency)
  values (p_session, p_user, p_spins, p_amount, p_currency)
  on conflict (stripe_session_id) do nothing;
  if not found then return false; end if;
  insert into public.wallets (user_id, credits) values (p_user, p_spins)
  on conflict (user_id) do update set credits = public.wallets.credits + excluded.credits;
  return true;
end $$;

-- Only the server (service role) may call these.
revoke execute on function public.use_spin(uuid, date, text, jsonb) from public, anon, authenticated;
revoke execute on function public.add_credits(text, uuid, integer, integer, text) from public, anon, authenticated;
grant execute on function public.use_spin(uuid, date, text, jsonb) to service_role;
grant execute on function public.add_credits(text, uuid, integer, integer, text) to service_role;
