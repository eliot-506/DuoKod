alter table public.course_progress
add column if not exists lesson_scores jsonb not null default '{}'::jsonb;
