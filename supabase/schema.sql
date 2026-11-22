-- ============================================================
-- Chase Nexus / Production Social Schema
-- Supabase Project: rvetucuqburqnrgoatui
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rvetucuqburqnrgoatui/sql/new
-- ============================================================

-- Enable pgcrypto for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 1. NEXUS PROFILES (Synced with auth.users)
-- ------------------------------------------------------------
create table if not exists public.nexus_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    username text unique,
    display_name text not null default 'Chase Member',
    bio text default '',
    avatar_url text,
    cover_url text,
    verified boolean not null default true,
    badge_type text not null default 'chase-account',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.nexus_profiles enable row level security;

-- Public can read all profiles
drop policy if exists "Public profiles are viewable by everyone" on public.nexus_profiles;
create policy "Public profiles are viewable by everyone"
    on public.nexus_profiles for select
    using (true);

-- Authenticated users can insert their own profile
drop policy if exists "Users can insert their own profile" on public.nexus_profiles;
create policy "Users can insert their own profile"
    on public.nexus_profiles for insert
    with check (auth.uid() = id);

-- Authenticated users can update their own profile
drop policy if exists "Users can update their own profile" on public.nexus_profiles;
create policy "Users can update their own profile"
    on public.nexus_profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- ------------------------------------------------------------
-- 2. NEXUS POSTS (Persistent social posts)
-- ------------------------------------------------------------
create table if not exists public.nexus_posts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    author_name text not null,
    author_handle text not null,
    body text not null,
    audience text not null default 'public',
    feeds text[] not null default array['for-you', 'following'],
    hashtags text[] not null default array[]::text[],
    image_url text,
    image_label text,
    poll_data jsonb,
    quote_data jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.nexus_posts enable row level security;

-- Public can read public posts
drop policy if exists "Public posts are viewable by everyone" on public.nexus_posts;
create policy "Public posts are viewable by everyone"
    on public.nexus_posts for select
    using (audience = 'public' or auth.uid() = user_id or auth.uid() is not null);

-- Authenticated users can insert posts
drop policy if exists "Authenticated users can create posts" on public.nexus_posts;
create policy "Authenticated users can create posts"
    on public.nexus_posts for insert
    with check (auth.uid() = user_id);

-- Authors can update their own posts
drop policy if exists "Users can update own posts" on public.nexus_posts;
create policy "Users can update own posts"
    on public.nexus_posts for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- Authors can delete their own posts
drop policy if exists "Users can delete own posts" on public.nexus_posts;
create policy "Users can delete own posts"
    on public.nexus_posts for delete
    using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 3. NEXUS COMMENTS
-- ------------------------------------------------------------
create table if not exists public.nexus_comments (
    id uuid primary key default gen_random_uuid(),
    post_id uuid references public.nexus_posts(id) on delete cascade not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    author_name text not null,
    body text not null,
    parent_id uuid references public.nexus_comments(id) on delete cascade,
    created_at timestamptz not null default now()
);

alter table public.nexus_comments enable row level security;

drop policy if exists "Comments are viewable by everyone" on public.nexus_comments;
create policy "Comments are viewable by everyone"
    on public.nexus_comments for select
    using (true);

drop policy if exists "Authenticated users can post comments" on public.nexus_comments;
create policy "Authenticated users can post comments"
    on public.nexus_comments for insert
    with check (auth.uid() = user_id);

drop policy if exists "Users can delete own comments" on public.nexus_comments;
create policy "Users can delete own comments"
    on public.nexus_comments for delete
    using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 4. NEXUS REACTIONS (Likes, Celebrates, Supports)
-- ------------------------------------------------------------
create table if not exists public.nexus_reactions (
    id uuid primary key default gen_random_uuid(),
    post_id uuid references public.nexus_posts(id) on delete cascade not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    reaction_type text not null, -- 'like' | 'celebrate' | 'support'
    created_at timestamptz not null default now(),
    unique(post_id, user_id)
);

alter table public.nexus_reactions enable row level security;

drop policy if exists "Reactions viewable by everyone" on public.nexus_reactions;
create policy "Reactions viewable by everyone"
    on public.nexus_reactions for select
    using (true);

drop policy if exists "Authenticated users can add reactions" on public.nexus_reactions;
create policy "Authenticated users can add reactions"
    on public.nexus_reactions for insert
    with check (auth.uid() = user_id);

drop policy if exists "Users can update own reactions" on public.nexus_reactions;
create policy "Users can update own reactions"
    on public.nexus_reactions for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

drop policy if exists "Users can remove own reactions" on public.nexus_reactions;
create policy "Users can remove own reactions"
    on public.nexus_reactions for delete
    using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 5. NEXUS FOLLOWS
-- ------------------------------------------------------------
create table if not exists public.nexus_follows (
    follower_id uuid references auth.users(id) on delete cascade not null,
    following_id uuid references auth.users(id) on delete cascade not null,
    created_at timestamptz not null default now(),
    primary key(follower_id, following_id)
);

alter table public.nexus_follows enable row level security;

drop policy if exists "Follows viewable by everyone" on public.nexus_follows;
create policy "Follows viewable by everyone"
    on public.nexus_follows for select
    using (true);

drop policy if exists "Users can manage own follows" on public.nexus_follows;
create policy "Users can manage own follows"
    on public.nexus_follows for insert
    with check (auth.uid() = follower_id);

drop policy if exists "Users can unfollow" on public.nexus_follows;
create policy "Users can unfollow"
    on public.nexus_follows for delete
    using (auth.uid() = follower_id);

-- ------------------------------------------------------------
-- 6. NEXUS BOOKMARKS
-- ------------------------------------------------------------
create table if not exists public.nexus_bookmarks (
    user_id uuid references auth.users(id) on delete cascade not null,
    post_id uuid references public.nexus_posts(id) on delete cascade not null,
    created_at timestamptz not null default now(),
    primary key(user_id, post_id)
);

alter table public.nexus_bookmarks enable row level security;

drop policy if exists "Users can view own bookmarks" on public.nexus_bookmarks;
create policy "Users can view own bookmarks"
    on public.nexus_bookmarks for select
    using (auth.uid() = user_id);

drop policy if exists "Users can insert own bookmarks" on public.nexus_bookmarks;
create policy "Users can insert own bookmarks"
    on public.nexus_bookmarks for insert
    with check (auth.uid() = user_id);

drop policy if exists "Users can delete own bookmarks" on public.nexus_bookmarks;
create policy "Users can delete own bookmarks"
    on public.nexus_bookmarks for delete
    using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 7. TRIGGER: AUTO-CREATE NEXUS PROFILE ON NEW SIGNUP
-- ------------------------------------------------------------
create or replace function public.handle_new_nexus_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
    clean_username text;
    derived_name text;
begin
    clean_username := split_part(new.email, '@', 1);
    derived_name := initcap(replace(clean_username, '.', ' '));

    insert into public.nexus_profiles (id, email, username, display_name, verified, badge_type)
    values (
        new.id,
        new.email,
        clean_username || '_' || substring(new.id::text, 1, 4),
        derived_name,
        true,
        'chase-account'
    )
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created_nexus on auth.users;
create trigger on_auth_user_created_nexus
    after insert on auth.users
    for each row execute function public.handle_new_nexus_user();

-- Backfill existing users from auth.users
insert into public.nexus_profiles (id, email, username, display_name, verified, badge_type)
select
    id,
    email,
    split_part(email, '@', 1) || '_' || substring(id::text, 1, 4),
    initcap(replace(split_part(email, '@', 1), '.', ' ')),
    true,
    'chase-account'
from auth.users
on conflict (id) do nothing;
