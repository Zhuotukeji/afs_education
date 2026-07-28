import { NextResponse } from 'next/server'
import { searchContent } from '@/lib/search'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = (url.searchParams.get('q') || '').trim().replace(/\s+/g, ' ').slice(0, 80)
  const type = url.searchParams.get('type')
  const page = Math.max(1, Number(url.searchParams.get('page') || 1))
  if (query.length < 2) return NextResponse.json({ error: 'Query must contain 2-80 characters.', results: [] }, { status: 400 })
  const terms = query.toLowerCase().split(' ').filter((term) => term.length > 1)
  const matched = terms.length ? await searchContent(query, type) : []
  const pageSize = 12
  return NextResponse.json({ page, pageSize, query, total: matched.length, results: matched.slice((page - 1) * pageSize, page * pageSize) })
}
