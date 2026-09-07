import { supabase } from '@/lib/supabase'
export const revalidate = 0
export default async function Admin(){
  const {data: bookings} = await supabase.from('bookings').select('*, units(id,tipe)').order('created_at',{ascending:false}).limit(100)
  const {data: units} = await supabase.from('units').select('id')
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin - Booking Masuk</h1>
        <a href="/" className="text-sm bg-zinc-800 px-3 py-1.5 rounded-lg">← Katalog</a>
      </div>
      <p className="opacity-70 text-sm mt-1">WA Admin 6281289538855 • {bookings?.length||0} booking • {units?.length||0} unit</p>
      <div className="mt-6 space-y-3">
        {(bookings||[]).map((b:any)=>(
          <div key={b.id} className="bg-zinc-900 p-4 rounded-xl flex flex-col md:flex-row md:justify-between gap-3 border border-zinc-800">
            <div>
              <div className="font-bold">{b.unit_id} • {b.paket} • Rp {Number(b.total).toLocaleString('id-ID')} • <span className={b.status==='confirmed'?'text-green-400':b.status==='batal'?'text-red-400':'text-yellow-400'}>{b.status}</span></div>
              <div className="text-sm opacity-70">{b.nama} - {b.wa} • {b.tgl_mulai} s/d {b.tgl_selesai}</div>
              <div className="text-xs opacity-40">{new Date(b.created_at).toLocaleString('id-ID')}</div>
            </div>
            <div className="flex gap-2 h-fit">
              <a href={`https://wa.me/${String(b.wa).replace(/^0/,'62')}?text=${encodeURIComponent(`Halo ${b.nama}, booking ${b.unit_id} ${b.paket} ${b.tgl_mulai} s/d ${b.tgl_selesai} dikonfirmasi Rental Sedulur`)}`} target="_blank" className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm font-bold">Chat WA</a>
            </div>
          </div>
        ))}
        {(!bookings||bookings.length===0) && <p className="opacity-50">Belum ada booking</p>}
      </div>
    </main>
  )
}
