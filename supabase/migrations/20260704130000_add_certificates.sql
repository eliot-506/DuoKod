create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  certificate_code text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (course_id in ('html', 'css', 'js', 'python')),
  user_name text not null,
  average_score integer check (average_score between 0 and 100),
  issued_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.certificates enable row level security;

create policy "Users can read their own certificates"
on public.certificates for select to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own certificates"
on public.certificates for insert to authenticated
with check (auth.uid() = user_id);

create index if not exists certificates_user_id_idx on public.certificates(user_id);
