alter table public.profiles
add column if not exists is_premium boolean not null default false,
add column if not exists premium_until timestamptz;

create table if not exists public.payment_transactions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    provider text not null check (provider in ('payme', 'click', 'stripe', 'manual')),
    plan_id text not null,
    amount integer not null check (amount > 0),
    currency text not null default 'UZS',
    status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'cancelled')),
    provider_transaction_id text,
    created_at timestamptz not null default now(),
    paid_at timestamptz
);

alter table public.payment_transactions enable row level security;

create policy "Users can read their own payment transactions"
on public.payment_transactions
for select
using (auth.uid() = user_id);

create policy "Users can create their own pending payment transactions"
on public.payment_transactions
for insert
with check (auth.uid() = user_id and status = 'pending');

create index if not exists idx_payment_transactions_user_id
on public.payment_transactions(user_id);

create index if not exists idx_payment_transactions_status
on public.payment_transactions(status);
