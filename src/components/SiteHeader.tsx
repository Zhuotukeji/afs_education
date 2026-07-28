import { Menu, Search } from 'lucide-react'
import Link from 'next/link'

const nav = [
  ['Careers', '/careers'], ['Credentials', '/certifications'], ['Compare', '/compare'],
  ['Training', '/training'], ['Work reality', '/work-reality'], ['Tools', '/tools'],
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Career Path Brief home">
          <span className="wordmark-mark" aria-hidden="true">CP</span>
          <span>Career Path Brief</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="icon-button" href="/search" aria-label="Search"><Search size={19} /></Link>
          <button className="icon-button mobile-menu" type="button" aria-label="Open navigation"><Menu size={20} /></button>
        </div>
      </div>
    </header>
  )
}
