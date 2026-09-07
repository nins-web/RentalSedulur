'use client'
import { useState } from 'react'
export default function AdminLogin(){
  const [user,setUser]=useState('')
  const [pass,setPass]=useState('')
  const [msg,setMsg]=useState('')
  function handle(e:React.FormEvent){
    e.preventDefault()
    // Simple admin check — ganti dengan Supabase Auth nanti
    if(user==='admin' && pass==='admin123'){
      localStorage.setItem('adminToken','y2k-admin-ok')
      window.location.href='/admin'
    } else {
      setMsg('Username atau password salah')
    }
  }
  return (
    <main className="min-h-screen bg-[#0F0F23] text-[#E2E8F0] relative overflow-hidden flex items-center justify-center p-6">
      <div className="absolute inset-0 opacity-10" style={{background: 'radial-gradient(ellipse at 30% 50%, #FF69B4 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, #00FFFF 0%, transparent 40%)'}} />
      <div className="relative bg-white text-[#0F172A] rounded-[16px] p-6 w-full max-w-md" style={{border: '2px solid #C0C0C0', boxShadow: '0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.9)'}}>
        <div className="absolute top-0 left-0 right-0 h-8 rounded-t-[14px]" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'}} />
        <h1 className="font-display text-2xl flex items-center gap-2">Admin Login <span className="text-xs px-2 py-1 rounded-full text-white" style={{background: 'linear-gradient(135deg, #0F172A, #7C3AED)', border: '1px solid #C0C0C0'}}>Y2K</span></h1>
        <p className="text-sm text-[#64748B] mt-1">Masuk untuk kelola booking — semua kalangan</p>
        <form onSubmit={handle} className="mt-6 space-y-4">
          <div><label className="block text-sm font-semibold mb-1.5">Username</label><input value={user} onChange={e=>setUser(e.target.value)} placeholder="admin" className="w-full p-3 rounded-xl bg-white border text-[16px]" style={{borderColor: '#C0C0C0'}} /></div>
          <div><label className="block text-sm font-semibold mb-1.5">Password</label><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••" className="w-full p-3 rounded-xl bg-white border text-[16px]" style={{borderColor: '#C0C0C0'}} /></div>
          <button className="w-full text-white py-3 rounded-xl font-semibold cursor-pointer" style={{background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)', border: '2px solid #C0C0C0'}}>Masuk Admin ✦</button>
          {msg && <p className="text-sm px-3 py-2 rounded-xl bg-[#FEF2F2] text-[#991B1B] border" style={{borderColor: '#C0C0C0'}}>{msg}</p>}
          <p className="text-xs text-[#64748B] text-center">Demo: admin / admin123</p>
        </form>
      </div>
    </main>
  )
}
