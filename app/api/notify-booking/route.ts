import { NextResponse } from 'next/server'
import { sendWa } from '@/lib/wa'

const WA_OWNER = '6281289538855'

// Dipanggil client setelah booking tersimpan. Tidak pernah gagalkan booking:
// error notif hanya dicatat, respons tetap ok.
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
    await sendWa(WA_OWNER, msg)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('notify-booking:', e?.message)
    return NextResponse.json({ ok: false })
  }
}
