import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rental Sedulur - Sewa PS4 & PS3 Mojokerto',
    short_name: 'Sedulur',
    description: 'Sewa PS4/PS3 termurah Mojokerto — 8 unit, paket malam hemat 40%',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F0F23',
    theme_color: '#7C3AED',
    lang: 'id',
    icons: [],
  }
}
