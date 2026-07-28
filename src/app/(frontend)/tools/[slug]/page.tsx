import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContentPage } from '@/components/ContentPage'
import { ToolWorkbench } from '@/components/ToolWorkbench'
import { allContent, contentByPath } from '@/content/catalog'
import { metadataForContent } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = contentByPath.get(`/tools/${slug}`)
  return item ? metadataForContent(item) : { title: 'Tool not found', robots: { index: false } }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const item = contentByPath.get(`/tools/${slug}`)
  if (!item || item.contentType !== 'tool') notFound()
  const careers = allContent.filter((entry) => entry.contentType === 'career').map((entry) => ({ name: entry.title.replace('How to Become a ', ''), slug: entry.slug, summary: entry.summary }))
  const states = allContent.filter((entry) => entry.contentType === 'state-requirement').map((entry) => ({ jurisdiction: entry.jurisdiction, path: entry.path, title: entry.title }))
  return <><ContentPage item={item}/><div className="article-shell tool-embed"><ToolWorkbench slug={slug} careers={careers} states={states}/></div></>
}
