-- Ronde 5: izinkan metode 'saldo' (potong saldo member) + 'cod' resmi.
-- Jalankan di Supabase SQL Editor.
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_metode_bayar_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_metode_bayar_check
  CHECK (metode_bayar IN ('cash','transfer','qris','cod','saldo'));
