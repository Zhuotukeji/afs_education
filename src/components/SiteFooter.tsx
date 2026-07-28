import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="footer-brand">Career Path Brief</p>
          <p className="footer-copy">Source-backed career decisions without job guarantees, paid rankings, or lead forms.</p>
        </div>
        <div><p className="footer-label">Explore</p><Link href="/careers">Career guides</Link><Link href="/certifications">Credentials</Link><Link href="/tools">Planning tools</Link></div>
        <div><p className="footer-label">Editorial</p><Link href="/work-reality">Work reality</Link><Link href="/research">Research desk</Link><Link href="/about">Our method</Link></div>
        <div><p className="footer-label">Policies</p><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Career Path Brief</span><span>General educational information. Not legal, financial, or employment advice.</span></div>
    </footer>
  )
}
