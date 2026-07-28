'use client'

import Script from 'next/script'
import { useEffect, useId, useState } from 'react'

declare global {
  interface Window { _googCsa?: (kind: 'ads' | 'relatedsearch', options: Record<string, unknown>, block: Record<string, unknown>) => void }
}

type SharedProps = { publisherId: string; styleId: string }

export function AfsSearchUnit({ publisherId, query, resultCount, styleId }: SharedProps & { query: string; resultCount: number }) {
  const reactId = useId().replace(/:/g, '')
  const container = `afs-search-${reactId}`
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded || !window._googCsa || query.length < 2 || resultCount < 1) return
    window._googCsa('ads', { pubId: publisherId, query, styleId, linkTarget: '_blank' }, { container })
  }, [container, loaded, publisherId, query, resultCount, styleId])

  if (query.length < 2 || resultCount < 1) return null
  return <section className="afs-slot" aria-label="Sponsored search results"><Script src="https://www.google.com/adsense/search/ads.js" strategy="afterInteractive" onLoad={() => setLoaded(true)}/><div id={container}/></section>
}

export function RelatedSearchUnit({ publisherId, styleId }: SharedProps) {
  const reactId = useId().replace(/:/g, '')
  const container = `rsoc-${reactId}`
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded || !window._googCsa) return
    const creative = new URLSearchParams(window.location.search).get('referrerAdCreative')
    const options: Record<string, unknown> = { pubId: publisherId, styleId, relatedSearchTargeting: 'content' }
    if (creative) options.referrerAdCreative = creative
    window._googCsa('relatedsearch', options, { container })
  }, [container, loaded, publisherId, styleId])

  return <section className="afs-slot related-search-slot" aria-label="Related searches"><Script src="https://www.google.com/adsense/search/ads.js" strategy="afterInteractive" onLoad={() => setLoaded(true)}/><div id={container}/></section>
}
