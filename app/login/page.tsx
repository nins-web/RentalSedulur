'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const inputCls = "w-full p-3 rounded-xl bg-white border text-[#0F172A] text-[16px]"
const btnUngu = "w-full text-white py-3 rounded-xl font-semibold cursor-pointer"

export default function Login(){
  const [tab,setTab]=useState<'google'|'hp'>('google')
  const [phone,setPhone]=useState('')
  const [otp,setOtp]=useState('')
  const [step,setStep]=useState<'isi'|'kode'>('isi')
  const [nama,setNama]=useState('')
  const [msg,setMsg]=useState('')
  const [loading,setLoading]=useState(false)

  const ke62 = (p:string)=>{ const d=p.replace(/\D/g,''); return d.startsWith('0') ? '+62'+d.slice(1) : d.startsWith('62') ? '+'+d : '+62'+d }

  async function loginGoogle(){
    setLoading(true); setMsg('')
    const {error} = await supabase.auth.signInWithOAuth({ provider:'google', options:{ redirectTo: typeof window!=='undefined' ? `${window.location.origin}/booking` : undefined } })
    setLoading(false)
    if(error) setMsg('Gagal: '+error.message+' (admin: aktifkan provider Google di Supabase Dashboard > Authentication > Providers)')
  }
  async function kirimOtp(e:React.FormEvent){
    e.preventDefault()
    if(!phone||!nama) return setMsg('Lengkapi nama & no HP')
    setLoading(true); setMsg('')
    const {error} = await supabase.auth.signInWithOtp({ phone: ke62(phone), options:{ data:{ nama } } })
    setLoading(false)
    if(error){
      if(/sms|phone|twilio/i.test(error.message)) return setMsg('OTP SMS belum aktif. Admin: isi Twilio di Supabase Dashboard > Authentication > Sign In / Up > Phone.')
      return setMsg('Gagal: '+error.message)
    }
    setStep('kode'); setMsg('Kode OTP dikirim ke '+phone+' — masukkan 6 digit')
  }
  async function verifOtp(e:React.FormEvent){
    e.preventDefault()
    if(otp.length<6) return setMsg('Kode OTP 6 digit')
    setLoading(true); setMsg('')
    const {data,error} = await supabase.auth.verifyOtp({ phone: ke62(phone), token: otp, type:'sms' })
    setLoading(false)
    if(error) return setMsg('Gagal: '+error.message)
    if(data.user){
      await supabase.from('members').upsert({ id: data.user.id, nama, phone: ke62(phone) }, { onConflict:'id' })
      window.location.href = '/booking'
    }
  }
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="h-2 w-full" style={{background: 'linear-gradient(90deg, #FF69B4, #00FFFF, #7C3AED, #FF69B4)'}} />
      <div className="max-w-md mx-auto px-6 py-12">
        <a href="/" className="text-sm text-[#64748B] hover:text-[#7C3AED]">← Kembali</a>
        <div className="mt-6 bg-white rounded-[16px] p-6" style={{border: '2px solid #C0C0C0', boxShadow: '0 8px 24px rgba(124,58,237,0.12)'}}>
          <h1 className="font-display text-2xl text-[#0F172A]">Login / Daftar Member</h1>
          <p className="text-sm text-[#64748B] mt-2">Masuk untuk lihat riwayat booking kamu</p>
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 rounded-xl bg-[#F1F5F9]">
            <button onClick={()=>{setTab('google');setMsg('')}} className={`py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${tab==='google'?'bg-white shadow text-[#0F172A]':'text-[#64748B]'}`}>🔵 Google</button>
            <button onClick={()=>{setTab('hp');setMsg('')}} className={`py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${tab==='hp'?'bg-white shadow text-[#0F172A]':'text-[#64748B]'}`}>📱 OTP HP</button>
          </div>
          {tab==='google' ? (
            <div className="mt-5">
              <button onClick={loginGoogle} disabled={loading} className={btnUngu} style={{background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)', border: '2px solid #C0C0C0'}}>
                {loading ? 'Menghubungkan...' : '🔵 Masuk dengan Google'}
              </button>
              <p className="text-xs text-[#64748B] mt-3 text-center">Pakai akun Gmail kamu — 1 klik, tanpa password</p>
            </div>
          ) : step==='isi' ? (
            <form onSubmit={kirimOtp} className="mt-5 space-y-4">
              <div><label className="block text-sm font-semibold mb-1.5">Nama Lengkap</label><input value={nama} onChange={e=>setNama(e.target.value)} placeholder="Budi Santoso" className={inputCls} style={{borderColor:'#C0C0C0'}} /></div>
              <div><label className="block text-sm font-semibold mb-1.5">No HP</label><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="0812xxxx" inputMode="tel" className={inputCls} style={{borderColor:'#C0C0C0'}} /></div>
              <button disabled={loading} className={btnUngu} style={{background: 'linear-gradient(180deg, #2ED47A 0%, #25D366 50%, #1DA851 100%)', border: '2px solid #C0C0C0'}}>{loading ? 'Mengirim...' : 'Kirim Kode OTP'}</button>
            </form>
          ) : (
            <form onSubmit={verifOtp} className="mt-5 space-y-4">
              <div><label className="block text-sm font-semibold mb-1.5">Kode OTP (6 digit)</label><input value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="123456" inputMode="numeric" className={inputCls+' text-center text-2xl tracking-[0.5em]'} style={{borderColor:'#C0C0C0'}} /></div>
              <button disabled={loading} className={btnUngu} style={{background: 'linear-gradient(180deg, #2ED47A 0%, #25D366 50%, #1DA851 100%)', border: '2px solid #C0C0C0'}}>{loading ? 'Memeriksa...' : 'Masuk'}</button>
              <button type="button" onClick={()=>setStep('isi')} className="w-full text-xs text-[#64748B] cursor-pointer">← Ganti nomor</button>
            </form>
          )}
          {msg && <p className="text-sm px-3 py-2 rounded-xl mt-4" style={{background: /dikirim|Masuk|tersimpan/i.test(msg) ? '#ECFDF5' : '#FEF2F2', border: '1px solid #C0C0C0'}}>{msg}</p>}
        </div>
      </div>
    </main>
  )
}
