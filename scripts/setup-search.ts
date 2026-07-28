import 'dotenv/config'
import postgres from 'postgres'
import { allContent } from '../src/content/catalog'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.')
const sql = postgres(process.env.DATABASE_URL, { max: 1 })

await sql`
  CREATE TABLE IF NOT EXISTS content_search (
    path text PRIMARY KEY,
    title text NOT NULL,
    summary text NOT NULL,
    content_type text NOT NULL,
    updated_at date NOT NULL,
    body text NOT NULL,
    search_vector tsvector GENERATED ALWAYS AS (
      setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
      setweight(to_tsvector('english', coalesce(body, '')), 'C')
    ) STORED
  )
`
await sql`CREATE INDEX IF NOT EXISTS content_search_vector_idx ON content_search USING GIN (search_vector)`

for (const item of allContent) {
  const body = item.sections.map((section) => `${section.heading} ${section.body}`).join(' ')
  await sql`
    INSERT INTO content_search (path, title, summary, content_type, updated_at, body)
    VALUES (${item.path}, ${item.title}, ${item.summary}, ${item.contentType}, ${item.updatedAt}, ${body})
    ON CONFLICT (path) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary,
      content_type = EXCLUDED.content_type, updated_at = EXCLUDED.updated_at, body = EXCLUDED.body
  `
}

await sql.end()
console.log(`PostgreSQL search index contains ${allContent.length} documents.`)
