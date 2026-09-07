import { Metadata } from 'next'
export default function sitemap(){
  const base = 'https://rental-sedulur.vercel.app'
  const now = new Date()
  const pages = ['', '/booking', '/admin', '/rental-ps-mojokerto', '/rental-ps-sidoarjo', '/rental-ps-jombang', '/rental-ps-surabaya']
  return pages.map(p=>({ url: base + p, lastModified: now, changeFrequency: 'weekly' as const, priority: p==='' ? 1 : 0.8 }))
}
