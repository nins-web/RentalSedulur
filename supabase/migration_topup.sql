-- Top-up saldo member v1 (manual approve admin).
-- Jalankan di Supabase SQL Editor. Aman dijalankan ulang.

create table if not exists topups (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  nama text not null default 'Member',
  nominal integer not null check (nominal > 0),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);
create index if not exists idx_topups_phone on topups(phone);
create index if not exists idx_topups_status on topups(status);

alter table topups enable row level security;
drop policy if exists "topups read all" on topups;
create policy "topups read all" on topups for select using (true);
drop policy if exists "topups insert all" on topups;
create policy "topups insert all" on topups for insert with check (true);
drop policy if exists "topups update all" on topups;
create policy "topups update all" on topups for update using (true);
