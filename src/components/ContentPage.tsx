import { ArrowRight, CalendarDays, CheckCircle2, ExternalLink, MapPin, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

import { allContent, contentBySlug } from '@/content/catalog'
import type { PublicContent } from '@/content/types'
import { breadcrumbSchema, schemaForContent } from '@/lib/seo'
import { ContentCard } from './ContentCard'
import { RelatedSearchUnit } from './AfsUnit'
import { JsonLd } from './JsonLd'

function titleCase(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export function ContentPage({ item }: { item: PublicContent }) {
  const pathParts = item.path.split('/').filter(Boolean)
  const hubItems = item.contentType === 'hub' ? allContent.filter((entry) => entry.path.startsWith(`${item.path}/`)).slice(0, 18) : []
  const related = item.relatedSlugs.map((slug) => contentBySlug.get(slug)).filter((entry): entry is PublicContent => Boolean(entry)).slice(0, 4)
  const rsocAllowlist = (process.env.RSOC_CONTENT_ALLOWLIST || '').split(',').map((value) => value.trim()).filter(Boolean)
  const showRsoc = process.env.RSOC_ENABLED === 'true' && rsocAllowlist.includes(item.slug) && Boolean(process.env.AFS_PUBLISHER_ID && process.env.RSOC_STYLE_ID)

  return (
    <>
      <JsonLd data={schemaForContent(item)} />
      <JsonLd data={breadcrumbSchema(item)} />
      <main>
        <div className="article-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            {pathParts.length > 1 && <><Link href={`/${pathParts[0]}`}>{titleCase(pathParts[0])}</Link><span>/</span></>}
            <span aria-current="page">{item.title}</span>
          </nav>
          <header className="article-header">
            <p className="eyebrow">{titleCase(item.contentType)}</p>
            <h1>{item.title}</h1>
            <p className="article-dek">{item.summary}</p>
            <div className="byline"><span>By Career Path Brief Editorial Team</span><span>Reviewed {item.updatedAt}</span></div>
          </header>
          <div className="fact-strip">
            <div><CalendarDays size={18} /><span><strong>Data year</strong>{item.dataYear}</span></div>
            <div><MapPin size={18} /><span><strong>Coverage</strong>{item.jurisdiction}</span></div>
            <div><ShieldCheck size={18} /><span><strong>Source standard</strong>{item.sources.length} primary references</span></div>
            <div><CheckCircle2 size={18} /><span><strong>Editorial score</strong>{item.qualityScore}/100</span></div>
          </div>

          {item.contentType === 'hub' ? (
            <section className="hub-content">
              <div className="prose intro-prose">{item.sections.slice(0, 2).map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</div>
              <div className="section-heading"><p className="eyebrow">Browse the desk</p><h2>Recently reviewed briefs</h2></div>
              <div className="card-grid">{hubItems.map((entry) => <ContentCard item={entry} key={entry.path} />)}</div>
            </section>
          ) : (
            <div className="article-layout">
              <aside className="toc" aria-label="On this page"><p>On this page</p>{item.sections.map((section, index) => <a href={`#section-${index}`} key={section.heading}>{section.heading}</a>)}</aside>
              <article className="prose">
                {item.sections.map((section, index) => <section id={`section-${index}`} key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p>{index === 1 && <div className="reality-note"><strong>Editorial check</strong><span>{item.originalEvidence}</span></div>}</section>)}
              </article>
              <aside className="evidence-rail">
                <p className="rail-title">Evidence file</p>
                <p>Claims are scoped to the source and access date shown below.</p>
                <Link className="tool-prompt" href="/tools/program-evaluation-checklist">Open a planning tool <ArrowRight size={15} /></Link>
              </aside>
            </div>
          )}

          <section className="sources-section">
            <p className="eyebrow">Source file</p><h2>Primary references</h2>
            <ol>{item.sources.map((citation) => <li key={citation.url}><div><strong>{citation.organization}</strong><span>{citation.title} · accessed {citation.accessedAt}</span></div><a href={citation.url} target="_blank" rel="noopener noreferrer" aria-label={`Open source: ${citation.title}`}><ExternalLink size={17} /></a></li>)}</ol>
          </section>
          {showRsoc && <div className="sources-section"><RelatedSearchUnit publisherId={process.env.AFS_PUBLISHER_ID!} styleId={process.env.RSOC_STYLE_ID!}/></div>}
          {related.length > 0 && <section className="related-section"><div className="section-heading"><p className="eyebrow">Continue the decision</p><h2>Related briefs</h2></div><div className="card-grid">{related.map((entry) => <ContentCard item={entry} key={entry.path} />)}</div></section>}
        </div>
      </main>
    </>
  )
}
