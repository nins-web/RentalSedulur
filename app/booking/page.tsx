'use client'
import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// /booking dilebur ke /sewa (ronde 4) — link lama & halaman SEO tetap jalan.
function Forward() {
  const router = useRouter()
  const sp = useSearchParams()
  useEffect(() => {
    const q = sp.toString()
    router.replace(q ? `/sewa?${q}` : '/sewa')
  }, [router, sp])
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <p className="text-sm text-[#64748B]">Mengalihkan ke halaman sewa... 🎮</p>
    </main>
  )
}

export default function Booking() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F8FAFC]" />}>
      <Forward />
    </Suspense>
  )
}
