'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Feedback({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<any>(null)
  const [rating, setRating] = useState(5)
  const [pesan, setPesan] = useState('')
  const [msg, setMsg] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    supabase.from('bookings').select('id,unit_id,nama,status').eq('id', params.id).single().then(({ data }: any) => setBooking(data ?? false))
  }, [params.id])
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!pesan.trim()) return setMsg('Tulis kritik & saran dulu ya Kak')
    setLoading(true); setMsg('')
    const { error } = await supabase.from('feedbacks').insert({ booking_id: params.id, unit_id: booking.unit_id, nama: booking.nama, rating, pesan: pesan.trim() })
    setLoading(false)
    if (error) return setMsg('Gagal: ' + error.message)
    setDone(true)
  }
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #FF69B4, #00FFFF, #7C3AED, #FF69B4)' }} />
      <div className="max-w-md mx-auto px-6 py-12">
        <a href="/" className="text-sm text-[#64748B] hover:text-[#7C3AED]">← Kembali</a>
        <div className="mt-6 bg-white rounded-[16px] p-6" style={{ border: '2px solid #C0C0C0', boxShadow: '0 8px 24px rgba(124,58,237,0.12)' }}>
          <h1 className="font-display text-2xl text-[#0F172A]">Kritik & Saran</h1>
          {booking === null && <p className="text-sm text-[#64748B] mt-4">Memuat...</p>}
          {booking === false && <p className="text-sm text-[#991B1B] mt-4">Link tidak valid — booking tidak ditemukan.</p>}
          {booking && booking.status !== 'selesai' && !done && (
            <p className="text-sm text-[#991B1B] mt-4">Formulir terbuka setelah sewa selesai (status: {booking.status}). Tunggu unit dikembalikan ya Kak 🙏</p>
          )}
          {done ? (
            <p className="text-sm text-[#065F46] mt-4 bg-[#ECFDF5] px-3 py-2 rounded-xl">Makasih masukannya, {booking.nama}! Jadi bahan evaluasi kami 🙏</p>
          ) : booking && booking.status === 'selesai' && (
            <form onSubmit={submit} className="mt-4 space-y-4">
              <p className="text-sm text-[#64748B]">{booking.unit_id} • a/n {booking.nama}</p>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} type="button" onClick={() => setRating(n)} className="text-3xl cursor-pointer">{n <= rating ? '⭐' : '☆'}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Kritik & Saran</label>
                <textarea value={pesan} onChange={e => setPesan(e.target.value)} rows={4} placeholder="Unitnya gimana? Pelayanan gimana? Apa yang perlu diperbaiki?" className="w-full p-3 rounded-xl bg-white border text-[16px]" style={{ borderColor: '#C0C0C0' }} />
              </div>
              <button disabled={loading} className="w-full text-white py-3 rounded-xl font-semibold cursor-pointer disabled:opacity-60" style={{ background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)', border: '2px solid #C0C0C0' }}>
                {loading ? 'Mengirim...' : 'Kirim Masukan'}
              </button>
            </form>
          )}
          {msg && <p className="text-sm px-3 py-2 rounded-xl mt-4 bg-[#FEF2F2] text-[#991B1B]" style={{ border: '1px solid #C0C0C0' }}>{msg}</p>}
        </div>
      </div>
    </main>
  )
}
