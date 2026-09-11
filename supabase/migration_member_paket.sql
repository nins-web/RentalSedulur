-- Member + paket baru. Jalankan di Supabase Dashboard > SQL Editor.
-- 1. Tabel members (profil pendaftar OTP HP / Google)
create table if not exists members (
  id uuid primary key references auth.users(id) on delete cascade,
  nama text not null,
  phone text,
  created_at timestamptz default now()
);
alter table members enable row level security;
drop policy if exists "members own" on members;
create policy "members own" on members for all using (auth.uid() = id) with check (auth.uid() = id);

-- 2. Paket baru poster: 12jam/2hari/3hari (constraint lama hanya harian/malam/mingguan)
alter table bookings drop constraint if exists bookings_paket_check;
alter table bookings add constraint bookings_paket_check check (paket in ('12jam','harian','2hari','3hari','malam','mingguan'));
