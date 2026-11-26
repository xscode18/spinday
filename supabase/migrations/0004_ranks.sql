-- SpinDay update: proof videos, ranks and leaderboards. Paste this whole file into Supabase → SQL Editor → Run (once).
-- Safe to run on top of 0003; nothing existing is changed.

-- The public name someone shows on the leaderboard. Only signed-in accounts ("u:...") get one.
create table if not exists public.profiles (
  owner text primary key,
  nickname text not null,
  created_at timestamptz not null default now()
);
create unique index if not exists profiles_nickname_lower on public.profiles (lower(nickname));

-- Proof videos: someone doing the idea they spun. Nothing is public until an admin approves it.
-- status: uploading (link handed out) → pending (file is there, waiting for review) → approved | rejected
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  owner text not null,
  idea_id text not null,
  caption text,
  path text not null,
  status text not null default 'uploading' check (status in ('uploading', 'pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);
create index if not exists videos_status_created on public.videos (status, created_at desc);
create index if not exists videos_owner on public.videos (owner);

-- One like per account per video.
create table if not exists public.video_likes (
  video_id uuid not null references public.videos (id) on delete cascade,
  owner text not null,
  created_at timestamptz not null default now(),
  primary key (video_id, owner)
);

-- Only the server touches these tables.
alter table public.profiles enable row level security;
alter table public.videos enable row level security;
alter table public.video_likes enable row level security;

-- Private bucket for the video files (max 50 MB each; the server hands out short-lived links).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('proofs', 'proofs', false, 52428800, array['video/mp4', 'video/quicktime', 'video/webm'])
on conflict (id) do nothing;

-- Videos board: points for each approved video plus points for each like it gets, since p_since.
create or replace function public.board_videos(p_since timestamptz, p_video_pts integer, p_like_pts integer, p_limit integer)
returns table (owner text, nickname text, videos integer, likes integer, points integer)
language sql stable security definer set search_path = public as $$
  with v as (
    select owner, count(*)::int n from videos where status = 'approved' and created_at >= p_since group by owner
  ), l as (
    select vv.owner, count(*)::int n from video_likes lk join videos vv on vv.id = lk.video_id
    where vv.status = 'approved' and lk.created_at >= p_since group by vv.owner
  )
  select p.owner, p.nickname, coalesce(v.n, 0), coalesce(l.n, 0), coalesce(v.n, 0) * p_video_pts + coalesce(l.n, 0) * p_like_pts
  from profiles p left join v on v.owner = p.owner left join l on l.owner = p.owner
  where coalesce(v.n, 0) + coalesce(l.n, 0) > 0
  order by 5 desc, 3 desc, p.created_at
  limit p_limit
$$;

-- Spins board: days with at least one spin since p_since (extra spins on the same day don't count,
-- so buying spins doesn't buy rank).
create or replace function public.board_spins(p_since date, p_limit integer)
returns table (owner text, nickname text, days integer)
language sql stable security definer set search_path = public as $$
  select p.owner, p.nickname, count(distinct s.spin_day)::int
  from profiles p join spins s on s.owner = p.owner
  where s.spin_day >= p_since
  group by p.owner, p.nickname, p.created_at
  order by 3 desc, p.created_at
  limit p_limit
$$;

-- Streaks board: current streak (still alive if they spun today or yesterday) and best ever.
create or replace function public.board_streaks(p_today date, p_limit integer)
returns table (owner text, nickname text, current integer, best integer)
language sql stable security definer set search_path = public as $$
  with d as (
    select distinct s.owner, s.spin_day from spins s join profiles p on p.owner = s.owner
  ), g as (
    select owner, spin_day, spin_day - (row_number() over (partition by owner order by spin_day))::int grp from d
  ), runs as (
    select owner, count(*)::int len, max(spin_day) last_day from g group by owner, grp
  )
  select p.owner, p.nickname,
    coalesce(max(r.len) filter (where r.last_day >= p_today - 1), 0)::int,
    max(r.len)::int
  from runs r join profiles p on p.owner = r.owner
  group by p.owner, p.nickname, p.created_at
  order by 3 desc, 4 desc, p.created_at
  limit p_limit
$$;

revoke execute on function public.board_videos(timestamptz, integer, integer, integer) from public, anon, authenticated;
revoke execute on function public.board_spins(date, integer) from public, anon, authenticated;
revoke execute on function public.board_streaks(date, integer) from public, anon, authenticated;
grant execute on function public.board_videos(timestamptz, integer, integer, integer) to service_role;
grant execute on function public.board_spins(date, integer) to service_role;
grant execute on function public.board_streaks(date, integer) to service_role;
