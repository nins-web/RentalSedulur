// Kirim WA via Fonnte. Butuh env FONNTE_TOKEN (daftar di fonnte.com).
export async function sendWa(target62: string, message: string) {
  const token = process.env.FONNTE_TOKEN
  if (!token) throw new Error('FONNTE_TOKEN belum diisi (Vercel > Settings > Environment Variables)')
  const target = target62.replace(/^\+/, '')
  const res = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ target, message }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.status === false) throw new Error('Gagal kirim WA: ' + JSON.stringify(data).slice(0, 200))
  return true
}
