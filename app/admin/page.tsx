import { supabase } from '@/lib/supabase'
import AdminActions from './actions'
export const revalidate = 0
export default async function Admin(){
  const {data: bookings} = await supabase.from('bookings').select('*, units(id,tipe)').order('created_at',{ascending:false}).limit(100)
  const {data: units} = await supabase.from('units').select('id')
  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      <div className="h-2 w-full" style={{background: 'linear-gradient(90deg, #FF69B4, #00FFFF, #7C3AED, #FF69B4)'}} />
      <div className="absolute top-2 right-8 text-[#FF69B4]/20 text-2xl select-none">✦</div>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-display flex items-center gap-3">Admin — Booking Masuk <span className="text-xs px-2.5 py-1 rounded-full text-white font-bold" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>✦ Y2K</span></h1>
            <p className="text-sm text-[#64748B] mt-1">WA Admin 6281289538855 • {bookings?.length||0} booking • {units?.length||0} unit • untuk semua kalangan</p>
          </div>
          <a href="/" className="text-sm px-4 py-2 rounded-xl font-semibold transition cursor-pointer" style={{background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)', border: '2px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.08)'}}>← Katalog</a>
        </div>

        <div className="mt-6 space-y-3">
          {(bookings||[]).map((b:any)=>(
            <div key={b.id} className="bg-white p-4 rounded-[16px] flex flex-col md:flex-row md:justify-between gap-3 relative overflow-hidden" style={{border: '2px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 12px rgba(0,0,0,0.06)'}}>
              <div className="absolute top-0 left-0 right-0 h-6 rounded-t-[14px] pointer-events-none" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)'}} />
              <div className="relative">
                <div className="font-bold flex items-center gap-2 flex-wrap">{b.unit_id} • {b.paket} • Rp {Number(b.total).toLocaleString('id-ID')} • {(b as any).metode_bayar ? <span className="text-xs px-2 py-1 rounded-full font-bold border bg-white">{(b as any).metode_bayar === 'cod' ? '💵 COD' : '📷 QRIS'}</span> : null} • <span className={`text-xs px-2 py-1 rounded-full font-bold border ${b.status==='confirmed'?'text-white':b.status==='batal'?'text-white':'text-white'}`} style={{
                  background: b.status==='confirmed' ? 'linear-gradient(135deg, #10B981, #00FFFF)' : b.status==='batal' ? 'linear-gradient(135deg, #EF4444, #FF69B4)' : 'linear-gradient(135deg, #F59E0B, #FF69B4)',
                  borderColor: '#C0C0C0',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'
                }}>{b.status}</span></div>
                <div className="text-sm text-[#475569]">{b.nama} - {b.wa} • {b.tgl_mulai} s/d {b.tgl_selesai}</div>
                <div className="text-xs text-[#94A3B8]">{new Date(b.created_at).toLocaleString('id-ID')}</div>
              </div>
              <div className="flex gap-2 h-fit relative">
                <AdminActions id={b.id} status={b.status} />
                <a href={`https://wa.me/${String(b.wa).replace(/^0/,'62')}?text=${encodeURIComponent(`Halo ${b.nama}, booking ${b.unit_id} ${b.paket} ${b.tgl_mulai} s/d ${b.tgl_selesai} dikonfirmasi Rental Sedulur`)}`} target="_blank" className="text-white px-4 py-2 rounded-xl text-sm font-bold cursor-pointer" style={{background: 'linear-gradient(180deg, #2ED47A 0%, #25D366 100%)', border: '2px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'}}>✦ Chat WA</a>
              </div>
            </div>
          ))}
          {(!bookings||bookings.length===0) && <p className="text-center py-12 rounded-[16px] bg-white" style={{border: '2px solid #C0C0C0', color: '#64748B'}}>Belum ada booking — Y2K siap untuk semua kalangan ✦</p>}
        </div>
      </div>
    </main>
  )
}
