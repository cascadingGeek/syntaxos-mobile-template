-- The starter's one table, and the RLS policies that make it safe.
--
-- RLS is the authorization boundary for the whole app (doc §1). A table
-- without it is readable by anyone holding the anon key — which ships inside
-- the .apk. So: enable RLS, then write a policy per operation.

create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 200),
  body        text not null default '' check (char_length(body) <= 10000),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Every policy below filters on user_id, so the lookup must be indexed or
-- each query degrades to a sequential scan as the table grows.
create index if not exists notes_user_id_created_at_idx
  on public.notes (user_id, created_at desc);

alter table public.notes enable row level security;

-- Separate policies per operation rather than one FOR ALL: the intent stays
-- readable, and a future change to (say) delete can't silently widen select.
create policy "notes are selectable by owner"
  on public.notes for select
  using (auth.uid() = user_id);

create policy "notes are insertable by owner"
  on public.notes for insert
  with check (auth.uid() = user_id);

create policy "notes are updatable by owner"
  on public.notes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "notes are deletable by owner"
  on public.notes for delete
  using (auth.uid() = user_id);

-- updated_at maintained in the database, not the client: a client clock is
-- untrusted input and every write path would otherwise have to remember.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists notes_set_updated_at on public.notes;
create trigger notes_set_updated_at
  before update on public.notes
  for each row execute function public.set_updated_at();
