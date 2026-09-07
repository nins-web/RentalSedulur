import { supabase } from '@/lib/supabase'
export const revalidate = 0

const FALLBACK_UNITS = [
  { id: 'SD-PS4-01', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-02', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-03', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-04', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-05', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS3-01', tipe: 'PS3', harga_harian: 100000, harga_malam: 50000, harga_mingguan: 350000 },
  { id: 'SD-PS3-02', tipe: 'PS3', harga_harian: 100000, harga_malam: 50000, harga_mingguan: 350000 },
  { id: 'SD-PS3-03', tipe: 'PS3', harga_harian: 100000, harga_malam: 50000, harga_mingguan: 350000 },
]

function PriceCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`${highlight ? 'bg-[#FFF1F2] border-[#F43F5E]/20' : 'bg-[#F8FAFC] border-[#E2E8F0]'} rounded-lg p-2 border text-center relative`}>
      {highlight && <span className="absolute -top-2 -right-2 bg-[#F43F5E] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">-42%</span>}
      <div className="text-[10px] text-[#64748B] font-label">{label}</div>
      <div className={`font-bold text-sm ${highlight ? 'text-[#F43F5E]' : 'text-[#0F172A]'}`}>{value}</div>
    </div>
  )
}

export default async function Page() {
  let units: any[] | null = null
  try {
    const { data } = await supabase.from('units').select('*').order('id')
    units = data && data.length > 0 ? data : FALLBACK_UNITS
  } catch { units = FALLBACK_UNITS }
  if (!units) units = FALLBACK_UNITS

  const ps4Count = units.filter(u => u.tipe === 'PS4').length
  const ps3Count = units.filter(u => u.tipe === 'PS3').length

  return (
    <main>
      {/* HERO DARK */}
      <section className="bg-[#0F0F23] text-[#E2E8F0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 30% 50%, #7C3AED 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, #F43F5E 0%, transparent 40%)' }} />
        <div className="relative max-w-6xl mx-auto px-6 py-14 lg:py-18">
          <div className="flex flex-wrap gap-2 mb-4 text-xs font-label">
            <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full">📍 Mojokerto Kota & Sekitar</span>
            <span className="bg-[#10B981]/20 border border-[#10B981]/30 text-[#6EE7B7] px-3 py-1 rounded-full">● 8 Unit Ready</span>
            <span className="bg-[#25D366]/20 border border-[#25D366]/30 text-[#86EFAC] px-3 py-1 rounded-full">⭐ 4.9/5 (200+ sewa)</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl leading-tight">RENTAL <span className="text-[#A78BFA]">PS4 & PS3</span><br />MOJOKERTO</h1>
          <p className="mt-4 text-lg text-[#94A3B8] max-w-2xl">Rental Sedulur — {ps4Count} unit PS4 + {ps3Count} unit PS3. Stik 2, game update, antar sampai rumah. Paket malam <span className="text-[#F43F5E] font-bold">hemat 40%</span>.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#katalog" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3.5 rounded-xl font-semibold transition cursor-pointer shadow-[0_0_20px_rgba(124,58,237,0.4)]">Lihat Unit Tersedia ↓</a>
            <a href="https://wa.me/6281289538855?text=Halo%20kak%20mau%20tanya%20rental%20PS" target="_blank" className="bg-[#25D366] hover:bg-[#1DA851] text-white px-8 py-3.5 rounded-xl font-semibold transition cursor-pointer flex items-center gap-2">WA Admin 0812-8953-8855</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-[#94A3B8] font-label">
            <span>✓ Antar Gratis Kota</span><span>✓ Booking Anti Bentrok</span><span>✓ Bayar di Tempat</span>
          </div>
        </div>
      </section>

      {/* KATALOG */}
      <section id="katalog" className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-2xl">PILIH UNIT <span className="text-[#7C3AED]">{units.length} TERSEDIA</span></h2>
          <div className="flex flex-wrap gap-2 font-label text-sm">
            <span className="px-4 py-2 bg-[#7C3AED] text-white rounded-full">Semua ({units.length})</span>
            <span className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-full">PS4 ({ps4Count})</span>
            <span className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-full">PS3 ({ps3Count})</span>
            <span className="px-4 py-2 bg-[#FFF1F2] border border-[#F43F5E]/20 text-[#F43F5E] rounded-full">🔥 Paket Malam</span>
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
                <div className={`relative h-44 flex items-center justify-center ${isPS4 ? 'bg-gradient-to-br from-[#1E1C35] to-[#4C1D95]' : 'bg-gradient-to-br from-[#334155] to-[#0F172A]'}`}>
                  <span className="text-6xl">{isPS4 ? '🎮' : '🕹️'}</span>
                  <span className={`absolute top-3 left-3 text-white text-xs font-label font-semibold px-2.5 py-1 rounded-full ${isPS4 ? 'bg-[#7C3AED]' : 'bg-[#334155]'}`}>{u.tipe}</span>
                  <span className="absolute top-3 right-3 bg-[#10B981] text-white text-xs font-label px-2.5 py-1 rounded-full">● Tersedia</span>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-lg">{u.id}</h3>
                  <p className="text-xs text-[#64748B]">{isPS4 ? 'Game update • HDMI • Online ready' : 'Game klasik • Stik 2 • Antar'}</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <PriceCard label="HARIAN" value={harian} />
                    <PriceCard label="MALAM" value={malam} highlight />
                    <PriceCard label="MINGGU" value={mingguan} />
                  </div>
                  <div className="mt-1 text-[10px] text-center text-[#F43F5E] font-label">Hemat 42% paket malam</div>
                  <a href={`/booking?unit=${u.id}`} className="mt-3 block w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-center py-2.5 rounded-xl font-semibold text-sm transition">Booking {u.id}</a>
                  <a href={`https://wa.me/6281289538855?text=${encodeURIComponent(`Halo min, mau sewa ${u.id} ${u.tipe} — cek tanggal tersedia ya`)}`} target="_blank" className="mt-2 block w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-center py-2.5 rounded-xl font-semibold text-sm transition">Chat WA</a>
                </div>
              </div>
            )
          })}
        </div>

        {/* PAKET MALAM BANNER */}
        <div className="mt-10 bg-[#FFF1F2] border-2 border-[#F43F5E]/20 rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F43F5E] text-white text-xs font-label font-bold px-3 py-1 rounded-full">🔥 PALING HEMAT — PAKET MALAM</div>
            <h3 className="font-display text-xl mt-2">MAIN SEMALAMAN, BAYAR SETENGAH HARGA</h3>
            <p className="text-sm text-[#64748B] mt-1">Jam 19:00 - 07:00 • PS4 cuma <b className="text-[#F43F5E]">75k</b> (dari 130k) • PS3 cuma <b className="text-[#F43F5E]">50k</b> (dari 100k) • Hemat 42-50%</p>
          </div>
          <a href="https://wa.me/6281289538855?text=Halo%20mau%20paket%20malam" target="_blank" className="bg-[#F43F5E] hover:bg-[#E11D48] text-white px-8 py-3 rounded-xl font-bold whitespace-nowrap transition cursor-pointer">Ambil Paket Malam →</a>
        </div>

        <p className="mt-10 text-xs text-[#94A3B8] text-center">Anti double-booking aktif per unit_id + overlap tanggal • Design System: <code className="bg-[#F1F5F9] px-2 py-1 rounded">design-system/rental-sedulur/MASTER.md</code> • Deploy Vercel iad1</p>
      </section>
    </main>
  )
}
