'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RefreshButton({ autoMs = 30000 }: { autoMs?: number }) {
  const router = useRouter()
  const [spinning, setSpinning] = useState(false)
  const [at, setAt] = useState('')
  const [auto, setAuto] = useState(true)
  const refresh = () => {
    setSpinning(true)
    router.refresh()
    setAt(new Date().toLocaleTimeString('id-ID'))
    setTimeout(() => setSpinning(false), 1200)
  }
  useEffect(() => {
    setAt(new Date().toLocaleTimeString('id-ID'))
    if (!auto) return
    const t = setInterval(refresh, autoMs)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto])
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#94A3B8]">Update: {at || '...'}</span>
      <button onClick={() => setAuto(v => !v)} title="Auto-refresh 30 detik" className={`text-xs px-3 py-2 rounded-xl font-bold cursor-pointer border-2 ${auto ? 'bg-[#ECFDF5] text-[#065F46] border-[#10B981]/40' : 'bg-white text-[#64748B]'}`} style={{ borderColor: '#C0C0C0' }}>
        Auto {auto ? 'ON' : 'OFF'}
      </button>
      <button onClick={refresh} className="text-sm px-4 py-2 rounded-xl font-semibold cursor-pointer bg-white hover:text-[#7C3AED] transition" style={{ border: '2px solid #C0C0C0' }}>
        <span className={spinning ? 'inline-block animate-spin' : ''}>⟳</span> Refresh
      </button>
    </div>
  )
}
