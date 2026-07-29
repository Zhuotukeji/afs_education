import { ArrowRight, BarChart3, BookOpenCheck, Search, Wrench } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContentCard } from '@/components/ContentCard'
import { JsonLd } from '@/components/JsonLd'
import { allContent } from '@/content/catalog'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Career Path Brief | Source-backed career decisions',
  description: 'Compare career paths, credentials, training choices, work conditions, and state requirements using primary sources and transparent methods.',
  alternates: { canonical: absoluteUrl('/') },
  openGraph: { title: 'Career Path Brief', description: 'Source-backed career decisions.', url: absoluteUrl('/'), images: ['/assets/hero-trades.jpg'] },
}

const featuredCareerSlugs = ['medical-assistant', 'electrician', 'automotive-service-technician', 'solar-photovoltaic-installer', 'network-support-specialist', 'project-coordinator']
const careers = featuredCareerSlugs.map((slug) => allContent.find((item) => item.slug === slug)!)
const reality = allContent.find((item) => item.slug === 'entry-level-it-interruption-work')!
const credential = allContent.find((item) => item.slug === 'epa-608')!
const tools = allContent.filter((item) => item.contentType === 'tool')
const freshReads = ['claims-adjusting-after-catastrophe', 'training-time-vs-entry-wage', 'avoid-training-scams'].map((slug) => allContent.find((item) => item.slug === slug)!)

export default function HomePage() {
  const organization = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Career Path Brief Editorial Team', url: absoluteUrl('/'), email: process.env.CONTACT_EMAIL || undefined }
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Career Path Brief', url: absoluteUrl('/'), inLanguage: 'en-US' }
  return <main>
    <JsonLd data={organization} /><JsonLd data={website} />
    <section className="home-hero">
      <Image alt="Technician reviewing equipment in an industrial workspace" src="/assets/hero-trades.jpg" fill priority sizes="100vw" />
      <div className="hero-scrim" />
      <div className="hero-content"><p className="eyebrow light">Career decisions, with the evidence left in</p><h1>Career Path Brief</h1><p>Research the work, the route in, the credential claims, and the tradeoffs before you pay for training.</p>
        <form className="hero-search" action="/search"><Search aria-hidden="true" size={20}/><input name="q" type="search" placeholder="Search a career, credential, or state requirement" minLength={2} maxLength={80} aria-label="Search the site"/><button type="submit">Search</button></form>
        <div className="hero-links"><Link href="/careers">Healthcare support</Link><Link href="/careers">Skilled trades</Link><Link href="/careers">Business & IT support</Link></div>
      </div>
    </section>

    <section className="page-band"><div className="band-inner"><div className="section-heading split"><div><p className="eyebrow">Career path explorer</p><h2>Start with the work, not the course</h2></div><Link className="text-link" href="/careers">Browse all 36 careers <ArrowRight size={16}/></Link></div><div className="card-grid">{careers.map((item) => <ContentCard key={item.path} item={item}/>)}</div></div></section>

    <section className="editorial-band"><div className="editorial-media"><Image alt="Clinical support staff working in a healthcare setting" src="/assets/healthcare-work.jpg" fill sizes="(max-width: 800px) 100vw, 50vw"/></div><div className="editorial-copy"><p className="eyebrow light">Editor&apos;s desk</p><h2>The parts of work a course page rarely shows</h2><p>Our Work Reality desk examines schedules, interruptions, physical demands, and decision pressure using public occupational evidence rather than invented testimonials.</p><Link className="button-link light-button" href={reality.path}>Read this week&apos;s dossier <ArrowRight size={16}/></Link></div></section>

    <section className="page-band paper"><div className="band-inner data-layout"><div><p className="eyebrow">Research desk</p><h2>A credential can be required, preferred, or simply marketed well.</h2><p className="large-copy">We keep those categories separate and link every conclusion back to the issuing body or regulator.</p><Link className="button-link" href={credential.path}>See the EPA 608 decision guide <ArrowRight size={16}/></Link></div><div className="data-figure" role="img" aria-label="Illustrative credential decision evidence ladder"><div className="chart-row"><span>Legal requirement</span><i style={{width:'88%'}}/></div><div className="chart-row"><span>Employer preference</span><i style={{width:'62%'}}/></div><div className="chart-row"><span>Optional signal</span><i style={{width:'38%'}}/></div><p><BarChart3 size={16}/> Classification is page-specific, not a universal score.</p></div></div></section>

    <section className="page-band"><div className="band-inner"><div className="section-heading split"><div><p className="eyebrow">Fresh from the desks</p><h2>Three decisions worth a closer look</h2></div><Link className="text-link" href="/research">Visit the research desk <ArrowRight size={16}/></Link></div><div className="card-grid">{freshReads.map((item) => <ContentCard key={item.path} item={item}/>)}</div></div></section>

    <section className="page-band paper"><div className="band-inner"><div className="section-heading"><p className="eyebrow">Planning tools</p><h2>Put your own constraints into the decision</h2></div><div className="tool-grid">{tools.map((tool, index) => <Link className="tool-card" href={tool.path} key={tool.path}>{index % 2 ? <BookOpenCheck/> : <Wrench/>}<span><strong>{tool.title}</strong><small>{tool.summary}</small></span><ArrowRight/></Link>)}</div></div></section>
  </main>
}
