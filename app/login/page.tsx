'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function Login(){
  const [email,setEmail]=useState('')
  const [wa,setWa]=useState('')
  const [msg,setMsg]=useState('')
  async function handle(e:React.FormEvent){
    e.preventDefault()
    if(!email||!wa) return setMsg('Lengkapi email & WA')
    // Untuk UMKM, login member simpel: cek bookings dengan email/wa, atau buat akun via Supabase Auth OTP
    // Sementara pakai Supabase Auth magic link
    const {error} = await supabase.auth.signInWithOtp({ email, options: { data: { wa } } })
    if(error) return setMsg('Gagal: '+error.message)
    setMsg('Cek email untuk link login ✦')
  }
  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      <div className="h-2 w-full" style={{background: 'linear-gradient(90deg, #FF69B4, #00FFFF, #7C3AED, #FF69B4)'}} />
      <div className="max-w-md mx-auto px-6 py-12">
        <a href="/" className="text-sm text-[#64748B] hover:text-[#7C3AED]">← Kembali</a>
        <div className="mt-6 bg-white rounded-[16px] p-6" style={{border: '2px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 24px rgba(124,58,237,0.12)'}}>
          <div className="absolute top-0 left-0 right-0 h-8 rounded-t-[14px] pointer-events-none" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'}} />
          <h1 className="font-display text-2xl flex items-center gap-2">Login Member <span className="text-xs px-2 py-1 rounded-full text-white" style={{background: 'linear-gradient(135deg, #FF69B4, #00FFFF)', border: '1px solid #C0C0C0'}}>✦ Y2K</span></h1>
          <p className="text-sm text-[#64748B] mt-2">Masuk untuk lihat riwayat booking kamu — untuk semua kalangan</p>
          <form onSubmit={handle} className="mt-6 space-y-4">
            <div><label className="block text-sm font-semibold mb-1.5">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="budi@email.com" className="w-full p-3 rounded-xl bg-white border text-[16px]" style={{borderColor: '#C0C0C0'}} /></div>
            <div><label className="block text-sm font-semibold mb-1.5">No WA</label><input value={wa} onChange={e=>setWa(e.target.value)} placeholder="0812xxxx" className="w-full p-3 rounded-xl bg-white border text-[16px]" style={{borderColor: '#C0C0C0'}} /></div>
            <button className="w-full text-white py-3 rounded-xl font-semibold cursor-pointer" style={{background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)', border: '2px solid #C0C0C0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'}}>Kirim Link Login ✦</button>
            {msg && <p className="text-sm px-3 py-2 rounded-xl" style={{background: msg.includes('Cek') ? '#ECFDF5' : '#FEF2F2', border: '1px solid #C0C0C0'}}>{msg}</p>}
          </form>
          <p className="text-xs text-[#64748B] mt-4 text-center">Belum punya akun? Booking sekali otomatis jadi member</p>
        </div>
      </div>
    </main>
  )
}
