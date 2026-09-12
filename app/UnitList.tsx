'use client'
import { useState } from 'react'

type Unit = { id: string, tipe: string, harga_harian: number, harga_malam: number, harga_mingguan: number }
type Booking = { unit_id: string, tgl_mulai: string, tgl_selesai: string }

const rp = (n: number) => Number(n).toLocaleString('id-ID')

// Ikon stik Y2K asli — glossy aqua + chrome, tidak diubah
function Y2KController({ ps4 }: { ps4: boolean }){
  return (
    <div className="relative shrink-0">
      <div className="absolute inset-0 rounded-[20px] opacity-60" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 55%), linear-gradient(135deg, #00FFFF 0%, #7C3AED 50%, #FF69B4 100%)', filter: 'blur(12px)'}} />
      <div className="relative w-24 h-24 rounded-[20px] flex items-center justify-center" style={{
        background: 'linear-gradient(180deg, #E0F7FF 0%, #00D4FF 15%, #7C3AED 100%)',
        border: '2px solid #C0C0C0',
        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 16px rgba(124,58,237,0.3)',
      }}>
        <div className="absolute top-1 left-2 right-2 h-8 rounded-full opacity-70" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, transparent 100%)'}} />
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          <path d="M6 12c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2c0 2.2-1.8 4-4 4h-4c-2.2 0-4-1.8-4-4v-2z" fill="url(#chrome)" stroke="#5B21B6" strokeWidth="0.8"/>
          <circle cx="9" cy="13" r="1.2" fill="#1F2937"/><circle cx="9" cy="15.5" r="0.7" fill="#374151"/><circle cx="15" cy="13" r="1.2" fill="#FF69B4"/><circle cx="15.5" cy="15" r="0.7" fill="#00FFFF"/>
          <defs><linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="50%" stopColor="#C0C0C0"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
        </svg>
        <span className="absolute -top-1 -right-1 text-[10px]">✦</span><span className="absolute -bottom-1 -left-1 text-[8px] opacity-70">✧</span>
      </div>
    </div>
  )
}

export default function UnitList({ units, bookings }: { units: Unit[], bookings: Booking[] }) {
  const [view, setView] = useState<'types' | 'PS4' | 'PS3'>('types')
  const isBooked = (id: string) => bookings.some(b => b.unit_id === id)

  const typeCard = (tipe: 'PS4' | 'PS3', desc: string, grad: string) => {
    const list = units.filter(u => u.tipe === tipe)
    const ready = list.filter(u => !isBooked(u.id)).length
    const mulai = Math.min(...list.map(u => Number(u.harga_malam)))
    return (
      <button key={tipe} onClick={() => setView(tipe)} className="flex-1 min-w-[220px] text-left rounded-[12px] p-5 text-white relative overflow-hidden transition hover:opacity-95"
        style={{ background: grad, border: '1px solid rgba(255,255,255,0.3)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 60%)' }} />
        <div className="relative flex items-center gap-4">
          <Y2KController ps4={tipe === 'PS4'} />
          <div>
            <p className="font-display text-2xl">{tipe}</p>
            <p className="text-xs opacity-80 mt-1">{desc}</p>
            <p className="mt-2 text-sm"><b>{ready}/{list.length} ready</b> • mulai <b>Rp {rp(mulai)}/mlm</b></p>
            <p className="mt-1 text-sm font-bold">Lihat unit →</p>
          </div>
        </div>
      </button>
    )
  }

  const row = (u: Unit) => {
    const booked = isBooked(u.id)
    return (
      <a key={u.id} href={booked ? undefined : `/sewa?unit=${u.id}`} aria-disabled={booked}
        className={`flex items-center gap-3 p-4 transition ${booked ? 'opacity-50' : 'hover:bg-[#F8FAFC]'}`}>
        <span className="flex-1 min-w-0">
          <span className="block font-heading font-bold">{u.id}</span>
          <span className="text-xs text-[#64748B]">Harian Rp {rp(u.harga_harian)} • Malam Rp {rp(u.harga_malam)} • Minggu Rp {rp(u.harga_mingguan)}</span>
        </span>
        <span className={`text-[11px] font-bold shrink-0 ${booked ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>{booked ? '● Dibooking' : '● Ready'}</span>
        {!booked && <span className="text-xl text-[#94A3B8] shrink-0">›</span>}
      </a>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h2 className="font-display text-2xl">PILIH UNIT <span className="text-[#7C3AED]">{units.length} TERSEDIA</span></h2>
      </div>
      {view === 'types' ? (
        <div className="flex flex-wrap gap-4">
          {typeCard('PS4', 'Game update • HDMI • Online ready', 'linear-gradient(135deg, #1E1C35 0%, #4C1D95 50%, #FF69B4 100%)')}
          {typeCard('PS3', 'Game klasik • Stik 2 • Antar', 'linear-gradient(135deg, #0F172A 0%, #334155 50%, #00FFFF 100%)')}
        </div>
      ) : (
        <div>
          <button onClick={() => setView('types')} className="mb-3 text-sm text-[#7C3AED] font-semibold">← Semua tipe</button>
          <div className="divide-y divide-[#E2E8F0] overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white shadow-sm">
            {units.filter(u => u.tipe === view).map(row)}
          </div>
        </div>
      )}
      <p className="mt-2 text-[11px] text-center font-label" style={{ color: '#FF1493' }}>✦ Paket malam hemat 42% — ketuk untuk booking ✦</p>
    </div>
  )
}
