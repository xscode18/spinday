-- SpinDay update: spin without an account. Paste this whole file into Supabase → SQL Editor → Run (once).
-- It replaces the tables from 0001 (any test spins and test purchases are cleared).

drop function if exists public.use_spin(uuid, date, text, jsonb);
drop function if exists public.add_credits(text, uuid, integer, integer, text);
drop table if exists public.spins;
drop table if exists public.purchases;
drop table if exists public.wallets;

-- "owner" is either u:<account id> (signed in with Google or email) or g:<random id> (a browser without an account).
create table public.wallets (
  owner text primary key,
  free_spin_date date,
  credits integer not null default 0 check (credits >= 0),
  created_at timestamptz not null default now()
);

create table public.spins (
  id bigint generated always as identity primary key,
  owner text not null,
  idea_id text not null,
  paid boolean not null,
  spin_day date not null,
  filters jsonb,
  created_at timestamptz not null default now()
);
create index spins_owner_created on public.spins (owner, created_at desc);

create table public.purchases (
  stripe_session_id text primary key,
  owner text not null,
  spins integer not null,
  amount_total integer,
  currency text,
  created_at timestamptz not null default now()
);

-- Free spins used by browsers without an account, per network per day. The network address is
-- stored only as a salted hash. This is what stops "clear cookies, spin again".
create table if not exists public.guest_ip_days (
  day date not null,
  ip_hash text not null,
  used integer not null default 0,
  primary key (day, ip_hash)
);

-- Only the server touches these tables.
alter table public.wallets enable row level security;
alter table public.spins enable row level security;
alter table public.purchases enable row level security;
alter table public.guest_ip_days enable row level security;

-- Spends today's free spin, or one paid spin. Guests (p_ip_hash not null) also need a free spin
-- left on their network today. Returns kind = free | paid | none | ip_limit.
create or replace function public.use_spin(p_owner text, p_today date, p_idea text, p_filters jsonb, p_ip_hash text, p_ip_limit integer)
returns table (kind text, credits integer, free_spin_date date)
language plpgsql security definer set search_path = public as $$
declare w public.wallets%rowtype; ip_ok boolean := true;
begin
  insert into public.wallets (owner) values (p_owner) on conflict (owner) do nothing;
  select * into w from public.wallets where owner = p_owner for update;

  if w.free_spin_date is distinct from p_today then
    if p_ip_hash is not null then
      insert into public.guest_ip_days (day, ip_hash, used) values (p_today, p_ip_hash, 1)
      on conflict (day, ip_hash) do update set used = public.guest_ip_days.used + 1
      where public.guest_ip_days.used < p_ip_limit;
      ip_ok := found;
    end if;
    if ip_ok then
      update public.wallets set free_spin_date = p_today where owner = p_owner;
      insert into public.spins (owner, idea_id, paid, spin_day, filters) values (p_owner, p_idea, false, p_today, p_filters);
      return query select 'free'::text, w.credits, p_today;
      return;
    end if;
  end if;

  if w.credits > 0 then
    update public.wallets set credits = w.credits - 1 where owner = p_owner;
    insert into public.spins (owner, idea_id, paid, spin_day, filters) values (p_owner, p_idea, true, p_today, p_filters);
    return query select 'paid'::text, w.credits - 1, w.free_spin_date;
  elsif not ip_ok then
    return query select 'ip_limit'::text, w.credits, w.free_spin_date;
  else
    return query select 'none'::text, w.credits, w.free_spin_date;
  end if;
end $$;

-- Adds paid spins once per Stripe checkout session.
create or replace function public.add_credits(p_session text, p_owner text, p_spins integer, p_amount integer, p_currency text)
returns boolean
language plpgsql security definer set search_path = public as $$
begin
  insert into public.purchases (stripe_session_id, owner, spins, amount_total, currency)
  values (p_session, p_owner, p_spins, p_amount, p_currency)
  on conflict (stripe_session_id) do nothing;
  if not found then return false; end if;
  insert into public.wallets (owner, credits) values (p_owner, p_spins)
  on conflict (owner) do update set credits = public.wallets.credits + excluded.credits;
  return true;
end $$;

-- When a guest adds their email, their spins, streak and purchases move onto the account.
create or replace function public.merge_owner(p_from text, p_to text)
returns void
language plpgsql security definer set search_path = public as $$
declare f public.wallets%rowtype;
begin
  if p_from = p_to then return; end if;
  select * into f from public.wallets where owner = p_from for update;
  if not found then return; end if;
  insert into public.wallets (owner, free_spin_date, credits) values (p_to, f.free_spin_date, f.credits)
  on conflict (owner) do update set
    credits = public.wallets.credits + excluded.credits,
    free_spin_date = greatest(public.wallets.free_spin_date, excluded.free_spin_date);
  update public.spins set owner = p_to where owner = p_from;
  update public.purchases set owner = p_to where owner = p_from;
  delete from public.wallets where owner = p_from;
end $$;

revoke execute on function public.use_spin(text, date, text, jsonb, text, integer) from public, anon, authenticated;
revoke execute on function public.add_credits(text, text, integer, integer, text) from public, anon, authenticated;
revoke execute on function public.merge_owner(text, text) from public, anon, authenticated;
grant execute on function public.use_spin(text, date, text, jsonb, text, integer) to service_role;
grant execute on function public.add_credits(text, text, integer, integer, text) to service_role;
grant execute on function public.merge_owner(text, text) to service_role;
