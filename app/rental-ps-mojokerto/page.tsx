import { supabase } from '@/lib/supabase'
export const revalidate = 0
export const metadata = {
  title: 'Rental PS Mojokerto — PS4 75k/malam, 8 Unit Live | Rental Sedulur',
  description: 'Rental PS Mojokerto — cek live 8 unit, PS4 130k/hari 75k/malam, PS3 100k/50k/400k. Paket malam hemat 40%. WA 081289538855',
}
export default async function Page(){
  let units:any[]=[]
  let bookings:any[]=[]
  try{ const {data}=await supabase.from('units').select('*').order('id'); if(data) units=data; const {data:b}=await supabase.from('bookings').select('unit_id,tgl_mulai,tgl_selesai,status').in('status',['pending','confirmed']).gte('tgl_selesai', new Date().toISOString().slice(0,10)); bookings=b||[] }catch{}
  if(units.length===0) units=[
    {id:'SD-PS4-01',tipe:'PS4',harga_harian:130000,harga_malam:75000,harga_mingguan:500000},
    {id:'SD-PS4-02',tipe:'PS4',harga_harian:130000,harga_malam:75000,harga_mingguan:500000},
    {id:'SD-PS4-03',tipe:'PS4',harga_harian:130000,harga_malam:75000,harga_mingguan:500000},
    {id:'SD-PS3-01',tipe:'PS3',harga_harian:100000,harga_malam:50000,harga_mingguan:350000},
  ]
  const isBooked=(id:string)=>bookings.some((b:any)=>b.unit_id===id)
  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <div className="h-2 w-full" style={{background: 'linear-gradient(90deg, #FF69B4, #00FFFF, #7C3AED, #FF69B4)'}} />
      <section className="bg-[#0F0F23] text-[#E2E8F0] py-12 relative overflow-hidden">
        <div className="absolute top-4 right-8 text-[#FF69B4]/20 text-2xl">✦</div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="flex items-center gap-2 text-xs"><span className="px-3 py-1 rounded-full text-white font-bold" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>✦ Y2K Live</span><span className="text-[#94A3B8]">Ketersediaan real-time untuk semua kalangan</span></div>
          <h1 className="font-display text-3xl mt-3">RENTAL PS MOJOKERTO — <span className="text-[#A78BFA]">LIVE AVAILABILITY</span></h1>
          <p className="mt-3 text-[#94A3B8]">Wilayah: Mojokerto — <span className="text-[#10B981]">● Tersedia</span> / <span className="text-[#F59E0B]">● Dibooking</span> update live dari Supabase. Paket malam 19:00-07:00 cuma 75k.</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="font-heading font-bold text-xl flex items-center gap-2">Daftar Harga Mojokerto <span className="text-xs px-2 py-1 rounded-full bg-white border" style={{borderColor: '#C0C0C0'}}>{units.length} unit • live</span></h2>
        <div className="mt-4 grid md:grid-cols-4 gap-4">
          {units.map((u:any)=>{
            const booked=isBooked(u.id)
            return (
              <div key={u.id} className="bg-white rounded-[16px] p-4 relative overflow-hidden" style={{border: '2px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 12px rgba(0,0,0,0.06)'}}>
                <div className="absolute top-0 left-0 right-0 h-6 rounded-t-[14px]" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)'}} />
                <div className="flex justify-between items-start relative">
                  <div className="font-bold">{u.id} — {u.tipe}</div>
                  {booked ? (
                    <span className="text-white text-[10px] px-2 py-1 rounded-full font-bold" style={{background: 'linear-gradient(135deg, #F59E0B, #FF69B4)', border: '1px solid #C0C0C0'}}>● Dibooking</span>
                  ) : (
                    <span className="bg-[#10B981] text-white text-[10px] px-2 py-1 rounded-full">● Tersedia</span>
                  )}
                </div>
                <div className="text-sm text-[#64748B] mt-1">{u.harga_harian.toLocaleString('id-ID')}/hari • <span className="font-bold" style={{color: '#FF1493'}}>{u.harga_malam.toLocaleString('id-ID')}/malam</span></div>
                <a href={`/booking?unit=${u.id}`} className={`mt-3 block text-center text-white py-2 rounded-xl text-sm font-semibold cursor-pointer ${booked ? 'opacity-60 pointer-events-none' : ''}`} style={{background: booked ? '#94A3B8' : 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)', border: '1px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'}}>{booked ? 'Sudah Dibooking' : `Pilih ${u.id}`}</a>
              </div>
            )
          })}
        </div>
        <div className="mt-8 bg-white rounded-[16px] p-6" style={{border: '2px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)'}}>
          <h3 className="font-bold">FAQ Rental PS Mojokerto — Live</h3>
          <p className="text-sm text-[#64748B] mt-2">Ketersediaan di atas <b>live</b> — kalau ● Dibooking, tanggalnya masih ada booking pending/confirmed. Hubungi WA untuk cek tanggal lain.</p>
          <a href="https://wa.me/6281289538855?text=Halo%20kak%20mau%20rental%20PS%20Mojokerto%20-%20utm_source=rental-ps-mojokerto&utm_medium=wa" target="_blank" className="mt-4 inline-block text-white px-6 py-3 rounded-[12px] font-semibold cursor-pointer" style={{background: 'linear-gradient(180deg, #25D366 0%, #1DA851 100%)', border: '2px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'}}>Chat WA 0812-8953-8855 — Mojokerto</a>
        </div>
      </section>
    </main>
  )
}
