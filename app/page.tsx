import { supabase } from '@/lib/supabase'
export const revalidate = 0
export default async function Page(){
  const {data: units} = await supabase.from('units').select('*').order('id')
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <header className="py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-black font-bold">RS</div>
          <span className="font-semibold text-lg">Rental Sedulur</span>
        </div>
        <nav className="flex gap-4 text-sm opacity-80">
          <a href="/" className="text-white font-bold">Katalog</a>
          <a href="/booking" className="hover:text-white">Booking</a>
          <a href="/admin" className="hover:text-white">Admin</a>
        </nav>
      </header>
      <h1 className="text-3xl md:text-4xl font-extrabold">Rental Sedulur - Mojokerto</h1>
      <p className="opacity-70 mt-2">5× PS4: 130k/hari • 75k/malam (20:00-08:00) • 500k/minggu &nbsp;|&nbsp; 3× PS3: 100k/hari • 50k/malam • 350k/minggu • Paket malam diskon 38-40% • WA 6281289538855</p>
      <div className="grid md:grid-cols-4 gap-4 mt-8">
        {(units||[]).map((u:any)=>(
          <div key={u.id} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <div className="font-bold">{u.id} <span className="opacity-60">- {u.tipe}</span></div>
            <div className="text-sm opacity-70 mt-2">Harian: Rp {Number(u.harga_harian).toLocaleString('id-ID')}</div>
            <div className="text-sm opacity-70">Malam: Rp {Number(u.harga_malam).toLocaleString('id-ID')}</div>
            <div className="text-sm opacity-70">Mingguan: Rp {Number(u.harga_mingguan).toLocaleString('id-ID')}</div>
            <a href={`/booking?unit=${u.id}`} className="mt-4 block text-center bg-green-600 hover:bg-green-500 py-2.5 rounded-xl font-bold">Booking {u.id}</a>
            <a href={`https://wa.me/6281289538855?text=${encodeURIComponent(`Halo min, mau sewa ${u.id} ${u.tipe}`)}`} target="_blank" className="mt-2 block text-center bg-zinc-800 py-2 rounded-xl text-sm">Chat WA</a>
          </div>
        ))}
        {(!units || units.length===0) && <p className="opacity-50 col-span-4">Belum ada unit - jalankan supabase/schema.sql</p>}
      </div>
      <p className="mt-10 text-xs opacity-40">Anti double-booking aktif per unit_id + overlap tanggal. Deploy Vercel iad1.</p>
    </main>
  )
}
