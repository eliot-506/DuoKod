create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'super_admin'
  );
$$;

revoke all on function public.is_super_admin() from public;
grant execute on function public.is_super_admin() to authenticated;

create table if not exists public.lesson_contents (
  course_id text not null,
  lesson_id integer not null,
  title text not null,
  description text not null default '',
  theory jsonb not null default '[]'::jsonb,
  questions jsonb not null default '[]'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (course_id, lesson_id),
  constraint lesson_contents_course_check check (course_id in ('html', 'css', 'js', 'python')),
  constraint lesson_contents_theory_array check (jsonb_typeof(theory) = 'array'),
  constraint lesson_contents_questions_array check (jsonb_typeof(questions) = 'array')
);

alter table public.lesson_contents enable row level security;

drop policy if exists "Authenticated users can read lesson contents" on public.lesson_contents;
create policy "Authenticated users can read lesson contents"
on public.lesson_contents
for select
to authenticated
using (true);

drop policy if exists "Super admins can insert lesson contents" on public.lesson_contents;
create policy "Super admins can insert lesson contents"
on public.lesson_contents
for insert
to authenticated
with check (public.is_super_admin() and updated_by = auth.uid());

drop policy if exists "Super admins can update lesson contents" on public.lesson_contents;
create policy "Super admins can update lesson contents"
on public.lesson_contents
for update
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin() and updated_by = auth.uid());

drop policy if exists "Super admins can delete lesson contents" on public.lesson_contents;
create policy "Super admins can delete lesson contents"
on public.lesson_contents
for delete
to authenticated
using (public.is_super_admin());

create index if not exists lesson_contents_course_idx
on public.lesson_contents (course_id, lesson_id);
