# Katalog Page Overrides — Rental Sedulur

> Override untuk halaman `/` dan `/katalog`

## Spesifik Katalog

### Filter Bar (Sticky)
- [Semua (8)] [PS4 (5)] [PS3 (3)] [Paket Malam Hemat] [Tersedia Hari Ini]
- Filter animasi stagger 0.06s

### Grid
- Desktop: 4 kolom, Tablet: 2 kolom, Mobile: 1 kolom
- Skeleton loading dengan shadcn Skeleton (jangan spinner tengah)
- Empty state filter: "Tidak ada PS4 tersedia hari ini, coba PS3?"

### Card Priority
- Urut: Tersedia dulu di atas, dibooking di bawah (opacity 0.6)
- PS4 dulu, PS3 setelahnya
