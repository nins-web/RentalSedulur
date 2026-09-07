# Booking Page Overrides — Rental Sedulur

> Override untuk halaman `/booking/[unit_id]` — override MASTER.md

## Spesifik Halaman Ini

### Layout
- 2 kolom desktop: kiri kalender + form, kanan ringkasan harga & unit
- 1 kolom mobile: kalender di atas, ringkasan sticky bottom

### Komponen Khusus
1. **Calendar dengan Anti Double-Booking**
   - Query Supabase live: `bookings where unit_id = SD-PS4-01 AND NOT (end < selected_start OR start > selected_end)`
   - Tanggal booked = kuning + coret + tooltip "Sudah dibooking"
   - Pilih start & end date → hitung otomatis: harian / malam / mingguan
   - Jika pilih paket malam (19:00-07:00) → highlight rose + stiker hemat 40%

2. **Price Summary (Sticky)**
   ```
   SD-PS4-01 × 2 hari (12-14 Sep)
   Harian 130k × 2 = 260k
   Diskon paket malam? → ganti ke 75k/malam jika jam malam
   Total: 260k
   DP 50k via transfer / bayar full di tempat
   ```

3. **Form**
   - Nama, WA, Alamat antar, Catatan
   - Validasi: WA wajib 62..., tanggal wajib, cek bentrok sebelum submit
   - Submit → insert Supabase + redirect WA `wa.me/6281289538855?text=Halo%20kak%20mau%20booking%20SD-PS4-01%20tanggal...`

### CTA
- Primary: "Konfirmasi & Chat WA" (hijau #25D366)
- Secondary: "Cek Unit Lain yang Tersedia" (jika tanggal bentrok)

### State Kosong
- Jika semua unit dibooking tanggal itu → tampil "Waduh, semua unit full tanggal itu 😅 Coba tanggal lain atau WA admin buat waiting list"
