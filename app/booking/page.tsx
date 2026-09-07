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
  const inputCls = "w-full p-3 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] text-[16px] transition"
  const labelCls = "block text-sm font-semibold text-[#0F172A] mb-1.5 font-label"
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#7C3AED] transition cursor-pointer">← Kembali katalog</a>
        <div className="mt-4">
          <h1 className="font-display text-3xl text-[#0F172A]">Booking Rental</h1>
          <p className="mt-2 text-sm text-[#64748B]">PS4: <span className="font-semibold text-[#0F172A]">130k</span>/hari <span className="text-[#F43F5E] font-semibold">75k</span>/malam 500k/minggu • PS3: 100k/hari 50k/malam 350k/minggu</p>
        </div>

        {paket==='malam' && (
          <div className="mt-4 bg-[#FFF1F2] border border-[#F43F5E]/20 rounded-[12px] px-4 py-3 flex items-center gap-3">
            <span className="bg-[#F43F5E] text-white text-xs font-bold px-2 py-1 rounded-full">HEMAT 40%</span>
            <span className="text-sm text-[#881337]">Paket malam 19:00–07:00 — main semalaman bayar setengah harga!</span>
          </div>
        )}

        <form onSubmit={submit} className="mt-6 bg-white border border-[#E2E8F0] shadow-sm rounded-[12px] p-6 space-y-5">
          <div>
            <label className={labelCls}>Pilih Unit</label>
            <select value={unitId} onChange={e=>setUnitId(e.target.value)} className={inputCls + " cursor-pointer"}>
              <option value="">Pilih Unit</option>
              {units.map(u=><option key={u.id} value={u.id}>{u.id} - {u.tipe} ({u.harga_harian.toLocaleString('id-ID')}/hari)</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Paket</label>
            <select value={paket} onChange={e=>setPaket(e.target.value as any)} className={inputCls + " cursor-pointer"}>
              <option value="harian">Harian (24 jam)</option>
              <option value="malam">Malam (19:00–07:00) — Hemat 40%</option>
              <option value="mingguan">Mingguan (7 hari)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tanggal Mulai</label>
              <input type="date" value={tglMulai} onChange={e=>setTglMulai(e.target.value)} className={inputCls + " cursor-pointer"} />
            </div>
            <div>
              <label className={labelCls}>Tanggal Selesai</label>
              <input type="date" value={tglSelesai} onChange={e=>setTglSelesai(e.target.value)} className={inputCls + " cursor-pointer"} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Nama Lengkap</label>
            <input placeholder="Budi Santoso" value={nama} onChange={e=>setNama(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>No WA</label>
            <input placeholder="0812xxxx (08...)" value={wa} onChange={e=>setWa(e.target.value)} className={inputCls} />
            <p className="text-xs text-[#64748B] mt-1">Contoh: 081289538855 — akan dipakai untuk konfirmasi WA</p>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between">
            <span className="text-sm text-[#64748B] font-label">Total Estimasi</span>
            <span className="font-heading font-bold text-xl text-[#0F172A]">Rp {total.toLocaleString('id-ID')}</span>
          </div>

          <button disabled={loading} className="w-full bg-[#25D366] hover:bg-[#1DA851] disabled:opacity-60 text-white py-3.5 rounded-[12px] font-semibold cursor-pointer transition shadow-sm flex items-center justify-center gap-2">
            {loading ? 'Menyimpan...' : 'Simpan & Chat WA 6281289538855'}
          </button>
          {msg && <p className={`text-sm px-3 py-2 rounded-lg ${msg.includes('tersimpan') ? 'bg-[#ECFDF5] text-[#065F46] border border-[#10B981]/20' : 'bg-[#FEF2F2] text-[#991B1B] border border-[#EF4444]/20'}`}>{msg}</p>}
        </form>
        <p className="mt-4 text-center text-xs text-[#64748B]">Pembayaran: DP 50k transfer / bayar full di tempat • Antar gratis Mojokerto kota</p>
      </div>
    </main>
  )
}
export default function Booking(){ return <Suspense fallback={<div className="p-6 bg-[#F8FAFC] min-h-screen"><div className="max-w-2xl mx-auto bg-white rounded-[12px] p-6 animate-pulse h-96"/></div>}><BookingForm/></Suspense> }
