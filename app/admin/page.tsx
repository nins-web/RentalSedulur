tsx
import { supabase } from '@/lib/supabase'
export default async function Admin(){
  const {data:bookings} = await supabase.from('bookings').select('*, units(id,tipe)').order('created_at',{ascending:false}).limit(50)
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Admin - Booking Masuk</h1>
      <p className="opacity-70 text-sm">WA Admin 6281289538855 • {bookings?.length||0} booking</p>
      <div className="mt-6 space-y-3">
        {(bookings||[]).map((b:any)=>(
          <div key={b.id} className="bg-zinc-900 p-4 rounded-xl flex justify-between">
            <div>
              <div className="font-bold">{b.unit_id} • {b.paket} • Rp {Number(b.total).toLocaleString('id-ID')}</div>
              <div className="text-sm opacity-70">{b.nama} - {b.wa} • {b.tgl_mulai} s/d {b.tgl_selesai} • {b.status}</div>
            </div>
            <a href={https://wa.me/${b.wa.replace(/^0/,'62')}?text=Halo%20${b.nama},%20booking%20${b.unit_id}%20${b.paket}%20dikonfirmasi} target="_blank" className="bg-green-600 px-4 py-2 rounded-lg h-fit">Chat</a>
          </div>
        ))}
        {(!bookings||bookings.length===0) && <p className="opacity-50">Belum ada booking</p>}
      </div>
    </main>
  )
}
