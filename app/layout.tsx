import './globals.css'
export const metadata = { title: 'Rental Sedulur - Mojokerto', description: 'Rental PS4 & PS3 Mojokerto - 8 unit anti double-booking' }
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="id"><body className="bg-zinc-950 text-white min-h-screen antialiased">{children}</body></html>
}
