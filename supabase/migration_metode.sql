-- Rental Sedulur: tambah metode bayar + catatan di bookings
-- Jalankan sekali di Supabase SQL Editor (rkriinnzjdpchtcdtfay)
alter table bookings add column if not exists metode_bayar text not null default 'qris' check (metode_bayar in ('qris','cod'));
alter table bookings add column if not exists catatan text;
