# SEO Plan — Rental Sedulur (via programmatic-seo + seo-audit, 47k⭐ skill)

## Programmatic SEO (15 pages)
Template: `app/(seo)/rental-ps-[kota]/page.tsx`
Kota: mojokerto, sooko, puri, jetis, gedeg, sidoarjo, jombang, surabaya-barat, krian, gresik, lamongan, ngoro, pacet, trawas, mojokerto-kota
Data per page: jarak ke Mojokerto, ongkir, 8 unit dengan harga sama, foto real, FAQ "Apakah bisa antar ke [kota]?"
URL: /rental-ps-mojokerto, /rental-ps-sidoarjo (subfolder, bukan subdomain)
Internal link: grid katalog → tiap unit card link ke /booking?unit=SD-PS4-01

## On-Page Checklist
- Title: "Rental PS4 & PS3 [Kota] — 8 Unit, Paket Malam 75k | Rental Sedulur"
- Desc: 155 char, sebut harga + antar + WA
- H1: Russo One, H2: Chakra Petch, harga pakai Chakra Bold
- Schema: LocalBusiness + Product (8 unit) + FAQ
- Images: foto real 800x600, alt "Rental PS4 Mojokerto SD-PS4-01", lazy load
- No Three.js, no emoji, cursor-pointer semua

## Technical
- sitemap.xml auto via next-sitemap
- robots.txt allow
- Canonical tiap halaman
- Core Web Vitals: LCP <2.5s (foto compress WebP)

## Content Strategy
2 artikel/bulan: "Game PS4 terbaik untuk mabar", "Tips nobar bola di rumah"
