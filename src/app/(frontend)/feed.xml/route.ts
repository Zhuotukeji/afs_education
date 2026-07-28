import { allContent } from '@/content/catalog'
import { absoluteUrl } from '@/lib/seo'

function escapeXml(value: string) { return value.replace(/[<>&'"]/g, (char) => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', "'":'&apos;', '"':'&quot;' }[char]!)) }

export function GET() {
  const items = allContent.filter((item) => item.contentType !== 'hub' && item.contentType !== 'tool').slice(-30).reverse().map((item) => `<item><title>${escapeXml(item.title)}</title><link>${absoluteUrl(item.path)}</link><guid>${absoluteUrl(item.path)}</guid><pubDate>${new Date(item.updatedAt).toUTCString()}</pubDate><description>${escapeXml(item.summary)}</description></item>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Career Path Brief</title><link>${absoluteUrl('/')}</link><description>Source-backed career decisions.</description><language>en-us</language>${items}</channel></rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
