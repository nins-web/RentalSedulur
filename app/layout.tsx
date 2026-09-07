import './globals.css'
export const metadata = { title: 'Rental Sedulur - Rental PS4 & PS3 Mojokerto', description: 'Rental PS4 & PS3 Mojokerto - 8 unit anti double-booking, paket malam hemat 40% - WA 081289538855' }
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="id"><body className="bg-[#F8FAFC] text-[#0F172A] min-h-screen antialiased font-body">{children}</body></html>
}
