import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { ContentPage } from '@/components/ContentPage'
import { contentByPath } from '@/content/catalog'
import { trustPages } from '@/content/trust'
import { absoluteUrl, metadataForContent } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ segments: string[] }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params
  const path = `/${segments.join('/')}`
  const item = contentByPath.get(path)
  if (item) return metadataForContent(item)
  const trust = trustPages[segments.join('/')]
  if (trust) return { title: trust.title, description: trust.description, alternates: { canonical: absoluteUrl(path) } }
  return { title: 'Page not found', robots: { index: false, follow: true } }
}

export default async function CatchAllPage({ params }: Props) {
  const { segments } = await params
  const path = `/${segments.join('/')}`
  const item = contentByPath.get(path)
  if (item) return <ContentPage item={item}/>
  const trust = trustPages[segments.join('/')]
  if (!trust) notFound()
  return <main className="trust-page"><div className="article-shell"><nav className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{trust.title}</span></nav><header className="article-header"><p className="eyebrow">Editorial policy</p><h1>{trust.title}</h1><p className="article-dek">{trust.description}</p></header><article className="prose trust-prose">{trust.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</article></div></main>
}
