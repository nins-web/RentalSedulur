'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { TIERS, PAKET_LABEL, hitungTotal, type Paket } from '@/lib/prices'
type Unit = { id:string, tipe:string, harga_harian:number, harga_malam:number, harga_mingguan:number }

const FOTO: Record<string,string> = { PS3: '/unit-ps3.jpg', PS4: '/unit-ps4.jpg' }
const FASILITAS = ['2 stik controller', 'Monitor HD 25"', 'Kabel charger stik & power', 'Game update', 'Antar gratis kota']

function BookingForm(){
  const sp = useSearchParams()
  const [units,setUnits]=useState<Unit[]>([])
  const [unitId,setUnitId]=useState('')
  const [paket,setPaket]=useState<Paket>('harian')
  const [tglMulai,setTglMulai]=useState('')
  const [tglSelesai,setTglSelesai]=useState('')
  const [nama,setNama]=useState('')
  const [wa,setWa]=useState('')
  const [metode,setMetode]=useState<'cash'|'transfer'>('cash')
  const [booked,setBooked]=useState<string[]>([])
  const [total,setTotal]=useState(0)
  const [msg,setMsg]=useState('')
  const [loading,setLoading]=useState(false)
  useEffect(()=>{ supabase.from('units').select('*').order('id').then(({data}: any)=>{ if(data){ setUnits(data); const q=sp.get('unit'); if(q) setUnitId(q)} }) },[sp])
  useEffect(()=>{
    if(!tglMulai || !tglSelesai){ setBooked([]); return }
    supabase.from('bookings').select('unit_id').lte('tgl_mulai',tglSelesai).gte('tgl_selesai',tglMulai).then(({data}: any)=>{
      if(data) setBooked([...new Set((data as any[]).map((b:any)=>b.unit_id as string))])
    })
  },[tglMulai,tglSelesai])
  const unit = units.find(x=>x.id===unitId)
  const tarif = !unit ? 0 : (TIERS[unit.tipe] ?? TIERS.PS4)[paket]
  const bentrok = unitId !== '' && booked.includes(unitId)
  useEffect(()=>{
    if(!unit || !tglMulai || !tglSelesai) { setTotal(0); return }
    const d1 = new Date(tglMulai), d2 = new Date(tglSelesai)
    const days = Math.max(1, Math.ceil((d2.getTime()-d1.getTime())/86400000))
    setTotal(hitungTotal(unit.tipe, paket, days))
  },[unitId,paket,tglMulai,tglSelesai,units])
  async function submit(e:React.FormEvent){
    e.preventDefault()
    if(!unitId||!nama||!wa||!tglMulai||!tglSelesai) return setMsg('Lengkapi semua field')
    if(bentrok) return setMsg('Unit sudah dibooking di tanggal itu, pilih unit lain / tanggal lain')
    setLoading(true); setMsg('')
    const {data: cek} = await supabase.from('bookings').select('id').eq('unit_id',unitId).lte('tgl_mulai',tglSelesai).gte('tgl_selesai',tglMulai).limit(1)
    if(cek && cek.length>0) { setLoading(false); return setMsg('Unit sudah dibooking di tanggal itu, pilih unit lain / tanggal lain') }
    const bayar = metode==='cash' ? 'Cash (bayar saat unit diantar)' : 'Transfer (kirim bukti ke WA)'
    const {error} = await supabase.from('bookings').insert({unit_id:unitId,nama,wa,paket,tgl_mulai:tglMulai,tgl_selesai:tglSelesai,total,metode_bayar:metode})
    setLoading(false)
    if(error) return setMsg('Gagal: '+error.message)
    const teks = `Halo min Rental Sedulur, mau sewa ${unitId} paket ${paket} ${tglMulai} s/d ${tglSelesai} a/n ${nama} Total Rp ${total.toLocaleString('id-ID')} via ${bayar}`
    window.open(`https://wa.me/6281289538855?text=${encodeURIComponent(teks)}`,'_blank')
    setMsg('Booking tersimpan! Membuka WA...')
  }
  const inputCls = "w-full p-3 rounded-xl bg-white border text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/30 focus:border-[#7C3AED] text-[16px] transition"
  const labelCls = "block text-sm font-semibold text-[#0F172A] mb-1.5 font-label flex items-center gap-1.5"
  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      <div className="h-2 w-full" style={{background: 'linear-gradient(90deg, #FF69B4, #00FFFF, #7C3AED, #FF69B4)'}} />
      <div className="max-w-2xl mx-auto px-6 py-8">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#7C3AED] transition cursor-pointer">← Kembali katalog</a>
        <div className="mt-4">
          <h1 className="font-display text-3xl text-[#0F172A]">Booking Rental</h1>
          <p className="mt-2 text-sm text-[#64748B]">PS4: <span className="font-semibold text-[#0F172A]">80k</span>/12jam 130k/hari 200k/2hari 380k/3hari 75k/malam 500k/minggu • PS3: 50k/12jam 100k/hari 150k/2hari 200k/3hari 50k/malam 400k/minggu</p>
        </div>

        {paket==='malam' && (
          <div className="mt-4 rounded-[12px] px-4 py-3 flex items-center gap-3 border-2 shadow-sm" style={{background: 'linear-gradient(135deg, #FFE4E6 0%, #E0F7FF 100%)', borderColor: 'rgba(255,105,180,0.3)'}}>
            <span className="text-white text-xs font-bold px-2.5 py-1 rounded-full shadow" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)'}}>✦ HEMAT 40%</span>
            <span className="text-sm text-[#881337] font-semibold">Paket malam 19:00–07:00 — main semalaman bayar setengah harga!</span>
          </div>
        )}

        <form onSubmit={submit} className="mt-6 bg-white rounded-[16px] p-6 space-y-5" style={{border: '2px solid #C0C0C0', boxShadow: '0 8px 24px rgba(124,58,237,0.12)'}}>
          <div>
            <label className={labelCls}><span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{background: 'linear-gradient(135deg, #00FFFF, #7C3AED)'}}>1</span> Pilih Unit</label>
            <select value={unitId} onChange={e=>setUnitId(e.target.value)} className={inputCls + " cursor-pointer"} style={{borderColor: '#C0C0C0'}}>
              <option value="">Pilih Unit — {units.length} tersedia</option>
              {units.map(u=>{ const b = booked.includes(u.id); return <option key={u.id} value={u.id} disabled={b}>{u.id} - {u.tipe} ({u.harga_harian.toLocaleString('id-ID')}/hari){b ? ' — Sudah dibooking tgl itu' : ''}</option> })}
            </select>
          </div>

          {unit && (
            <div className="rounded-xl border-2 overflow-hidden" style={{borderColor: bentrok ? '#EF4444' : '#10B981'}}>
              <img src={FOTO[unit.tipe] ?? FOTO.PS4} alt={`Unit ${unit.tipe}`} className="w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[#0F172A]">{unit.id} — {unit.tipe}</p>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${bentrok ? 'bg-[#EF4444]' : 'bg-[#10B981]'}`}>{bentrok ? 'Bentrok tgl itu' : 'Ready'}</span>
                </div>
                <p className="text-sm text-[#64748B] mt-1">Paket {paket}: <span className="font-bold text-[#7C3AED]">Rp {tarif.toLocaleString('id-ID')}</span></p>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {FASILITAS.map(f=><li key={f} className="text-xs text-[#64748B]">✓ {f}</li>)}
                </ul>
              </div>
            </div>
          )}

          <div>
            <label className={labelCls}><span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)'}}>2</span> Paket</label>
            <select value={paket} onChange={e=>setPaket(e.target.value as Paket)} className={inputCls + " cursor-pointer"} style={{borderColor: '#C0C0C0'}}>
              {(Object.keys(PAKET_LABEL) as Paket[]).map(p=><option key={p} value={p}>{PAKET_LABEL[p]}{p==='malam' ? ' — Hemat 40%' : ''}</option>)}
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
          </div>

          <div>
            <label className={labelCls}>Pembayaran</label>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={()=>setMetode('cash')} className={`p-3 rounded-xl border-2 text-left cursor-pointer ${metode==='cash' ? 'border-[#10B981] bg-[#ECFDF5]' : 'border-[#C0C0C0] bg-white'}`}>
                <p className="font-bold text-sm text-[#0F172A]">💵 Cash</p>
                <p className="text-xs text-[#64748B]">Bayar saat unit diantar</p>
              </button>
              <button type="button" onClick={()=>setMetode('transfer')} className={`p-3 rounded-xl border-2 text-left cursor-pointer ${metode==='transfer' ? 'border-[#7C3AED] bg-[#F5F3FF]' : 'border-[#C0C0C0] bg-white'}`}>
                <p className="font-bold text-sm text-[#0F172A]">🏦 Transfer</p>
                <p className="text-xs text-[#64748B]">QRIS + kirim bukti ke WA</p>
              </button>
            </div>
          </div>

          <div className="rounded-xl p-4 flex items-center justify-between border-2" style={{background: 'linear-gradient(135deg, #FFE4E6 0%, #E0F7FF 50%, #F5F3FF 100%)', borderColor: 'rgba(192,192,192,0.6)'}}>
            <span className="text-sm text-[#64748B] font-label">Total Estimasi{metode==='cash' ? ' (Cash)' : ' (Transfer)'}</span>
            <span className="font-heading font-bold text-2xl" style={{color: '#7C3AED'}}>Rp {total.toLocaleString('id-ID')}</span>
          </div>

          <button disabled={loading} className="w-full disabled:opacity-60 text-white py-3.5 rounded-[12px] font-semibold cursor-pointer transition" style={{background: 'linear-gradient(180deg, #2ED47A 0%, #25D366 50%, #1DA851 100%)', border: '2px solid #C0C0C0'}}>
            {loading ? 'Menyimpan...' : 'Simpan & Chat WA 6281289538855'}
          </button>
          {msg && <p className={`text-sm px-3 py-2 rounded-xl border-2 ${msg.includes('tersimpan') ? 'bg-[#ECFDF5] text-[#065F46] border-[#10B981]/30' : 'bg-[#FEF2F2] text-[#991B1B] border-[#EF4444]/30'}`}>{msg}</p>}
        </form>

        {metode==='transfer' && (
          <div className="mt-4 rounded-[16px] border-2 bg-white p-4 text-center" style={{borderColor: '#C0C0C0'}}>
            <p className="font-heading font-bold text-sm" style={{color: '#7C3AED'}}>Scan QRIS Sedulur PS untuk DP / Pelunasan</p>
            <p className="text-xs text-[#64748B] mt-1">NMID: ID1025367445265 • A01</p>
            <img src="/qris-sedulur-ps.jpg" alt="QRIS Sedulur PS" className="mx-auto mt-3 w-56 rounded-xl border" style={{borderColor: '#C0C0C0'}} />
            <p className="text-xs text-[#64748B] mt-2">Abis scan, kirim bukti ke WA 6281289538855 ya Kak 🙏</p>
          </div>
        )}
        {metode==='cash' && (
          <p className="mt-4 text-center text-xs text-[#64748B]">💵 Siapkan uang pas saat unit diantar • Antar gratis Mojokerto kota</p>
        )}
      </div>
    </main>
  )
}
export default function Booking(){ return <Suspense fallback={<div className="p-6 bg-[#F8FAFC] min-h-screen"><div className="max-w-2xl mx-auto bg-white rounded-[16px] p-6 animate-pulse h-96" style={{border: '2px solid #C0C0C0'}}/></div>}><BookingForm/></Suspense> }
