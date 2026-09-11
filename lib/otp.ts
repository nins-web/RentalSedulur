import { createHash, randomInt } from 'crypto'
export const ke62 = (p: string) => { const d = p.replace(/\D/g, ''); return d.startsWith('0') ? '+62' + d.slice(1) : d.startsWith('62') ? '+' + d : '+62' + d }
export const genCode = () => String(randomInt(100000, 999999))
export const hashCode = (code: string) => createHash('sha256').update(code).digest('hex')
export const OTP_TTL_MIN = 5
export const OTP_MAX_PER_HOUR = 3
export const OTP_MAX_ATTEMPTS = 5
