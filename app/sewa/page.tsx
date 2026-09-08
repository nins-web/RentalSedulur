'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Unit = { id: string, tipe: string, harga_harian: number, harga_malam: number, harga_mingguan: number }
type Booking = { unit_id: string, tgl_mulai: string, tgl_selesai: string }
type Paket = 'harian' | 'malam' | 'mingguan'

const WA_OWNER = '6281289538855'
const FALLBACK_UNITS: Unit[] = [
  { id: 'SD-PS4-01', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-02', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-03', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-04', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS4-05', tipe: 'PS4', harga_harian: 130000, harga_malam: 75000, harga_mingguan: 500000 },
  { id: 'SD-PS3-01', tipe: 'PS3', harga_harian: 100000, harga_malam: 50000, harga_mingguan: 350000 },
  { id: 'SD-PS3-02', tipe: 'PS3', harga_harian: 100000, harga_malam: 50000, harga_mingguan: 350000 },
  { id: 'SD-PS3-03', tipe: 'PS3', harga_harian: 100000, harga_malam: 50000, harga_mingguan: 350000 },
]

function overlap(a1: string, a2: string, b1: string, b2: string) {
  return a1 <= b2 && b1 <= a2
}

function normalizeWA(raw: string): string | null {
  const d = raw.replace(/\D/g, '')
  if (d.startsWith('08')) return '62' + d.slice(1)
  if (d.startsWith('628')) return d
  if (d.startsWith('62')) return d
  return null
}

function SewaWizard() {
  const sp = useSearchParams()
  const [step, setStep] = useState(1)
  const [units, setUnits] = useState<Unit[]>(FALLBACK_UNITS)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [unitId, setUnitId] = useState('')
  const [paket, setPaket] = useState<Paket>('harian')
  const [tglMulai, setTglMulai] = useState('')
  const [tglSelesai, setTglSelesai] = useState('')
  const [nama, setNama] = useState('')
  const [wa, setWa] = useState('')
  const [catatan, setCatatan] = useState('')
  const [total, setTotal] = useState(0)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const q = sp.get('unit')
    if (q) setUnitId(q)
    supabase.from('units').select('*').order('id').then(({ data }: any) => {
      if (data && data.length > 0) setUnits(data)
    })
    supabase.from('bookings').select('unit_id,tgl_mulai,tgl_selesai').in('status', ['pending', 'confirmed']).then(({ data }: any) => {
      if (data) setBookings(data)
    })
  }, [sp])

  useEffect(() => {
    const u = units.find(x => x.id === unitId)
    if (!u || !tglMulai || !tglSelesai || tglSelesai < tglMulai) { setTotal(0); return }
    const days = Math.max(1, Math.ceil((new Date(tglSelesai).getTime() - new Date(tglMulai).getTime()) / 86400000))
    if (paket === 'harian') setTotal(days * u.harga_harian)
    else if (paket === 'malam') setTotal(days * u.harga_malam)
    else setTotal(Math.ceil(days / 7) * u.harga_mingguan)
  }, [unitId, paket, tglMulai, tglSelesai, units])

  const isBooked = (id: string) => {
    if (!tglMulai || !tglSelesai) return bookings.some(b => b.unit_id === id)
    return bookings.some(b => b.unit_id === id && overlap(tglMulai, tglSelesai, b.tgl_mulai, b.tgl_selesai))
  }

  const canNext1 = unitId && tglMulai && tglSelesai && tglSelesai >= tglMulai && total > 0 && !isBooked(unitId)
  const canNext2 = nama.trim().length >= 3 && normalizeWA(wa) !== null

  async function submit() {
    setMsg('')
    const waNorm = normalizeWA(wa)
    if (!unitId || !nama.trim() || !waNorm || !tglMulai || !tglSelesai) {
      setMsg('Lengkapi dulu ya — unit, tanggal, nama, dan WA wajib diisi 😊')
      return
    }
    setLoading(true)
    const { data: bentrok } = await supabase.from('bookings').select('id')
      .eq('unit_id', unitId).lte('tgl_mulai', tglSelesai).gte('tgl_selesai', tglMulai).limit(1)
    if (bentrok && bentrok.length > 0) {
      setLoading(false)
      setMsg('Ups, tanggal ini udah kebokingan. Coba unit lain atau tanggal lain ya 😊')
      setStep(1)
      return
    }
    const { error } = await supabase.from('bookings').insert({
      unit_id: unitId, nama: nama.trim(), wa: waNorm, paket,
      tgl_mulai: tglMulai, tgl_selesai: tglSelesai, total,
    })
    setLoading(false)
    if (error) { setMsg('Gagal menyimpan: ' + error.message); return }
    const teks = `Halo min Rental Sedulur, mau sewa ${unitId} paket ${paket} ${tglMulai} s/d ${tglSelesai} a/n ${nama.trim()} Total Rp ${total.toLocaleString('id-ID')}${catatan ? ` (Catatan: ${catatan})` : ''}`
    window.open(`https://wa.me/${WA_OWNER}?text=${encodeURIComponent(teks)}`, '_blank')
    setDone(true)
  }

  function reset() {
    setStep(1); setUnitId(''); setTglMulai(''); setTglSelesai('')
    setNama(''); setWa(''); setCatatan(''); setTotal(0); setMsg(''); setDone(false)
  }

  const inputCls = "w-full p-3 rounded-xl bg-white border text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/30 focus:border-[#7C3AED] text-[16px] transition"
  const stepLabel = ['Pilih PS-nya', 'Data kamu', 'Cek & Bayar'][step - 1]

  if (done) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[16px] p-8 text-center" style={{ border: '2px solid #C0C0C0', boxShadow: '0 8px 24px rgba(124,58,237,0.12)' }}>
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white text-3xl" style={{ background: 'linear-gradient(135deg, #10B981, #00FFFF)', border: '2px solid #C0C0C0' }}>✓</div>
          <h1 className="font-display text-2xl mt-4">Booking tersimpan! 🎮</h1>
          <p className="text-sm text-[#64748B] mt-2">{unitId} • {paket} • {tglMulai} s/d {tglSelesai}<br />Total <b className="text-[#0F172A]">Rp {total.toLocaleString('id-ID')}</b> a/n {nama.trim()}</p>
          <p className="text-sm text-[#64748B] mt-3">Chat WA sudah kebuka — kirim pesannya biar admin langsung konfirmasi ya 😊</p>
          <a href={`https://wa.me/${WA_OWNER}`} target="_blank" className="mt-5 block w-full text-white py-3 rounded-xl font-semibold" style={{ background: 'linear-gradient(180deg, #2ED47A 0%, #1DA851 100%)', border: '2px solid #C0C0C0' }}>Chat Owner Lagi</a>
          <button onClick={reset} className="mt-2 w-full py-3 rounded-xl font-semibold bg-white" style={{ border: '2px solid #C0C0C0' }}>Booking lain</button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #FF69B4, #00FFFF, #7C3AED, #FF69B4)' }} />
      <div className="max-w-2xl mx-auto px-6 py-8">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#7C3AED] transition">← Kembali katalog</a>
        <h1 className="font-display text-3xl mt-4">Sewa PS <span className="text-sm px-2.5 py-1 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0' }}>✦ Gampang</span></h1>

        {/* Progress 1-2-3 */}
        <div className="mt-5 flex items-center gap-2">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex-1 flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0`} style={n <= step ? { background: 'linear-gradient(135deg, #7C3AED, #00FFFF)', border: '2px solid #C0C0C0' } : { background: '#E2E8F0', color: '#64748B', border: '2px solid #CBD5E1' }}>{n}</div>
              <div className={`text-xs font-semibold ${n === step ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}>{['Pilih PS-nya', 'Data kamu', 'Cek & Bayar'][n - 1]}</div>
              {n < 3 && <div className="flex-1 h-0.5 rounded" style={{ background: n < step ? '#7C3AED' : '#E2E8F0' }} />}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-[16px] p-6" style={{ border: '2px solid #C0C0C0', boxShadow: '0 8px 24px rgba(124,58,237,0.12)' }}>
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <p className="font-semibold mb-2">1. {stepLabel} — tap yang kamu mau 🎮</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {units.map(u => {
                    const booked = isBooked(u.id)
                    const active = unitId === u.id
                    return (
                      <button key={u.id} type="button" disabled={booked} onClick={() => setUnitId(u.id)}
                        className="p-3 rounded-xl border-2 text-left transition disabled:opacity-40"
                        style={active ? { borderColor: '#7C3AED', background: '#F5F3FF' } : { borderColor: '#E2E8F0', background: '#fff' }}>
                        <div className="font-bold text-sm">{u.id}</div>
                        <div className="text-xs text-[#64748B]">{u.tipe} • {Number(u.harga_harian).toLocaleString('id-ID')}/hari</div>
                        <div className={`text-[11px] font-bold mt-1 ${booked ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>{booked ? '● Kebokingan' : '● Tersedia'}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">2. Kapan main? 📅</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs text-[#64748B]">Mulai</label><input type="date" value={tglMulai} onChange={e => setTglMulai(e.target.value)} className={inputCls} style={{ borderColor: '#C0C0C0' }} /></div>
                  <div><label className="text-xs text-[#64748B]">Selesai</label><input type="date" value={tglSelesai} min={tglMulai} onChange={e => setTglSelesai(e.target.value)} className={inputCls} style={{ borderColor: '#C0C0C0' }} /></div>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">3. Paket apa? 💰</p>
                <div className="grid grid-cols-3 gap-2">
                  {(['harian', 'malam', 'mingguan'] as Paket[]).map(p => (
                    <button key={p} type="button" onClick={() => setPaket(p)} className="p-3 rounded-xl border-2 text-sm font-semibold transition"
                      style={paket === p ? { borderColor: '#FF69B4', background: '#FFF1F2' } : { borderColor: '#E2E8F0', background: '#fff' }}>
                      {p === 'harian' ? '☀️ Harian' : p === 'malam' ? '🌙 Malam -40%' : '📦 Mingguan'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #FFE4E6 0%, #E0F7FF 50%, #F5F3FF 100%)', border: '2px solid rgba(192,192,192,0.6)' }}>
                <span className="text-sm text-[#64748B]">Total Estimasi</span>
                <span className="font-bold text-2xl" style={{ color: '#7C3AED' }}>Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <button disabled={!canNext1} onClick={() => { setMsg(''); setStep(2) }} className="w-full text-white py-3.5 rounded-xl font-semibold disabled:opacity-40" style={{ background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)', border: '2px solid #C0C0C0' }}>
                Lanjut isi data →
              </button>
              {!canNext1 && <p className="text-xs text-[#94A3B8] text-center">Pilih unit yang tersedia + tanggal dulu ya 😊</p>}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Nama lengkap</label>
                <input placeholder="Budi Santoso" value={nama} onChange={e => setNama(e.target.value)} className={inputCls} style={{ borderColor: '#C0C0C0' }} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">No WA</label>
                <input placeholder="0812xxxx" value={wa} onChange={e => setWa(e.target.value)} className={inputCls} style={{ borderColor: '#C0C0C0' }} />
                <p className="text-xs text-[#64748B] mt-1">Contoh: 081289538855 — konfirmasi dikirim via WA</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Catatan <span className="font-normal text-[#94A3B8]">(boleh kosong)</span></label>
                <input placeholder="Antar ke kosan X..." value={catatan} onChange={e => setCatatan(e.target.value)} className={inputCls} style={{ borderColor: '#C0C0C0' }} />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-semibold bg-white" style={{ border: '2px solid #C0C0C0' }}>← Ubah</button>
                <button disabled={!canNext2} onClick={() => { setMsg(''); setStep(3) }} className="flex-[2] text-white py-3 rounded-xl font-semibold disabled:opacity-40" style={{ background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)', border: '2px solid #C0C0C0' }}>Cek ringkasan →</button>
              </div>
              {!canNext2 && <p className="text-xs text-[#94A3B8] text-center">Nama minimal 3 huruf + WA diawali 08 / 628 ya 😊</p>}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl p-4 space-y-2 text-sm" style={{ background: '#F8FAFC', border: '2px solid #E2E8F0' }}>
                <div className="flex justify-between"><span className="text-[#64748B]">Unit</span><b>{unitId} ({units.find(u => u.id === unitId)?.tipe})</b></div>
                <div className="flex justify-between"><span className="text-[#64748B]">Tanggal</span><b>{tglMulai} s/d {tglSelesai}</b></div>
                <div className="flex justify-between"><span className="text-[#64748B]">Paket</span><b className="capitalize">{paket}</b></div>
                <div className="flex justify-between"><span className="text-[#64748B]">Penyewa</span><b>{nama.trim()} • {normalizeWA(wa)}</b></div>
                {catatan && <div className="flex justify-between"><span className="text-[#64748B]">Catatan</span><b>{catatan}</b></div>}
                <div className="flex justify-between pt-2" style={{ borderTop: '1px dashed #CBD5E1' }}><span className="text-[#64748B]">Total bayar</span><b className="text-lg" style={{ color: '#7C3AED' }}>Rp {total.toLocaleString('id-ID')}</b></div>
              </div>
              <p className="text-xs text-[#64748B] text-center">💰 Bayar: transfer / QRIS / bayar di tempat — admin konfirmasi via WA setelah kamu klik tombol di bawah</p>
              <button disabled={loading} onClick={submit} className="w-full text-white py-3.5 rounded-xl font-semibold disabled:opacity-60" style={{ background: 'linear-gradient(180deg, #2ED47A 0%, #1DA851 100%)', border: '2px solid #C0C0C0' }}>
                {loading ? 'Menyimpan...' : '✦ Saya Sudah Bayar ✦'}
              </button>
              <div className="flex gap-2">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl font-semibold bg-white text-sm" style={{ border: '2px solid #C0C0C0' }}>← Ubah data</button>
                <button onClick={reset} className="flex-1 py-3 rounded-xl font-semibold bg-white text-sm text-[#991B1B]" style={{ border: '2px solid #C0C0C0' }}>Batal</button>
              </div>
            </div>
          )}

          {msg && <p className="text-sm px-3 py-2 rounded-xl bg-[#FEF2F2] text-[#991B1B]" style={{ border: '2px solid #C0C0C0' }}>{msg}</p>}
        </div>
        <p className="mt-4 text-center text-xs text-[#64748B]">✦ Pembayaran: DP 50k transfer / bayar full di tempat • Antar gratis Mojokerto kota ✦</p>
      </div>
    </main>
  )
}

export default function Sewa() {
  return (
    <Suspense fallback={<div className="p-6 bg-[#F8FAFC] min-h-screen"><div className="max-w-2xl mx-auto bg-white rounded-[16px] p-6 animate-pulse h-96" style={{ border: '2px solid #C0C0C0' }} /></div>}>
      <SewaWizard />
    </Suspense>
  )
}
