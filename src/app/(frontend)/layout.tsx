import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/source-serif-4/600.css'
import '@fontsource/ibm-plex-mono/500.css'
import type { Metadata, Viewport } from 'next'
import React from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getSiteConfig } from '@/lib/env'
import './styles.css'

const site = getSiteConfig()

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Career Path Brief', template: '%s | Career Path Brief' },
  description: 'Source-backed career, training, credential, and state requirement guidance for practical career decisions.',
  applicationName: 'Career Path Brief',
  creator: 'Career Path Brief Editorial Team',
  publisher: site.operatorName,
  manifest: '/manifest.webmanifest',
  verification: site.googleSiteVerification ? { google: site.googleSiteVerification } : undefined,
  icons: { icon: '/icon', apple: '/apple-icon' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#174C43', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-US"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><div id="main-content">{children}</div><SiteFooter /></body></html>
}
