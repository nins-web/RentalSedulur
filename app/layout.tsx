import './globals.css'
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
        {/* Plausible Analytics - privacy-first, 28k⭐ (plausible/analytics) */}
        <script defer data-domain="rental-sedulur.vercel.app" src="https://plausible.io/js/script.js"></script>
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
      <body className="bg-[#F8FAFC] text-[#0F172A] min-h-screen antialiased font-body">{children}</body>
    </html>
  )
}
