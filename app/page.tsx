import { supabase } from '@/lib/supabase'
export default async function Page(){
  const {data:units} = await supabase.from('units').select('*').order('id')
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">Rental Sedulur - Mojokerto</h1>
      <p className="opacity-70">5 PS4 (130k/hari, 500k/minggu) • 3 PS3 (100k/hari, 350k/minggu) • Paket Malam diskon</p>
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {units?.map((u:any)=>(
          <div key={u.id} className="bg-zinc-900 p-4 rounded-xl">
            <div className="font-bold">{u.id} - {u.tipe}</div>
            <div className="text-sm opacity-70">Harian: Rp {u.harga_harian.toLocaleString()}</div>
            <div className="text-sm opacity-70">Malam: Rp {u.harga_malam.toLocaleString()}</div>
            <div className="text-sm opacity-70">Mingguan: Rp {u.harga_mingguan.toLocaleString()}</div>
            <a href={https://wa.me/6281289538855?text=Halo%20min,%20mau%20sewa%20${u.id}%20${u.tipe}} target="_blank" className="mt-3 block text-center bg-green-600 py-2 rounded-lg">Booking WA</a>
          </div>
        ))}
      </div>
    </main>
  )
}
