import './globals.css'
import { Analytics } from '@vercel/analytics/react'
export const metadata = {
  title: {
    default: 'Rental Sedulur - Rental PS4 & PS3 Mojokerto | 8 Unit, Paket Malam 75k',
    template: '%s | Rental Sedulur'
  },
  description: 'Rental PS4 & PS3 Mojokerto — 8 unit (5 PS4 130k/hari 75k/malam 500k/minggu, 3 PS3 100k/50k/350k). Paket malam hemat 40%, antar gratis kota, booking anti double-booking. WA 081289538855',
  keywords: ['rental ps mojokerto','rental ps4 mojokerto','rental ps3 mojokerto','sewa ps mojokerto','rental playstation mojokerto','paket malam ps'],
  authors: [{ name: 'Rental Sedulur' }],
  metadataBase: new URL('https://rental-sedulur.vercel.app'),
  openGraph: {
    title: 'Rental Sedulur - Rental PS4 & PS3 Mojokerto',
    description: '8 unit siap antar, paket malam 75k hemat 40%, booking anti bentrok',
    url: 'https://rental-sedulur.vercel.app',
    siteName: 'Rental Sedulur',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Rental Sedulur Mojokerto', description: 'Rental PS4/PS3 8 unit, paket malam hemat' },
  robots: { index: true, follow: true },
  verification: { google: '' }
}
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="id">
      <head>
        {/* Umami Analytics — 38.6k⭐ FREE (umami-software/umami) — privacy-first, self-host or cloud.umami.is free tier */}
        {/* Ganti data-website-id dengan ID dari cloud.umami.is (gratis) atau URL self-host */}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="rental-sedulur-free-id"></script>
        {/* Google Analytics 4 — FREE (opsional, isi G-XXXX) — uncomment jika punya */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{__html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','G-XXXXXXXXXX');"}} /> */}
        {/* LocalBusiness Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"LocalBusiness",
          "name":"Rental Sedulur",
          "description":"Rental PS4 & PS3 Mojokerto — 8 unit, paket malam hemat 40%",
          "telephone":"+6281289538855",
          "address":{"@type":"PostalAddress","addressLocality":"Mojokerto","addressRegion":"Jawa Timur","addressCountry":"ID"},
          "priceRange":"Rp50000-500000",
          "openingHours":"Mo-Su 09:00-23:00",
          "url":"https://rental-sedulur.vercel.app"
        })}} />
      </head>
      <body className="bg-[#F8FAFC] text-[#0F172A] min-h-screen antialiased font-body">{children}<Analytics /></body>
    </html>
  )
}
