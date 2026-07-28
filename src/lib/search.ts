import postgres from 'postgres'
import { allContent } from '@/content/catalog'

export interface SearchResult { contentType: string; path: string; summary: string; title: string; updatedAt: string }

function staticSearch(query: string, type?: string | null): SearchResult[] {
  const terms = query.toLowerCase().split(' ').filter((term) => term.length > 1)
  return allContent.filter((item) => (!type || item.contentType === type) && terms.every((term) => `${item.title} ${item.summary} ${item.sections.map((section) => section.heading).join(' ')} ${item.jurisdiction}`.toLowerCase().includes(term))).map(({ contentType, path, summary, title, updatedAt }) => ({ contentType, path, summary, title, updatedAt }))
}

export async function searchContent(query: string, type?: string | null): Promise<SearchResult[]> {
  if (process.env.SEARCH_DB_ENABLED !== 'true' || !process.env.DATABASE_URL) return staticSearch(query, type)
  const sql = postgres(process.env.DATABASE_URL, { max: 2, idle_timeout: 5 })
  try {
    const rows = await sql<SearchResult[]>`
      SELECT content_type AS "contentType", path, summary, title, updated_at AS "updatedAt"
      FROM content_search
      WHERE search_vector @@ websearch_to_tsquery('english', ${query})
        AND (${type || null}::text IS NULL OR content_type = ${type || null})
      ORDER BY ts_rank(search_vector, websearch_to_tsquery('english', ${query})) DESC, title ASC
      LIMIT 120
    `
    return rows
  } catch (error) {
    console.error('PostgreSQL search failed; using the immutable catalog fallback.', error)
    return staticSearch(query, type)
  } finally {
    await sql.end({ timeout: 1 })
  }
}
