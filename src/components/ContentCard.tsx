import { ArrowUpRight, Clock3 } from 'lucide-react'
import Link from 'next/link'
import type { PublicContent } from '@/content/types'

export function ContentCard({ item }: { item: PublicContent }) {
  return (
    <article className="content-card">
      <div className="card-meta"><span>{item.contentType.replace('-', ' ')}</span><span><Clock3 size={14} /> Updated {item.updatedAt}</span></div>
      <h3><Link href={item.path}>{item.title}</Link></h3>
      <p>{item.summary}</p>
      <Link className="text-link" href={item.path}>Read the brief <ArrowUpRight size={15} /></Link>
    </article>
  )
}
