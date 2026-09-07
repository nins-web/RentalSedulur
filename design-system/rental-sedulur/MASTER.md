# Design System Master File - Rental Sedulur

> **LOGIC:** When building a specific page, first check `design-system/rental-sedulur/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Rental Sedulur — Rental PlayStation UMKM Mojokerto
**Generated:** 2026-09-07 — Enhanced for UMKM Gaming Rental
**Category:** Gaming + Local Service (Hybrid)
**Stack:** Next.js 14 App Router + Supabase + Tailwind + shadcn/ui + Vercel iad1
**Vibe:** Gaming energik tapi terpercaya — anak muda ngerasa keren, ibu-ibu ngerasa aman

---

## 1. Brand Story (Bahasa Orang Awam)

Analoginya: **wartung kopi kekinian yang jual PS.**
- Neon & gaming = lampu keren di warkop (bikin anak muda betah)
- Putih bersih & rapi = meja bersih, harga jelas (bikin orang tua percaya)
- Jadi: jangan full gelap kayak warnet underground, jangan full minimalis kayak kantor bank. Tengahnya.

**Target user:**
- 17-30 tahun Mojokerto & sekitar (Sidoarjo, Jombang, Surabaya barat)
- Sewa buat: nobar bola, mabar malam minggu, acara keluarga, rental harian event

**Personality:** Ramah, Jelas, Cepat, Gaming tapi tidak norak

---

## 2. Global Rules

### Color Palette — Dual Theme (Dark Hero + Light Booking)

#### Light Theme (Default — untuk booking flow, form, kalender)
| Role | Hex | CSS Variable | Pakai Buat |
|------|-----|--------------|------------|
| Primary | `#7C3AED` | `--color-primary` | Header, CTA utama, badge PS4 |
| On Primary | `#FFFFFF` | `--color-on-primary` | Teks di atas primary |
| Secondary | `#A78BFA` | `--color-secondary` | Hover, accent lembut |
| Accent/CTA WA | `#25D366` | `--color-accent` | Tombol WhatsApp (warna WA asli) |
| Accent Alt | `#F43F5E` | `--color-accent-alt` | Promo paket malam, diskon |
| Background | `#F8FAFC` | `--color-background` | Page background |
| Foreground | `#0F172A` | `--color-foreground` | Teks utama |
| Card | `#FFFFFF` | `--color-card` | Kartu unit PS |
| Card Foreground | `#0F172A` | `--color-card-foreground` | Teks di kartu |
| Muted | `#F1F5F9` | `--color-muted` | Background kalender, disabled date |
| Muted Foreground | `#64748B` | `--color-muted-foreground` | Teks sekunder |
| Border | `#E2E8F0` | `--color-border` | Garis kartu & input |
| Success/Available | `#10B981` | `--color-success` | Badge "Tersedia" |
| Warning/Booked | `#F59E0B` | `--color-warning` | Badge "Sudah dibooking" |
| Destructive | `#EF4444` | `--color-destructive` | Error, tanggal bentrok |
| Ring | `#7C3AED` | `--color-ring` | Focus ring |

#### Dark Theme (Hero & Header Gaming)
| Role | Hex | CSS Variable | Pakai Buat |
|------|-----|--------------|------------|
| Background Dark | `#0F0F23` | `--color-background-dark` | Hero section saja |
| Foreground Dark | `#E2E8F0` | `--color-foreground-dark` | Teks di hero |
| Card Dark | `#1E1C35` | `--color-card-dark` | Card di hero (opsional) |

**Catatan:** Jangan pakai full dark untuk form booking — ibu-ibu susah baca. Hero boleh dark + neon, tapi begitu scroll ke daftar unit & form, pindah ke light theme.

**Color Token CSS:**
```css
:root {
  --color-primary: #7C3AED;
  --color-accent: #25D366; /* WA green - jangan diganti merah untuk CTA WA */
  --color-accent-alt: #F43F5E; /* untuk diskon paket malam */
  --color-background: #F8FAFC;
  --color-success: #10B981;
  --color-warning: #F59E0B;
}
.dark-hero {
  --color-background: #0F0F23;
  --color-foreground: #E2E8F0;
}
```

### Typography — Gaming + Readable

| Level | Font | Weight | Size | Pakai |
|-------|------|--------|------|-------|
| Display/Hero | `Russo One` | 400 | 32-48px | Judul besar "Rental PS Mojokerto" |
| Heading | `Chakra Petch` | 600-700 | 20-28px | Nama unit SD-PS4-01 |
| Body | `Chakra Petch` | 400-500 | 16px | Deskripsi, harga |
| Label/Badge | `Inter` | 600 | 12-14px | Badge "PS4", "Tersedia", harga |
| Price | `Chakra Petch` | 700 | 18-24px | 130k/hari |

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Chakra+Petch:wght@400;500;600;700&family=Inter:wght@500;600&display=swap');
```
```js
// tailwind.config.js
fontFamily: {
  display: ['Russo One', 'sans-serif'],
  heading: ['Chakra Petch', 'sans-serif'],
  body: ['Chakra Petch', 'sans-serif'],
  label: ['Inter', 'sans-serif'],
}
```

**Aturan:** Harga jangan pakai Russo One (susah baca angka). Pakai Chakra Petch Bold untuk harga.

### Spacing & Radius

| Token | Value | Pakai |
|-------|-------|-------|
| `--space-xs` | 4px | Gap icon |
| `--space-sm` | 8px | Gap badge |
| `--space-md` | 16px | Padding card |
| `--space-lg` | 24px | Padding section |
| `--space-xl` | 32px | Gap antar card grid |
| `--space-2xl` | 48px | Margin section |
| `--radius-sm` | 8px | Badge, input |
| `--radius-md` | 12px | Card unit |
| `--radius-lg` | 16px | Modal, hero image |
| `--radius-full` | 9999px | Badge status tersedia |

### Shadow

| Level | Value | Pakai |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Card idle |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Card hover |
| `--shadow-lg` | `0 10px 24px rgba(0,0,0,0.12)` | Modal |
| `--shadow-neon` | `0 0 20px rgba(124,58,237,0.3)` | Hero CTA glow (jarang pakai) |

---

## 3. Page Pattern — Feature-Rich Showcase (UMKM Adapted)

**Conversion Strategy:** Lihat harga jelas → pilih unit → cek tanggal tersedia → WA admin. Jangan suruh user mikir.

**Section Order (wajib urut):**
1. **Hero Dark** (value prop) — "Rental PS4/PS3 Mojokerto — 8 Unit Siap Antar" + 2 CTA (Lihat Unit + WA Sekarang) + social proof kecil "⭐ 4.9/5 dari 200+ penyewa"
2. **Unit Grid (4-6 cards awal, load more)** — Filter: Semua | PS4 | PS3 | Paket Malam. Tiap card: foto PS, badge PS4/PS3, nama SD-PS4-01, harga 3 tier, badge tersedia/boking, tombol Booking
3. **Paket Hemat** — Kartu perbandingan: Harian vs Malam (diskon 38-40% highlight) vs Mingguan — kasih stiker "HEMAT 40%" di paket malam
4. **Cara Sewa (3 langkah)** — 1. Pilih unit & tanggal → 2. Isi data & cek anti double-booking → 3. WA admin 081289538855
5. **Social Proof** — Testimoni + foto unit real (jangan stock 3D berat)
6. **CTA Bottom** — "Mau booking malam ini?" + tombol WA besar warna hijau

**Anti-Pattern:** Jangan pakai WebGL/Three.js berat untuk UMKM — HP kentang di Mojokerto bakal nge-lag. Pakai foto real + CSS shadow saja.

---

## 4. Component Specs (Khusus Rental Sedulur)

### Unit Card — Komponen Paling Penting

```tsx
// Pakai shadcn: Card + CardHeader + CardContent + Badge + Button
// JANGAN single Card dengan banyak props

<Card className="rounded-[12px] bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer">
  <CardHeader className="p-0">
    <div className="relative">
      <img src="/ps4-01.jpg" className="rounded-t-[12px] h-48 w-full object-cover" />
      <Badge className="absolute top-3 left-3 bg-[#7C3AED] text-white font-label">PS4</Badge>
      <Badge className="absolute top-3 right-3 bg-[#10B981] text-white rounded-full">Tersedia</Badge>
      {/* Jika booked: bg-[#F59E0B] atau bg-slate-400 */}
    </div>
  </CardHeader>
  <CardContent className="p-4">
    <h3 className="font-heading font-bold text-lg">SD-PS4-01</h3>
    <p className="text-sm text-slate-500">Stik 2 • Game update • Antar Mojokerto kota</p>
    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
      <div className="bg-slate-50 rounded-lg p-2">
        <div className="text-xs text-slate-500">Harian</div>
        <div className="font-bold text-[#0F172A]">130k</div>
      </div>
      <div className="bg-[#FEF2F2] rounded-lg p-2 border border-[#F43F5E]/20 relative">
        <span className="absolute -top-2 -right-2 bg-[#F43F5E] text-white text-[10px] px-1.5 py-0.5 rounded-full">-42%</span>
        <div className="text-xs text-slate-500">Malam</div>
        <div className="font-bold text-[#F43F5E]">75k</div>
      </div>
      <div className="bg-slate-50 rounded-lg p-2">
        <div className="text-xs text-slate-500">Minggu</div>
        <div className="font-bold">500k</div>
      </div>
    </div>
    <Button className="mt-4 w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold cursor-pointer">
      Booking via WA
    </Button>
  </CardContent>
</Card>
```

**Varian PS3 (lebih murah, warna beda dikit):**
- Badge PS3 pakai `bg-slate-700` biar beda dari PS4 ungu
- Harga: 100k / 50k / 350k

### Availability Badge (Anti Double-Booking UI)

| Status | Warna | Icon | Teks |
|--------|-------|------|------|
| Tersedia | `#10B981` hijau | `CheckCircle` | Tersedia |
| Dipesan | `#F59E0B` kuning | `Clock` | Dibooking 12-14 Sep |
| Maintenance | `#64748B` abu | `Wrench` | Maintenance |

Jangan pakai merah untuk "dibooking" — merah = error, bikin panik. Kuning = informasi.

### Calendar Date Picker (Cegah Bentrok)

```css
/* Tanggal tersedia */
.day-available { background: white; color: #0F172A; border: 1px solid #E2E8F0; }
.day-available:hover { background: #F5F3FF; border-color: #7C3AED; }

/* Tanggal sudah dibooking unit ini */
.day-booked { background: #FEF3C7; color: #92400E; border: 1px solid #F59E0B; cursor: not-allowed; text-decoration: line-through; }

/* Tanggal dipilih user */
.day-selected { background: #7C3AED; color: white; }

/* Hari ini */
.day-today { border: 2px solid #7C3AED; }
```

**Logic UI:** Kalender harus query Supabase `unit_id + overlap tanggal` real-time. Kalau user pilih tanggal bentrok → toast merah "Unit SD-PS4-02 sudah dibooking tanggal itu, coba unit lain" + suggest unit lain yang tersedia.

### Paket Malam Highlight

Paket malam = USP (Unique Selling Point) Rental Sedulur. Harus paling menonjol:
- Card paket malam pakai border rose + background rose muda
- Stiker diskon besar "HEMAT 40%"
- Copy: "Main puas semalaman, bayar setengah harga harian"

### Buttons

```css
/* WA Primary - SELALU hijau WA */
.btn-wa {
  background: #25D366;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-family: Inter;
}
.btn-wa:hover { background: #1DA851; transform: translateY(-1px); }

/* Primary ungu - untuk Booking di web */
.btn-primary {
  background: #7C3AED;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
}
.btn-primary:hover { background: #6D28D9; }

/* Secondary */
.btn-secondary {
  background: transparent;
  color: #7C3AED;
  border: 2px solid #7C3AED;
  padding: 12px 24px;
  border-radius: 12px;
}
```

**Aturan:** Tombol WA jangan pakai ungu — otak user sudah hafal WA = hijau. Jangan dilawan.

### Inputs & Dialog (shadcn)

- Pakai `shadcn Dialog` untuk modal booking (jangan Alert)
- Input focus ring pakai `#7C3AED` dengan `box-shadow: 0 0 0 3px #7C3AED20`
- Semua input `font-size: 16px` biar tidak zoom di iPhone

---

## 5. Style Guidelines

**Style Hybrid:** Swiss Minimalism (untuk trust & readability) + Gaming Accent (untuk energy)
- **Layout:** Grid-based, spacious, white space banyak (jangan sesak)
- **Efek:** Subtle hover 200ms, shadow lembut — JANGAN parallax berat / Three.js
- **Ikon:** Lucide / Heroicons SVG — JANGAN emoji
- **Foto:** Foto real unit PS milik sendiri (8 unit difoto konsisten) — JANGAN render 3D berat

### Motion — Subtle Saja
- Card hover: `translateY(-2px)` + shadow md → lg (200ms)
- Grid stagger: `opacity 0 → 1, y 12 → 0, stagger 0.06s, ease power1.out` — hanya saat load, hormati `prefers-reduced-motion`

---

## 6. Anti-Patterns (JANGAN)

- ❌ Full dark mode untuk form booking
- ❌ WebGL/Three.js untuk UMKM (berat, HP kentang lag)
- ❌ Emoji sebagai ikon (pakai Lucide SVG)
- ❌ Harga tidak jelas / harus klik dulu baru lihat harga
- ❌ Kalender tanpa warna status (user harus tebak tersedia apa tidak)
- ❌ Tombol WA warna ungu/merah (harus hijau #25D366)
- ❌ Missing cursor-pointer di card/button
- ❌ Instant state change tanpa transition 150-300ms
- ❌ Focus ring hilang (a11y)
- ❌ Horizontal scroll di HP

---

## 7. Pre-Delivery Checklist (Cek Sebelum Publish)

- [ ] No emoji sebagai ikon (Lucide semua)
- [ ] `cursor-pointer` di semua card & button
- [ ] Hover 200ms smooth
- [ ] Kontras 4.5:1 (cek light & dark)
- [ ] Focus ring ungu terlihat saat Tab
- [ ] `prefers-reduced-motion` dihormati
- [ ] Responsive 375px, 768px, 1024px, 1440px — tidak ada horizontal scroll
- [ ] 8 card unit tampil benar (5 PS4 + 3 PS3) + filter bekerja
- [ ] Harga 130k/75k/500k (PS4) dan 100k/50k/350k (PS3) tampil jelas
- [ ] Badge diskon paket malam -42% muncul
- [ ] Kalender blokir tanggal bentrok (test overlap)
- [ ] Tombol WA link ke `wa.me/6281289538855` dengan prefill text
- [ ] Foto real, bukan placeholder 3D
- [ ] Loading pakai Supabase Suspense (Next.js streaming)
- [ ] Tidak ada Three.js/WebGL

---

## 8. Next.js + shadcn Implementation Notes

- **Rendering:** Pakai `Suspense` untuk unit grid (jangan tunggu semua data). `loading.tsx` untuk skeleton card.
- **shadcn:** Import individual `import { Card } from "@/components/ui/card"` — jangan barrel import.
- **Supabase:** Query availability `select * from bookings where unit_id = X and daterange overlap`. Index di `unit_id + tanggal`.
- **Tailwind:** Extend theme dengan token di atas sebagai CSS variables.

## 9. File Structure

```
design-system/rental-sedulur/
├── MASTER.md (file ini)
└── pages/
    ├── booking.md (override: kalender + form detail)
    ├── katalog.md (override: grid filter PS4/PS3)
    └── paket-malam.md (override: highlight hemat 40%)
```

> Saat build halaman booking, baca MASTER.md + pages/booking.md (jika ada). Page file override Master.
