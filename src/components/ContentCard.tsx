import { ArrowUpRight, Clock3 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { PublicContent } from '@/content/types'

export function ContentCard({ item }: { item: PublicContent }) {
  return (
    <article className="content-card">
      <Link className="content-card-media" href={item.path} aria-label={`Read ${item.title}`}>
        <Image alt={item.visuals.lead.alt} fill sizes="(max-width: 780px) 100vw, (max-width: 1050px) 50vw, 33vw" src={item.visuals.lead.src} />
      </Link>
      <div className="content-card-body">
        <div className="card-meta"><span>{item.contentType.replace('-', ' ')}</span><span><Clock3 size={14} /> Updated {item.updatedAt}</span></div>
        <h3><Link href={item.path}>{item.title}</Link></h3>
        <p>{item.summary}</p>
        <Link className="text-link" href={item.path}>Read the brief <ArrowUpRight size={15} /></Link>
      </div>
    </article>
  )
}
