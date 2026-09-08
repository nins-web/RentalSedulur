'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminActions({ id, status }: { id: string, status: string }) {
  const [s, setS] = useState(status)
  const [busy, setBusy] = useState(false)

  async function setStatus(next: string) {
    setBusy(true)
    const { error } = await supabase.from('bookings').update({ status: next }).eq('id', id)
    setBusy(false)
    if (!error) setS(next)
  }

  if (s === 'confirmed' || s === 'selesai') {
    return (
      <div className="flex gap-2 h-fit">
        <button disabled={busy} onClick={() => setStatus('selesai')} className="text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #10B981, #00FFFF)', border: '2px solid #C0C0C0' }}>✓ Selesai</button>
        <button disabled={busy} onClick={() => setStatus('batal')} className="text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #EF4444, #FF69B4)', border: '2px solid #C0C0C0' }}>✕ Batal</button>
      </div>
    )
  }
  if (s === 'batal') return <span className="text-xs text-[#94A3B8]">Dibatalkan</span>
  return (
    <div className="flex gap-2 h-fit">
      <button disabled={busy} onClick={() => setStatus('confirmed')} className="text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #10B981, #00FFFF)', border: '2px solid #C0C0C0' }}>✓ Konfirmasi</button>
      <button disabled={busy} onClick={() => setStatus('batal')} className="text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #EF4444, #FF69B4)', border: '2px solid #C0C0C0' }}>✕ Batal</button>
    </div>
  )
}
