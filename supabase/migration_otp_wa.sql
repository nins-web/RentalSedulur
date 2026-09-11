-- OTP WhatsApp + members berbasis nomor HP. Jalankan di Supabase Dashboard > SQL Editor.
-- Menggantikan migration_member_paket.sql untuk bagian members (boleh tetap jalankan file itu untuk paket, bagian ini idempotent).

-- 1. Paket baru poster (idempotent, aman dijalankan ulang)
alter table bookings drop constraint if exists bookings_paket_check;
alter table bookings add constraint bookings_paket_check check (paket in ('12jam','harian','2hari','3hari','malam','mingguan'));

-- 2. Members berbasis nomor HP (tanpa auth.users — login via OTP WA + cookie sesi server)
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  phone text not null unique,
  created_at timestamptz default now()
);

-- 3. Kode OTP (hash saja, bukan kode asli)
create table if not exists otp_codes (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  attempts int not null default 0,
  used boolean not null default false,
  created_at timestamptz default now()
);
create index if not exists idx_otp_phone on otp_codes(phone, created_at);

-- 4. Kunci service-role saja yang boleh baca/tulis (anon ditolak total)
alter table members enable row level security;
alter table otp_codes enable row level security;
