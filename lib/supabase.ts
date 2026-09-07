import { createClient } from '@supabase/supabase-js'
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// Fallback untuk build tanpa env - pakai dummy agar tidak crash, runtime akan pakai FALLBACK_UNITS di page.tsx
export const supabase = url && key
  ? createClient(url, key)
  : (new Proxy({}, {
      get: () => () => ({
        select: () => ({ order: () => Promise.resolve({ data: null, error: null }) }),
        from: () => ({ select: () => ({ order: () => Promise.resolve({ data: null, error: null }) }) }),
      }),
      apply: () => Promise.resolve({ data: null }),
    }) as any)

// Polyfill: jika proxy tidak cukup, override from
if (!url || !key) {
  console.warn('Supabase env belum diisi - pakai fallback units untuk build/preview')
  // @ts-ignore
  supabase.from = () => ({
    select: () => ({
      order: () => Promise.resolve({ data: null, error: null }),
    }),
  } as any)
}
