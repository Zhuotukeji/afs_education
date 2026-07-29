import type { Metadata } from 'next'

import type { PublicContent } from '@/content/types'
import { getSiteConfig } from './env'

export function absoluteUrl(path: string) {
  const { url } = getSiteConfig()
  return `${url}${path.startsWith('/') ? path : `/${path}`}`
}

export function metadataForContent(item: PublicContent): Metadata {
  const site = getSiteConfig()
  const canonical = absoluteUrl(item.path)
  const ogImage = absoluteUrl(`/og/${item.contentType}/${item.slug}`)

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    alternates: { canonical },
    authors: [{ name: 'Career Path Brief Editorial Team', url: absoluteUrl('/about') }],
    category: item.contentType,
    creator: 'Career Path Brief Editorial Team',
    publisher: site.operatorName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      siteName: site.name,
      title: item.seoTitle,
      description: item.seoDescription,
      url: canonical,
      publishedTime: item.updatedAt,
      modifiedTime: item.updatedAt,
      section: item.contentType,
      authors: ['Career Path Brief Editorial Team'],
      images: [{ url: ogImage, width: 1200, height: 630, alt: item.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.seoTitle,
      description: item.seoDescription,
      images: [{ url: ogImage, alt: item.title }],
    },
    other: {
      'article:published_time': item.updatedAt,
      'article:modified_time': item.updatedAt,
      'article:section': item.contentType,
      'content-language': 'en-US',
    },
  }
}

export function schemaForContent(item: PublicContent) {
  const site = getSiteConfig()
  const url = absoluteUrl(item.path)
  const shared = {
    '@context': 'https://schema.org',
    '@id': `${url}#content`,
    headline: item.title,
    description: item.summary,
    url,
    inLanguage: 'en-US',
    datePublished: item.updatedAt,
    dateModified: item.updatedAt,
    author: { '@type': 'Organization', name: 'Career Path Brief Editorial Team', url: absoluteUrl('/about') },
    publisher: { '@type': 'Organization', name: site.operatorName, url: site.url },
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(item.visuals.lead.src),
      caption: item.visuals.lead.caption,
      creditText: item.visuals.lead.credit,
      license: item.visuals.lead.licenseUrl,
      acquireLicensePage: item.visuals.lead.sourceUrl,
    },
    citation: item.sources.map((source) => source.url),
    spatialCoverage: item.jurisdiction,
  }

  if (item.contentType === 'research') {
    return { ...shared, '@type': 'Dataset', name: item.title, temporalCoverage: String(item.dataYear), measurementTechnique: item.originalEvidence }
  }
  if (item.contentType === 'tool') {
    return { ...shared, '@type': 'SoftwareApplication', name: item.title, applicationCategory: 'EducationalApplication', operatingSystem: 'Web' }
  }
  if (item.contentType === 'career') {
    return { ...shared, '@type': ['Article', 'Occupation'], name: item.title, occupationalCategory: item.slug }
  }
  if (item.contentType === 'hub') {
    return { ...shared, '@type': 'CollectionPage', name: item.title }
  }
  return { ...shared, '@type': 'Article' }
}

export function breadcrumbSchema(item: PublicContent) {
  const segments = item.path.split('/').filter(Boolean)
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') }]
  if (segments.length > 1) {
    const hub = `/${segments[0]}`
    items.push({ '@type': 'ListItem', position: 2, name: segments[0].replaceAll('-', ' '), item: absoluteUrl(hub) })
  }
  items.push({ '@type': 'ListItem', position: items.length + 1, name: item.title, item: absoluteUrl(item.path) })
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}
