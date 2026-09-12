'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Booking = { id: string, unit_id: string, paket: string, tgl_mulai: string, tgl_selesai: string, total: number, status: string }

const waVariants = (raw: string) => {
  const d = raw.replace(/\D/g, '')
  const set = new Set<string>([raw, d])
  if (d.startsWith('08')) { set.add('62' + d.slice(1)); set.add('+62' + d.slice(1)) }
  else if (d.startsWith('628')) { set.add('0' + d.slice(2)); set.add('+' + d) }
  else if (d.startsWith('62')) { set.add('0' + d.slice(2)); set.add('+' + d) }
  return [...set]
}

export default function Member() {
  const [nama, setNama] = useState('')
  const [wa, setWa] = useState('')
  const [rows, setRows] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const n = localStorage.getItem('member_nama') ?? ''
    const w = localStorage.getItem('member_wa') ?? ''
    setNama(n); setWa(w)
    if (!w) { setLoading(false); return }
    supabase.from('bookings').select('id,unit_id,paket,tgl_mulai,tgl_selesai,total,status')
      .in('wa', waVariants(w)).order('tgl_mulai', { ascending: false }).limit(20)
      .then(({ data }: any) => { if (data) setRows(data); setLoading(false) })
  }, [])

  if (!loading && !wa) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[16px] p-8 text-center" style={{ border: '2px solid #C0C0C0' }}>
          <p className="text-4xl">🔒</p>
          <h1 className="font-display text-2xl mt-3">Belum login</h1>
          <p className="text-sm text-[#64748B] mt-2">Masuk dulu untuk lihat riwayat sewamu.</p>
          <a href="/login" className="mt-5 block w-full text-white py-3 rounded-xl font-semibold" style={{ background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)', border: '2px solid #C0C0C0' }}>Login / Daftar</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #FF69B4, #00FFFF, #7C3AED, #FF69B4)' }} />
      <div className="max-w-2xl mx-auto px-6 py-8">
        <a href="/" className="text-sm text-[#64748B] hover:text-[#7C3AED]">← Beranda</a>
        <div className="mt-4 bg-white rounded-[16px] p-5 flex items-center gap-4" style={{ border: '2px solid #C0C0C0', boxShadow: '0 8px 24px rgba(124,58,237,0.12)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0" style={{ background: 'linear-gradient(135deg, #7C3AED, #00FFFF)' }}>
            {(nama || 'M').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="font-heading font-bold text-lg">{nama || 'Member'}</p>
            <p className="text-sm text-[#64748B]">{wa}</p>
          </div>
          <a href="/sewa" className="text-white text-sm px-4 py-2 rounded-xl font-semibold shrink-0" style={{ background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)', border: '1px solid #C0C0C0' }}>+ Sewa</a>
        </div>

        <h2 className="font-display text-xl mt-6">RIWAYAT SEWA <span className="text-[#7C3AED]">({rows.length})</span></h2>
        {loading ? (
          <div className="mt-3 bg-white rounded-[12px] p-6 animate-pulse h-32" style={{ border: '2px solid #C0C0C0' }} />
        ) : rows.length === 0 ? (
          <div className="mt-3 bg-white rounded-[12px] p-6 text-center text-sm text-[#64748B]" style={{ border: '2px solid #C0C0C0' }}>
            Belum ada riwayat — yuk sewa pertama! 🎮
          </div>
        ) : (
          <div className="mt-3 divide-y divide-[#E2E8F0] overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white shadow-sm">
            {rows.map(r => (
              <div key={r.id} className="p-4">
                <div className="flex items-center gap-2">
                  <b>{r.unit_id}</b>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold capitalize" style={badgeStyle(r.status)}>{r.status}</span>
                  <span className="flex-1" />
                  <b style={{ color: '#7C3AED' }}>Rp {Number(r.total).toLocaleString('id-ID')}</b>
                </div>
                <p className="text-xs text-[#64748B] mt-1 capitalize">{r.paket} • {r.tgl_mulai} s/d {r.tgl_selesai}</p>
                {r.status === 'selesai' && (
                  <a href={`/feedback/${r.id}`} className="mt-2 inline-block text-xs font-semibold text-[#7C3AED] underline">✦ Kasih kritik & saran</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function badgeStyle(s: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    pending: { background: '#FEF3C7', color: '#92400E' },
    confirmed: { background: '#DBEAFE', color: '#1E40AF' },
    selesai: { background: '#D1FAE5', color: '#065F46' },
    batal: { background: '#FEE2E2', color: '#991B1B' },
  }
  return map[s] ?? { background: '#F1F5F9', color: '#64748B' }
}
