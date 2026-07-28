import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const isProductionReady = process.env.NODE_ENV === 'production' && process.env.SITE_URL?.startsWith('https://') && !process.env.SITE_URL.includes('localhost')
  return {
    rules: isProductionReady
      ? { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/search', '/preview/'] }
      : { userAgent: '*', disallow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
