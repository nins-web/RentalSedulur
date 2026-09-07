# Rental Sedulur - Mojokerto

Next.js 14 App Router + Supabase (rkriinnzjdpchtcdtfay) + Tailwind. 8 unit: 5× PS4 (130k/hari 75k/malam 500k/minggu) + 3× PS3 (100k/hari 50k/malam 350k/minggu). Paket malam diskon 38-40%. Anti double-booking per unit_id + overlap tanggal (trigger `trg_cegah_overlap`).

## Jalankan lokal
```
cp .env.example .env.local
# isi NEXT_PUBLIC_SUPABASE_URL dan ANON_KEY
npm install
npm run dev
```

## Deploy Vercel
Root: `/` , Build: `npm run build` , Region `iad1`. Set env di Vercel Dashboard.

## Supabase
Jalankan `supabase/schema.sql` di SQL Editor. Sudah ada RLS + trigger cegah bentrok.

## Legacy HTML
File HTML lama (CDN) dipindah ke `/legacy/` untuk arsip, tidak dipakai Next.js.

WA Admin: 6281289538855
