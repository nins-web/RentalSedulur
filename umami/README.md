# Umami Self-Host — Rental Sedulur (FREE, 38.6k⭐)

SSH ke 43.173.10.5 saat ini **Permission denied** (publickey), sama seperti 3 Sep lalu.
Jadi siapkan 2 opsi:

## Opsi A — Umami Cloud FREE (2 menit, tanpa VPS) — REKOMENDASI SEKARANG
1. Daftar di https://cloud.umami.is (free 1 website, 10k event/bulan)
2. Add website → Domain: `rental-sedulur.vercel.app` → copy **Website ID** (contoh `a1b2c3...`)
3. Ganti di `app/layout.tsx`:
   ```tsx
   <script defer src="https://cloud.umami.is/script.js" data-website-id="a1b2c3..." />
   ```
4. Commit → Vercel auto-deploy → data muncul di cloud.umami.is dashboard

## Opsi B — Self-Host di VPS 43.173.10.5 (100% gratis tanpa limit)
Jika ada akses **Tencent Cloud Console → Web Shell** (bukan SSH dari sini):

```bash
# di console VPS
mkdir -p ~/umami && cd ~/umami
# upload docker-compose.yml ini ke ~/umami/docker-compose.yml
nano docker-compose.yml  # paste isi file ini

# ganti 2 value:
# - umami_pass_ganti_ini → password baru
# - ganti_random_string_32_char → openssl rand -base64 32

docker compose up -d
docker compose ps  # harus 2 container running
# buka http://43.173.10.5:3002 → login admin / admin
# Add website → copy Website ID

# Lalu update app/layout.tsx:
# <script defer src="http://43.173.10.5:3002/script.js" data-website-id="ID_KAMU" />
```

## Opsi C — Vercel Analytics (sudah aktif, FREE)
Sudah terpasang `<Analytics />` di layout.tsx — cek di Vercel Dashboard → Analytics (gratis Hobby).

## Catatan
- Jangan expose Postgres ke public, hanya Umami port 3002
- Backup: `docker compose exec umami-db pg_dump -U umami umami > backup.sql`
