// Tarif resmi = poster Rental Sedulur (tanpa promo Malming)
export type Paket = '12jam'|'harian'|'2hari'|'3hari'|'malam'|'mingguan'
export const TIERS: Record<string, Record<Paket, number>> = {
  PS3: { '12jam': 50000, harian: 100000, '2hari': 150000, '3hari': 200000, malam: 50000, mingguan: 400000 },
  PS4: { '12jam': 80000, harian: 130000, '2hari': 200000, '3hari': 380000, malam: 75000, mingguan: 500000 },
}
export const PAKET_LABEL: Record<Paket,string> = {
  '12jam': '12 Jam', harian: 'Harian (24 jam)', '2hari': '2 Hari', '3hari': '3 Hari',
  malam: 'Malam (19:00–07:00)', mingguan: 'Mingguan (6+1 hari)',
}
export function hitungTotal(tipe: string, paket: Paket, days: number){
  const t = TIERS[tipe] ?? TIERS.PS4
  if(paket==='mingguan') return Math.ceil(days/7) * t.mingguan
  return days * t[paket]
}
