'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
type Unit = { id:string, tipe:string, harga_harian:number, harga_malam:number, harga_mingguan:number }

function BookingForm(){
  const sp = useSearchParams()
  const [units,setUnits]=useState<Unit[]>([])
  const [unitId,setUnitId]=useState('')
  const [paket,setPaket]=useState<'harian'|'malam'|'mingguan'>('harian')
  const [tglMulai,setTglMulai]=useState('')
  const [tglSelesai,setTglSelesai]=useState('')
  const [nama,setNama]=useState('')
  const [wa,setWa]=useState('')
  const [total,setTotal]=useState(0)
  const [msg,setMsg]=useState('')
  const [loading,setLoading]=useState(false)
  useEffect(()=>{ supabase.from('units').select('*').order('id').then(({data}: any)=>{ if(data){ setUnits(data); const q=sp.get('unit'); if(q) setUnitId(q)} }) },[sp])
  useEffect(()=>{
    const u = units.find(x=>x.id===unitId)
    if(!u || !tglMulai || !tglSelesai) { setTotal(0); return }
    const d1 = new Date(tglMulai), d2 = new Date(tglSelesai)
    const days = Math.max(1, Math.ceil((d2.getTime()-d1.getTime())/86400000))
    if(paket==='harian') setTotal(days * u.harga_harian)
    else if(paket==='malam') setTotal(days * u.harga_malam)
    else setTotal(Math.ceil(days/7) * u.harga_mingguan)
  },[unitId,paket,tglMulai,tglSelesai,units])
  async function submit(e:React.FormEvent){
    e.preventDefault()
    if(!unitId||!nama||!wa||!tglMulai||!tglSelesai) return setMsg('Lengkapi semua field')
    setLoading(true); setMsg('')
    const {data: bentrok} = await supabase.from('bookings').select('id').eq('unit_id',unitId).lte('tgl_mulai',tglSelesai).gte('tgl_selesai',tglMulai).limit(1)
    if(bentrok && bentrok.length>0) { setLoading(false); return setMsg('Unit sudah dibooking di tanggal itu, pilih unit lain / tanggal lain') }
    const {error} = await supabase.from('bookings').insert({unit_id:unitId,nama,wa,paket,tgl_mulai:tglMulai,tgl_selesai:tglSelesai,total})
    setLoading(false)
    if(error) return setMsg('Gagal: '+error.message)
    const teks = `Halo min Rental Sedulur, mau sewa ${unitId} paket ${paket} ${tglMulai} s/d ${tglSelesai} a/n ${nama} Total Rp ${total.toLocaleString('id-ID')}`
    window.open(`https://wa.me/6281289538855?text=${encodeURIComponent(teks)}`,'_blank')
    setMsg('Booking tersimpan! Membuka WA...')
  }
  const inputCls = "w-full p-3 rounded-xl bg-white border text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/30 focus:border-[#7C3AED] text-[16px] transition"
  const labelCls = "block text-sm font-semibold text-[#0F172A] mb-1.5 font-label flex items-center gap-1.5"
  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      {/* Y2K glossy header — untuk semua kalangan */}
      <div className="h-2 w-full" style={{background: 'linear-gradient(90deg, #FF69B4, #00FFFF, #7C3AED, #FF69B4)'}} />
      <div className="absolute top-2 right-8 text-[#FF69B4]/20 text-2xl select-none">✦</div><div className="absolute top-10 left-6 text-[#00FFFF]/15 text-xl select-none">✧</div>
      <div className="max-w-2xl mx-auto px-6 py-8">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#7C3AED] transition cursor-pointer">← Kembali katalog</a>
        <div className="mt-4 relative">
          <div className="absolute -left-2 -top-1 w-12 h-12 rounded-full opacity-20 blur-xl" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)'}} />
          <h1 className="font-display text-3xl text-[#0F172A] flex items-center gap-3">Booking Rental <span className="text-sm px-2.5 py-1 rounded-full text-white font-bold shadow" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>✦ Y2K</span></h1>
          <p className="mt-2 text-sm text-[#64748B]">PS4: <span className="font-semibold text-[#0F172A]">130k</span>/hari <span className="px-1.5 py-0.5 rounded text-white text-xs font-bold" style={{background: 'linear-gradient(135deg, #FF69B4, #FF1493)', border: '1px solid #C0C0C0'}}>75k</span>/malam 500k/minggu • PS3: 100k/hari 50k/malam 350k/minggu — <span className="text-[#7C3AED] font-semibold">untuk semua kalangan</span></p>
        </div>

        {paket==='malam' && (
          <div className="mt-4 rounded-[12px] px-4 py-3 flex items-center gap-3 border-2 shadow-sm" style={{background: 'linear-gradient(135deg, #FFE4E6 0%, #E0F7FF 100%)', borderColor: 'rgba(255,105,180,0.3)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)'}}>
            <span className="text-white text-xs font-bold px-2.5 py-1 rounded-full shadow" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>✦ HEMAT 40%</span>
            <span className="text-sm text-[#881337] font-semibold">Paket malam 19:00–07:00 — main semalaman bayar setengah harga! ✧</span>
          </div>
        )}

        <form onSubmit={submit} className="mt-6 bg-white rounded-[16px] p-6 space-y-5 relative overflow-hidden" style={{border: '2px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 24px rgba(124,58,237,0.12)'}}>
          {/* glossy top highlight Y2K */}
          <div className="absolute top-0 left-0 right-0 h-10 rounded-t-[14px] pointer-events-none" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)'}} />
          <div>
            <label className={labelCls}><span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{background: 'linear-gradient(135deg, #00FFFF, #7C3AED)', border: '1px solid #C0C0C0'}}>1</span> Pilih Unit</label>
            <select value={unitId} onChange={e=>setUnitId(e.target.value)} className={inputCls + " cursor-pointer"} style={{borderColor: '#C0C0C0', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'}}>
              <option value="">Pilih Unit — 8 tersedia</option>
              {units.map(u=><option key={u.id} value={u.id}>{u.id} - {u.tipe} ({u.harga_harian.toLocaleString('id-ID')}/hari)</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}><span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>2</span> Paket</label>
            <select value={paket} onChange={e=>setPaket(e.target.value as any)} className={inputCls + " cursor-pointer"} style={{borderColor: '#C0C0C0'}}>
              <option value="harian">Harian (24 jam)</option>
              <option value="malam">Malam (19:00–07:00) — Hemat 40% ✦</option>
              <option value="mingguan">Mingguan (7 hari)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tanggal Mulai</label>
              <input type="date" value={tglMulai} onChange={e=>setTglMulai(e.target.value)} className={inputCls + " cursor-pointer"} style={{borderColor: '#C0C0C0'}} />
            </div>
            <div>
              <label className={labelCls}>Tanggal Selesai</label>
              <input type="date" value={tglSelesai} onChange={e=>setTglSelesai(e.target.value)} className={inputCls + " cursor-pointer"} style={{borderColor: '#C0C0C0'}} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Nama Lengkap</label>
            <input placeholder="Budi Santoso" value={nama} onChange={e=>setNama(e.target.value)} className={inputCls} style={{borderColor: '#C0C0C0'}} />
          </div>
          <div>
            <label className={labelCls}>No WA</label>
            <input placeholder="0812xxxx (08...)" value={wa} onChange={e=>setWa(e.target.value)} className={inputCls} style={{borderColor: '#C0C0C0'}} />
            <p className="text-xs text-[#64748B] mt-1">Contoh: 081289538855 — untuk semua kalangan, konfirmasi via WA</p>
          </div>

          <div className="rounded-xl p-4 flex items-center justify-between border-2" style={{background: 'linear-gradient(135deg, #FFE4E6 0%, #E0F7FF 50%, #F5F3FF 100%)', borderColor: 'rgba(192,192,192,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)'}}>
            <span className="text-sm text-[#64748B] font-label flex items-center gap-2"><span className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>✦</span> Total Estimasi</span>
            <span className="font-heading font-bold text-2xl" style={{color: '#7C3AED', textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>Rp {total.toLocaleString('id-ID')}</span>
          </div>

          <button disabled={loading} className="w-full disabled:opacity-60 text-white py-3.5 rounded-[12px] font-semibold cursor-pointer transition flex items-center justify-center gap-2" style={{background: 'linear-gradient(180deg, #2ED47A 0%, #25D366 50%, #1DA851 100%)', border: '2px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 12px rgba(37,211,102,0.3)'}}>
            {loading ? 'Menyimpan...' : '✦ Simpan & Chat WA 6281289538855 ✦'}
          </button>
          {msg && <p className={`text-sm px-3 py-2 rounded-xl border-2 ${msg.includes('tersimpan') ? 'bg-[#ECFDF5] text-[#065F46] border-[#10B981]/30' : 'bg-[#FEF2F2] text-[#991B1B] border-[#EF4444]/30'}`} style={{boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)'}}>{msg}</p>}
        </form>
        <p className="mt-4 text-center text-xs text-[#64748B]">✦ Pembayaran: DP 50k via QRIS / bayar full di tempat • Antar gratis Mojokerto kota • Y2K untuk semua kalangan ✦</p>
        <div className="mt-4 rounded-[16px] border-2 bg-white p-4 text-center" style={{borderColor: '#C0C0C0'}}>
          <p className="font-heading font-bold text-sm" style={{color: '#7C3AED'}}>Scan QRIS Sedulur PS untuk DP / Pelunasan</p>
          <p className="text-xs text-[#64748B] mt-1">NMID: ID1025367445265 • A01</p>
          <img src="/qris-sedulur-ps.jpg" alt="QRIS Sedulur PS" className="mx-auto mt-3 w-56 rounded-xl border" style={{borderColor: '#C0C0C0'}} />
          <p className="text-xs text-[#64748B] mt-2">Abis scan, kirim bukti ke WA 6281289538855 ya Kak 🙏</p>
        </div>
      </div>
    </main>
  )
}
export default function Booking(){ return <Suspense fallback={<div className="p-6 bg-[#F8FAFC] min-h-screen"><div className="max-w-2xl mx-auto bg-white rounded-[16px] p-6 animate-pulse h-96" style={{border: '2px solid #C0C0C0'}}/></div>}><BookingForm/></Suspense> }
