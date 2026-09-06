tsx
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Unit = { id:string, tipe:string, harga_harian:number, harga_malam:number, harga_mingguan:number }

export default function Booking(){
  const [units,setUnits]=useState<Unit[]>([])
  const [unitId,setUnitId]=useState('')
  const [paket,setPaket]=useState<'harian'|'malam'|'mingguan'>('harian')
  const [tglMulai,setTglMulai]=useState('')
  const [tglSelesai,setTglSelesai]=useState('')
  const [nama,setNama]=useState('')
  const [wa,setWa]=useState('')
  const [total,setTotal]=useState(0)
  const [msg,setMsg]=useState('')

  useEffect(()=>{ supabase.from('units').select('*').order('id').then(({data})=>data&&setUnits(data)) },[])
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
    // cek bentrok
    const {data: bentrok} = await supabase.from('bookings').select('id').eq('unit_id',unitId).lte('tgl_mulai',tglSelesai).gte('tgl_selesai',tglMulai).limit(1)
    if(bentrok && bentrok.length>0) return setMsg('Unit sudah dibooking di tanggal itu, pilih unit lain / tanggal lain')
    const {error} = await supabase.from('bookings').insert({unit_id:unitId,nama,wa,paket,tgl_mulai:tglMulai,tgl_selesai:tglSelesai,total})
    if(error) return setMsg('Gagal: '+error.message)
    const teks = Halo min Rental Sedulur, mau sewa ${unitId} paket ${paket} ${tglMulai} s/d ${tglSelesai} a/n ${nama} Total Rp ${total.toLocaleString('id-ID')}
    window.open(https://wa.me/6281289538855?text=${encodeURIComponent(teks)},'_blank')
    setMsg('Booking tersimpan! Membuka WA...')
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Booking Rental</h1>
      <p className="opacity-70 text-sm">PS4: 130k/hari 75k/malam 500k/minggu • PS3: 100k/hari 50k/malam 350k/minggu</p>
      <form onSubmit={submit} className="mt-6 space-y-4 bg-zinc-900 p-6 rounded-xl">
        <select value={unitId} onChange={e=>setUnitId(e.target.value)} className="w-full p-3 rounded bg-zinc-800">
          <option value="">Pilih Unit</option>
          {units.map(u=><option key={u.id} value={u.id}>{u.id} - {u.tipe} ({u.harga_harian.toLocaleString('id-ID')}/hari)</option>)}
        </select>
        <select value={paket} onChange={e=>setPaket(e.target.value as any)} className="w-full p-3 rounded bg-zinc-800">
          <option value="harian">Harian</option>
          <option value="malam">Malam (20:00-08:00)</option>
          <option value="mingguan">Mingguan</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <input type="date" value={tglMulai} onChange={e=>setTglMulai(e.target.value)} className="p-3 rounded bg-zinc-800" />
          <input type="date" value={tglSelesai} onChange={e=>setTglSelesai(e.target.value)} className="p-3 rounded bg-zinc-800" />
        </div>
        <input placeholder="Nama" value={nama} onChange={e=>setNama(e.target.value)} className="w-full p-3 rounded bg-zinc-800" />
        <input placeholder="No WA (08...)" value={wa} onChange={e=>setWa(e.target.value)} className="w-full p-3 rounded bg-zinc-800" />
        <div className="text-xl font-bold">Total: Rp {total.toLocaleString('id-ID')}</div>
        <button className="w-full bg-green-600 py-3 rounded-xl font-bold">Simpan & Chat WA 6281289538855</button>
        {msg && <p className="text-sm text-yellow-400">{msg}</p>}
      </form>
      <a href="/" className="mt-4 inline-block opacity-70">← Kembali katalog</a>
    </main>
  )
}
