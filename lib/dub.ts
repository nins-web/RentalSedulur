// Dub UTM tracking — lightweight, kompatibel dengan dubinc/dub self-host
// Untuk UMKM, cukup pakai UTM + Plausible event, nanti bisa ganti ke Dub Cloud/self-host
export function waLink(unitId?: string, source: string = 'website') {
  const base = 'https://wa.me/6281289538855'
  const text = unitId 
    ? `Halo kak mau rental ${unitId} — info paket malam dong`
    : 'Halo kak mau tanya rental PS'
  const params = new URLSearchParams({
    text,
    utm_source: source,
    utm_medium: 'wa',
    utm_campaign: 'rental_sedulur'
  })
  return `${base}?${params.toString()}`
}
export function trackEvent(name: string, props?: Record<string,string>) {
  // Plausible custom event
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(name, { props })
  }
}
