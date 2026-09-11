import { supabase } from '@/lib/supabase'
export const revalidate = 0

const FALLBACK_UNITS = [
  { id: 'SD-PS4-01', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-02', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-03', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-04', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-05', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS3-01', tipe: 'PS3', harga_harian: 100000, harga_malam: 50000, harga_mingguan: 400000 },
  { id: 'SD-PS3-02', tipe: 'PS3', harga_harian: 100000, harga_malam: 50000, harga_mingguan: 400000 },
  { id: 'SD-PS3-03', tipe: 'PS3', harga_harian: 100000, harga_malam: 50000, harga_mingguan: 400000 },
]

// Y2K Icon — glossy aqua + chrome, untuk semua kalangan (tidak cuma ibu-ibu)
function Y2KController({ ps4 }: { ps4: boolean }){
  return (
    <div className="relative">
      {/* glossy aqua bubble background — Frutiger Aero / Windows XP */}
      <div className="absolute inset-0 rounded-[20px] opacity-60" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 55%), linear-gradient(135deg, #00FFFF 0%, #7C3AED 50%, #FF69B4 100%)', filter: 'blur(12px)'}} />
      <div className="relative w-24 h-24 rounded-[20px] flex items-center justify-center" style={{
        background: 'linear-gradient(180deg, #E0F7FF 0%, #00D4FF 15%, #7C3AED 100%)',
        border: '2px solid #C0C0C0',
        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 16px rgba(124,58,237,0.3)',
      }}>
        {/* highlight glossy di atas */}
        <div className="absolute top-1 left-2 right-2 h-8 rounded-full opacity-70" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, transparent 100%)'}} />
        {/* icon controller SVG chrome */}
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          <path d="M6 12c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2c0 2.2-1.8 4-4 4h-4c-2.2 0-4-1.8-4-4v-2z" fill="url(#chrome)" stroke="#5B21B6" strokeWidth="0.8"/>
          <circle cx="9" cy="13" r="1.2" fill="#1F2937"/><circle cx="9" cy="15.5" r="0.7" fill="#374151"/><circle cx="15" cy="13" r="1.2" fill="#FF69B4"/><circle cx="15.5" cy="15" r="0.7" fill="#00FFFF"/>
          <defs><linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="50%" stopColor="#C0C0C0"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
        </svg>
        {/* sparkle 2000an */}
        <span className="absolute -top-1 -right-1 text-[10px]">✦</span><span className="absolute -bottom-1 -left-1 text-[8px] opacity-70">✧</span>
      </div>
    </div>
  )
}

function PriceCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  if(highlight){
    // Y2K bubblegum gradient untuk paket malam — untuk semua kalangan
    return (
      <div className="rounded-lg p-2 border text-center relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #E0F7FF 100%)',
        borderColor: 'rgba(255,105,180,0.3)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)'
      }}>
        <span className="absolute -top-2 -right-2 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>✦ -42%</span>
        <div className="text-[10px] text-[#64748B] font-label">{label}</div>
        <div className="font-bold text-sm" style={{color: '#FF1493', textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>{value}</div>
      </div>
    )
  }
  return (
    <div className="bg-[#F8FAFC] border-[#E2E8F0] rounded-lg p-2 border text-center">
      <div className="text-[10px] text-[#64748B] font-label">{label}</div>
      <div className="font-bold text-sm text-[#0F172A]">{value}</div>
    </div>
  )
}

export default async function Page() {
  let units: any[] | null = null
  let bookings: any[] = []
  try {
    const { data } = await supabase.from('units').select('*').order('id')
    units = data && data.length > 0 ? data : FALLBACK_UNITS
    const { data: b } = await supabase.from('bookings').select('unit_id,tgl_mulai,tgl_selesai,status').in('status', ['pending','confirmed']).gte('tgl_selesai', new Date().toISOString().slice(0,10))
    bookings = b || []
  } catch { units = FALLBACK_UNITS }
  if (!units) units = FALLBACK_UNITS
  const isBooked = (id:string) => bookings.some((b:any)=> b.unit_id===id)
  const getBooking = (id:string) => bookings.find((b:any)=> b.unit_id===id)

  const ps4Count = units.filter(u => u.tipe === 'PS4').length
  const ps3Count = units.filter(u => u.tipe === 'PS3').length

  return (
    <main>
      {/* NAV Y2K — untuk semua kalangan */}
      <nav className="bg-[#0F0F23] border-b sticky top-0 z-50" style={{borderColor: 'rgba(192,192,192,0.2)'}}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <a href="/" className="font-display text-lg text-white flex items-center gap-2">Rental Sedulur <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>Y2K</span></a>
          <div className="flex gap-2">
            <a href="/login" className="text-sm px-3 py-1.5 rounded-xl bg-white text-[#0F172A] font-semibold border" style={{borderColor: '#C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)'}}>Member Login</a>
            <a href="/admin/login" className="text-sm px-3 py-1.5 rounded-xl text-white font-semibold" style={{background: 'linear-gradient(135deg, #1E293B, #7C3AED)', border: '1px solid #C0C0C0'}}>Admin</a>
          </div>
        </div>
      </nav>
      {/* HERO DARK dengan sentuhan Y2K chrome untuk semua kalangan */}
      <section className="bg-[#0F0F23] text-[#E2E8F0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 30% 50%, #7C3AED 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, #FF69B4 0%, transparent 40%), radial-gradient(ellipse at 50% 80%, #00FFFF 0%, transparent 30%)' }} />
        {/* sparkle Y2K halus */}
        <div className="absolute top-8 right-12 text-[#FF69B4] opacity-30 text-xl">✦</div><div className="absolute bottom-12 left-8 text-[#00FFFF] opacity-20 text-lg">✧</div>
        <div className="relative max-w-6xl mx-auto px-6 py-14 lg:py-18">
          <div className="flex flex-wrap gap-2 mb-4 text-xs font-label">
            <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full backdrop-blur">📍 Mojokerto Kota & Sekitar</span>
            <span className="bg-[#10B981]/20 border border-[#10B981]/30 text-[#6EE7B7] px-3 py-1 rounded-full">● 8 Unit Ready</span>
            <span className="px-3 py-1 rounded-full text-white text-xs font-bold" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>✦ 2000an Vibe ✦</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl leading-tight">RENTAL <span className="text-[#A78BFA]">PS4 & PS3</span><br />MOJOKERTO</h1>
          <p className="mt-4 text-lg text-[#94A3B8] max-w-2xl">Rental Sedulur — {ps4Count} unit PS4 + {ps3Count} unit PS3. Stik 2, game update, antar sampai rumah. Paket malam <span className="text-[#FF69B4] font-bold" style={{textShadow: '0 0 8px rgba(255,105,180,0.5)'}}>hemat 40%</span> — era 2000an, untuk semua kalangan.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#katalog" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3.5 rounded-xl font-semibold transition cursor-pointer shadow-[0_0_20px_rgba(124,58,237,0.4)] border border-white/10">Cek Ketersediaan ↓</a>
            <a href="https://wa.me/6281289538855?text=Halo%20kak%20mau%20tanya%20rental%20PS&utm_source=homepage&utm_medium=wa&utm_campaign=rental_sedulur" target="_blank" className="bg-[#25D366] hover:bg-[#1DA851] text-white px-8 py-3.5 rounded-xl font-semibold transition cursor-pointer flex items-center gap-2 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">WA Admin 0812-8953-8855</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-[#94A3B8] font-label">
            <span>✓ Antar Gratis Kota</span><span>✓ Booking Anti Bentrok</span><span>✓ Bayar di Tempat</span><span className="text-[#00FFFF]">✦ Y2K Glossy untuk semua ✦</span>
          </div>
        </div>
      </section>

      {/* KATALOG — icon Y2K hybrid */}
      <section id="katalog" className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-2xl">PILIH UNIT <span className="text-[#7C3AED]">{units.length} TERSEDIA</span></h2>
          <div className="flex flex-wrap gap-2 font-label text-sm">
            <span className="px-4 py-2 bg-[#7C3AED] text-white rounded-full shadow-[0_2px_8px_rgba(124,58,237,0.3)]">Semua ({units.length})</span>
            <span className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-full">PS4 ({ps4Count})</span>
            <span className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-full">PS3 ({ps3Count})</span>
            <span className="px-4 py-2 rounded-full text-white font-bold border" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', borderColor: '#C0C0C0'}}>✦ Paket Malam</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {units.map((u: any) => {
            const isPS4 = u.tipe === 'PS4'
            const harian = Number(u.harga_harian).toLocaleString('id-ID')
            const malam = Number(u.harga_malam).toLocaleString('id-ID')
            const mingguan = Number(u.harga_mingguan).toLocaleString('id-ID')
            return (
              <div key={u.id} className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden group">
                <div className="relative h-44 flex items-center justify-center overflow-hidden" style={{
                  background: isPS4 ? 'linear-gradient(135deg, #1E1C35 0%, #4C1D95 50%, #FF69B4 100%)' : 'linear-gradient(135deg, #0F172A 0%, #334155 50%, #00FFFF 100%)'
                }}>
                  {/* glossy overlay Y2K */}
                  <div className="absolute inset-0 opacity-20" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 60%)'}} />
                  <Y2KController ps4={isPS4} />
                  <span className="absolute top-3 left-3 text-white text-xs font-label font-semibold px-2.5 py-1 rounded-full shadow" style={{
                    background: isPS4 ? 'linear-gradient(135deg, #7C3AED, #A78BFA)' : 'linear-gradient(135deg, #334155, #00FFFF)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)'
                  }}>{u.tipe}</span>
                  {isBooked(u.id) ? <span className="absolute top-3 right-3 text-white text-xs font-label px-2.5 py-1 rounded-full shadow" style={{background: 'linear-gradient(135deg, #F59E0B, #FF69B4)', border: '1px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'}}>● Dibooking {getBooking(u.id)?.tgl_mulai.slice(5).replace('-','/')}</span> : <span className="absolute top-3 right-3 bg-[#10B981] text-white text-xs font-label px-2.5 py-1 rounded-full shadow" style={{boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)'}}>● Tersedia</span>}
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-lg">{u.id}</h3>
                  <p className="text-xs text-[#64748B]">{isPS4 ? 'Game update • HDMI • Online ready' : 'Game klasik • Stik 2 • Antar'}</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <PriceCard label="HARIAN" value={harian} />
                    <PriceCard label="MALAM" value={malam} highlight />
                    <PriceCard label="MINGGU" value={mingguan} />
                  </div>
                  <div className="mt-1 text-[10px] text-center font-label" style={{color: '#FF1493'}}>✦ Hemat 42% paket malam ✦</div>
                  <a href={`/sewa?unit=${u.id}`} className="mt-3 block w-full text-white text-center py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer shadow" style={{background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)', border: '1px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 8px rgba(124,58,237,0.3)'}}>Booking {u.id}</a>
                  <a href={`https://wa.me/6281289538855?text=${encodeURIComponent(`Halo min, mau sewa ${u.id} ${u.tipe} — cek tanggal tersedia ya`)}`} target="_blank" className="mt-2 block w-full text-white text-center py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer" style={{background: 'linear-gradient(180deg, #25D366 0%, #1DA851 100%)', border: '1px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'}}>Chat WA</a>
                </div>
              </div>
            )
          })}
        </div>

        {/* TESTIMONI — gaya chat WA */}
        <div className="mt-10">
          <h2 className="font-display text-2xl text-center">KATA MEREKA <span className="text-[#25D366]">✦ PUAS</span></h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: 'Rizky • Sooko', t: 'PS4-nya mulus, stik enak, diantar sampai kos. Paket malam 75k worth it banget 👍' },
              { n: 'Dimas • Mojokerto Kota', t: 'Booking lewat web gampang, admin fast respon via WA. Anak-anak betah main semalaman 🎮' },
              { n: 'Fajar • Puri', t: 'Udah 3x sewa buat acara. Unit bersih, game update, harga jelas di awal. Recommended ✦' },
            ].map((x, i) => (
              <div key={i} className="bg-[#DCF8C6] rounded-2xl rounded-tl-md p-4 shadow-sm" style={{ border: '1px solid #C0C0C0' }}>
                <p className="text-sm text-[#0F172A]">{x.t}</p>
                <p className="text-xs text-[#64748B] mt-2 text-right">{x.n} ✓✓</p>
              </div>
            ))}
          </div>
        </div>

        {/* PAKET MALAM BANNER — Y2K bubblegum */}
        <div className="mt-10 rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-4 border-2" style={{
          background: 'linear-gradient(135deg, #FFE4E6 0%, #E0F7FF 50%, #F5F3FF 100%)',
          borderColor: 'rgba(255,105,180,0.3)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 4px 16px rgba(255,105,180,0.15)'
        }}>
          <div>
            <div className="inline-flex items-center gap-2 text-white text-xs font-label font-bold px-3 py-1 rounded-full shadow" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>✦ PALING HEMAT — PAKET MALAM ✦</div>
            <h3 className="font-display text-xl mt-2">MAIN SEMALAMAN, BAYAR SETENGAH HARGA</h3>
            <p className="text-sm text-[#64748B] mt-1">Jam 19:00 - 07:00 • PS4 cuma <b style={{color: '#FF1493'}}>75k</b> (dari 130k) • PS3 cuma <b style={{color: '#FF1493'}}>50k</b> (dari 100k) • Hemat 42-50%</p>
          </div>
          <a href="https://wa.me/6281289538855?text=Halo%20mau%20paket%20malam&utm_source=paket_malam&utm_medium=wa" target="_blank" className="text-white px-8 py-3 rounded-xl font-bold whitespace-nowrap transition cursor-pointer shadow" style={{background: 'linear-gradient(135deg, #FF69B4, #F43F5E)', border: '1px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'}}>Ambil Paket Malam →</a>
        </div>

        <p className="mt-10 text-xs text-[#94A3B8] text-center">Y2K Hybrid — glossy aqua + bubblegum chrome untuk semua kalangan • Design System: <code className="bg-[#F1F5F9] px-2 py-1 rounded">design-system/rental-sedulur/MASTER.md</code></p>
      </section>

      {/* WA FLOAT BUTTON */}
      <a href="https://wa.me/6281289538855?text=Halo%20kak%20mau%20tanya%20rental%20PS&utm_source=homepage&utm_medium=wa_float" target="_blank" aria-label="Chat WA Owner"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
        style={{ background: 'linear-gradient(180deg, #2ED47A 0%, #1DA851 100%)', border: '2px solid #fff', boxShadow: '0 4px 16px rgba(37,211,102,0.4)' }}>✆</a>
    </main>
  )
}
