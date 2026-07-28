import type { MetadataRoute } from 'next'
import { allContent } from '@/content/catalog'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const content = allContent.map((item) => ({ url: absoluteUrl(item.path), lastModified: new Date(item.updatedAt), changeFrequency: item.contentType === 'state-requirement' ? 'monthly' as const : 'yearly' as const, priority: item.contentType === 'hub' ? 0.85 : 0.7 }))
  const trust = ['/', '/about', '/privacy', '/terms', '/contact'].map((path) => ({ url: absoluteUrl(path), lastModified: new Date('2026-07-28'), changeFrequency: 'yearly' as const, priority: path === '/' ? 1 : 0.35 }))
  return [...trust, ...content]
}
