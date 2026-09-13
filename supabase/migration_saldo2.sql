-- Ronde 5 susulan: pemakaian saldo dicatat sebagai nominal NEGATIF,
-- jadi cek nominal > 0 harus dicabut (saldo = sum approved).
-- Jalankan di Supabase SQL Editor.
ALTER TABLE topups DROP CONSTRAINT IF EXISTS topups_nominal_check;
