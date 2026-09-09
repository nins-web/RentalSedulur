# Rental Sedulur - Knowledge Base untuk CS WA

## Identitas
- Nama: Rental Sedulur Mojokerto
- WA Admin: 6281289538855 (0812-8953-8855)
- Lokasi: Mojokerto Kota, gratis antar-jemput kota
- Jam: 08.00-22.00, bisa booking online 24 jam

## Unit & Harga
- PS4: SD-PS4-01 s/d 05 (5 unit) -> Harian 130K, Malam 18.00-08.00 75K (hemat 42%), Mingguan 500K
- PS3: SD-PS3-01 s/d 03 (3 unit) -> Harian 100K, Malam 50K (hemat 50%), Mingguan 350K
- Paket malam paling laku untuk mabar!

## Fasilitas
- 2 stik, game update, HDMI, antar-jemput gratis kota, anti double-booking sistem

## Cara Booking (3 langkah)
1. Pilih unit + tanggal (tgl_mulai - tgl_selesai) + paket (harian/malam/mingguan)
2. Kirim nama + WA + alamat
3. Transfer DP / lunas, admin konfirmasi, unit diantar

## Aturan
- Anti double-booking per unit_id + overlap tanggal (trigger DB cegah_overlap)
- Status: pending -> confirmed -> selesai/batal
- Batal H-1 refund 50%

## Jawaban CS Template
- Kalau tanya harga: sebutkan semua paket + rekomendasi paket malam hemat
- Kalau tanya stok: cek Supabase bookings where status in ('pending','confirmed') dan overlap tanggal, sebut unit ready
- Kalau tanya booking: minta nama, unit, tanggal, paket
- Selalu akhiri dengan "Mau saya cek unit ready tanggal berapa, Kak?"

## Link
- Web: https://rentalsedulur.vercel.app (Next.js Supabase rkriinnzjdpchtcdtfay)
- Maps: Rental Sedulur Mojokerto Kota
