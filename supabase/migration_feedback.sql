-- Kritik & saran. Jalankan di Supabase Dashboard > SQL Editor.
create table if not exists feedbacks (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  unit_id text not null,
  nama text not null,
  rating int not null check (rating between 1 and 5),
  pesan text not null,
  created_at timestamptz default now()
);
create index if not exists idx_feedbacks_booking on feedbacks(booking_id);
alter table feedbacks enable row level security;
drop policy if exists "feedbacks read all" on feedbacks;
create policy "feedbacks read all" on feedbacks for select using (true);
drop policy if exists "feedbacks insert all" on feedbacks;
create policy "feedbacks insert all" on feedbacks for insert with check (true);
