import { Search } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { ContentCard } from '@/components/ContentCard'
import { AfsSearchUnit } from '@/components/AfsUnit'
import { allContent } from '@/content/catalog'

export const metadata: Metadata = { title: 'Search', description: 'Search Career Path Brief.', robots: { index: false, follow: true } }

function normalize(value: unknown) { return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, 80) : '' }

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = normalize((await searchParams).q)
  const terms = query.toLowerCase().split(' ').filter((term) => term.length > 1)
  const results = query.length >= 2 ? allContent.filter((item) => terms.every((term) => `${item.title} ${item.summary} ${item.contentType} ${item.jurisdiction}`.toLowerCase().includes(term))).slice(0, 24) : []
  const afsEnabled = process.env.AFS_ENABLED === 'true' && Boolean(process.env.AFS_PUBLISHER_ID && process.env.AFS_SEARCH_STYLE_ID)
  return <main className="search-page"><div className="article-shell"><header className="search-heading"><p className="eyebrow">Site search</p><h1>Find the decision, not an ad-shaped answer</h1><form className="page-search" action="/search"><Search/><input name="q" defaultValue={query} minLength={2} maxLength={80} type="search" placeholder="Career, credential, state, or training question" aria-label="Search query"/><button type="submit">Search</button></form></header>{query.length >= 2 && <div className="search-status"><strong>{results.length}</strong> results for &quot;{query}&quot;</div>}{afsEnabled && <AfsSearchUnit publisherId={process.env.AFS_PUBLISHER_ID!} styleId={process.env.AFS_SEARCH_STYLE_ID!} query={query} resultCount={results.length}/>} {query.length >= 2 && results.length > 0 && <div className="card-grid">{results.map((item) => <ContentCard item={item} key={item.path}/>)}</div>}{query.length >= 2 && results.length === 0 && <div className="empty-state"><h2>No matching brief yet</h2><p>Try the occupation title rather than a school name, or browse the editorial desks below.</p><div><Link href="/careers">Career guides</Link><Link href="/certifications">Credential guides</Link><Link href="/tools">Planning tools</Link></div></div>}</div></main>
}
