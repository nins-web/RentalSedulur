import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { ke62, hashCode, OTP_MAX_ATTEMPTS } from '@/lib/otp'
import { setSessionCookie } from '@/lib/memberSession'

const service = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!, key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('SUPABASE_SERVICE_ROLE_KEY belum diisi (Vercel > Settings > Environment Variables)')
  return createClient(url, key)
}

export async function POST(req: Request) {
  try {
    const { phone, code, nama } = await req.json()
    if (!phone || !code) return NextResponse.json({ error: 'Lengkapi nomor & kode' }, { status: 400 })
    const p62 = ke62(phone)
    const db = service()
    const { data: rows } = await db.from('otp_codes').select('*').eq('phone', p62).eq('used', false).order('created_at', { ascending: false }).limit(1)
    const row = rows?.[0]
    if (!row) return NextResponse.json({ error: 'Kode tidak ditemukan. Minta kode baru.' }, { status: 400 })
    if (new Date(row.expires_at).getTime() < Date.now()) return NextResponse.json({ error: 'Kode kedaluwarsa. Minta kode baru.' }, { status: 400 })
    if (row.attempts >= OTP_MAX_ATTEMPTS) return NextResponse.json({ error: 'Terlalu banyak salah. Minta kode baru.' }, { status: 429 })
    if (row.code_hash !== hashCode(code)) {
      await db.from('otp_codes').update({ attempts: row.attempts + 1 }).eq('id', row.id)
      return NextResponse.json({ error: `Kode salah (${row.attempts + 1}/${OTP_MAX_ATTEMPTS})` }, { status: 400 })
    }
    await db.from('otp_codes').update({ used: true }).eq('id', row.id)
    const { data: member } = await db.from('members').upsert({ phone: p62, nama: nama ?? 'Member' }, { onConflict: 'phone' }).select('id').single()
    if (!member) throw new Error('Gagal simpan member')
    setSessionCookie(member.id)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('otp/verify:', e?.message)
    return NextResponse.json({ error: e?.message ?? 'Gagal verifikasi' }, { status: 500 })
  }
}
