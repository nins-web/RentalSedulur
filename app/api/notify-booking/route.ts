import { NextResponse } from 'next/server'
import { sendWa } from '@/lib/wa'

const WA_OWNER = '6281289538855'

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_NOTIF_TOKEN
  const chat = process.env.TELEGRAM_ADMIN_CHAT
  if (!token || !chat) throw new Error('Telegram env belum diisi')
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.ok === false) throw new Error('Telegram gagal: ' + JSON.stringify(data).slice(0, 150))
}

// Notif booking baru: Telegram utama, WA Fonnte cadangan.
// Tidak pernah gagalkan booking — error hanya dicatat.
export async function POST(req: Request) {
  try {
    const b = await req.json()
    const msg =
      `🔔 BOOKING BARU — Rental Sedulur\n` +
      `Unit: ${b.unit_id} (${b.paket})\n` +
      `Tanggal: ${b.tgl_mulai} s/d ${b.tgl_selesai}\n` +
      `Nama: ${b.nama} • ${b.wa}\n` +
      `Total: Rp ${Number(b.total).toLocaleString('id-ID')} (${b.metode})\n` +
      `Cek: https://rental-sedulur.vercel.app/admin`
    try {
      await sendTelegram(msg)
    } catch {
      await sendWa(WA_OWNER, msg)
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('notify-booking:', e?.message)
    return NextResponse.json({ ok: false })
  }
}
