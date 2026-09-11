import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { ke62, genCode, hashCode, OTP_TTL_MIN, OTP_MAX_PER_HOUR } from '@/lib/otp'
import { sendWa } from '@/lib/wa'

const service = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!, key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('SUPABASE_SERVICE_ROLE_KEY belum diisi (Vercel > Settings > Environment Variables)')
  return createClient(url, key)
}

export async function POST(req: Request) {
  try {
    const { phone, nama } = await req.json()
    if (!phone || !nama) return NextResponse.json({ error: 'Lengkapi nama & no HP' }, { status: 400 })
    const p62 = ke62(phone)
    const db = service()
    const sejam = new Date(Date.now() - 3600e3).toISOString()
    const { count } = await db.from('otp_codes').select('id', { count: 'exact', head: true }).eq('phone', p62).gte('created_at', sejam)
    if ((count ?? 0) >= OTP_MAX_PER_HOUR) return NextResponse.json({ error: 'Terlalu sering. Coba lagi 1 jam lagi.' }, { status: 429 })
    const code = genCode()
    const { error: ins } = await db.from('otp_codes').insert({ phone: p62, code_hash: hashCode(code), expires_at: new Date(Date.now() + OTP_TTL_MIN * 60e3).toISOString() })
    if (ins) throw ins
    await sendWa(p62, `*Rental Sedulur* — kode OTP kamu: *${code}*\nBerlaku ${OTP_TTL_MIN} menit. Jangan berikan ke siapa pun.`)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('otp/send:', e?.message)
    return NextResponse.json({ error: e?.message ?? 'Gagal kirim OTP' }, { status: 500 })
  }
}
