'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TopupActions({ id }: { id: string }) {
  const [done, setDone] = useState(false)
  async function act(status: 'approved' | 'rejected') {
    const { error } = await supabase.from('topups').update({ status }).eq('id', id)
    if (!error) setDone(true)
  }
  if (done) return <span className="text-xs font-bold text-[#64748B]">✓ Diproses</span>
  return (
    <>
      <button onClick={() => act('approved')} className="text-white px-4 py-2 rounded-xl text-sm font-bold cursor-pointer" style={{ background: 'linear-gradient(180deg, #2ED47A 0%, #1DA851 100%)', border: '2px solid #C0C0C0' }}>✓ Setujui</button>
      <button onClick={() => act('rejected')} className="px-4 py-2 rounded-xl text-sm font-bold cursor-pointer bg-white text-[#991B1B]" style={{ border: '2px solid #C0C0C0' }}>Tolak</button>
    </>
  )
}
