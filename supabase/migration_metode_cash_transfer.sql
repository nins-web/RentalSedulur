-- Samakan metode bayar dengan aplikasi (cash/transfer). Jalankan di Supabase Dashboard > SQL Editor.
UPDATE bookings SET metode_bayar = 'cash' WHERE metode_bayar = 'cod';
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_metode_bayar_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_metode_bayar_check CHECK (metode_bayar IN ('cash','transfer','qris'));
