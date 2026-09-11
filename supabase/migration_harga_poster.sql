-- Samakan DB dengan poster (PS3 mingguan 350k -> 400k). Jalankan di Supabase Dashboard > SQL Editor.
UPDATE units SET harga_mingguan = 400000 WHERE tipe = 'PS3';
