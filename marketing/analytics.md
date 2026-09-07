# Analytics Tracking Plan — FREE Stack (Umami 38k⭐ + Vercel Analytics + GA4)

## Kenapa ganti Plausible?
Plausible 28k⭐ bagus tapi cloud berbayar ($9/bulan). Ganti ke **FREE**:

1. **Umami 38.6k⭐ (umami-software/umami)** — MIT, privacy-first, no cookie, self-host atau cloud.umami.is **GRATIS** untuk 1 website + 10k event/bulan
   - Setup: daftar di cloud.umami.is → copy `data-website-id` → paste di `app/layout.tsx`
   - Atau self-host di VPS 43.173.10.5 via Docker (1 command)

2. **Vercel Analytics (free tier)** — sudah include di Next.js via `@vercel/analytics`, auto track Web Vitals, gratis di hobby plan

3. **GA4 (opsional, free)** — uncomment di layout jika mau iklan Google nanti

## Events tetap sama
page_viewed, unit_card_clicked, booking_form_started, booking_bentrok_shown, booking_submitted, wa_clicked + utm_source per kota (Dub 24k⭐)

## Cara aktifkan (2 menit)
- Umami: daftar → ganti `rental-sedulur-free-id` di layout.tsx dengan ID asli → push → Vercel deploy → cek di cloud.umami.is dashboard
- Vercel: sudah aktif via `<Analytics />`, cek di Vercel Dashboard → Analytics
