import { createHmac } from 'crypto'
import { cookies } from 'next/headers'
const COOKIE = 'member_session'
const secret = () => process.env.MEMBER_SESSION_SECRET ?? 'ganti-di-vercel-settings'

export function signSession(memberId: string) {
  const sig = createHmac('sha256', secret()).update(memberId).digest('hex')
  return `${memberId}.${sig}`
}
export function readSession(): string | null {
  const v = cookies().get(COOKIE)?.value
  if (!v) return null
  const [id, sig] = v.split('.')
  if (!id || !sig) return null
  const ok = createHmac('sha256', secret()).update(id).digest('hex') === sig
  return ok ? id : null
}
export function setSessionCookie(memberId: string) {
  cookies().set(COOKIE, signSession(memberId), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
}
export function clearSessionCookie() {
  cookies().delete(COOKIE)
}
