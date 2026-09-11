import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { readSession } from '@/lib/memberSession'

export async function GET() {
  try {
    const id = readSession()
    if (!id) return NextResponse.json({ member: null })
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { data } = await db.from('members').select('id,nama,phone').eq('id', id).single()
    return NextResponse.json({ member: data ?? null })
  } catch {
    return NextResponse.json({ member: null })
  }
}
