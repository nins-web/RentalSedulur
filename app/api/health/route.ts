import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase.from('units').select('id')
    if (error) throw error
    return NextResponse.json({
      status: 'ok',
      units: data?.length ?? 0,
      tz: 'Asia/Jakarta',
      time: new Date().toISOString(),
    })
  } catch (e: any) {
    return NextResponse.json(
      { status: 'degraded', error: e?.message ?? 'unknown' },
      { status: 200 }
    )
  }
}
