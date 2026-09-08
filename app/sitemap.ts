export default function sitemap(){
  const base = 'https://rental-sedulur.vercel.app'
  const now = new Date()
  const pages = ['', '/sewa', '/booking', '/admin', '/rental-ps-mojokerto', '/rental-ps-sidoarjo', '/rental-ps-sooko', '/rental-ps-puri', '/rental-ps-jetis', '/rental-ps-gedeg', '/rental-ps-jombang', '/rental-ps-surabaya-barat', '/rental-ps-krian', '/rental-ps-gresik', '/rental-ps-lamongan', '/rental-ps-ngoro', '/rental-ps-pacet', '/rental-ps-trawas', '/rental-ps-mojokerto-kota']
  return pages.map(p=>({ url: base + p, lastModified: now, changeFrequency: 'weekly' as const, priority: p==='' ? 1 : 0.8 }))
}
