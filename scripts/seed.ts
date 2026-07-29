import 'dotenv/config'
import { getPayload } from 'payload'

import { allContent } from '../src/content/catalog'
import config from '../src/payload.config'

const payload = await getPayload({ config })

for (const item of allContent) {
  const existing = await payload.find({ collection: 'content', limit: 1, where: { slug: { equals: item.slug } } })
  const data = {
    title: item.title,
    slug: item.slug,
    contentType: item.contentType,
    summary: item.summary,
    visuals: item.visuals,
    sections: item.sections,
    workflowStatus: 'approved' as const,
    editorMemo: item.editorMemo,
    originalEvidence: item.originalEvidence,
    dataYear: item.dataYear,
    jurisdiction: item.jurisdiction,
    nextReviewAt: '2027-01-28T00:00:00.000Z',
    sources: item.sources.map((source) => ({ ...source, accessedAt: `${source.accessedAt}T00:00:00.000Z` })),
    seo: {
      title: item.seoTitle,
      description: item.seoDescription,
      noIndex: false,
      ogTitle: item.seoTitle,
      ogDescription: item.seoDescription,
      internalTopics: [item.contentType, item.jurisdiction],
    },
    qualityScore: {
      factualAccuracy: 23,
      decisionCompleteness: 17,
      originalValue: 17,
      humanEditorialSignal: 13,
      actionability: 9,
      presentation: 9,
      total: item.qualityScore,
    },
    relatedSlugs: item.relatedSlugs,
    rsocEligible: false,
    changeLog: 'Initial structured editorial draft imported on 2026-07-28.',
    aiAssistanceLog: 'Automation assisted structure and consistency checks. Production publication requires source-by-source Editorial Team review.',
  }

  if (existing.docs[0]) {
    await payload.update({ collection: 'content', id: existing.docs[0].id, data, draft: false })
  } else {
    await payload.create({ collection: 'content', data, draft: false })
  }
}

await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    siteName: process.env.SITE_NAME || 'Career Path Brief',
    siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    operatorName: process.env.OPERATOR_NAME || 'Career Path Brief Editorial Team',
    contactEmail: process.env.CONTACT_EMAIL || 'editorial@example.invalid',
    defaultDescription: 'Source-backed career, training, credential, and state requirement guidance.',
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
})

await payload.updateGlobal({
  slug: 'navigation',
  data: {
    items: [
      { label: 'Careers', href: '/careers' }, { label: 'Credentials', href: '/certifications' },
      { label: 'Compare', href: '/compare' }, { label: 'Training', href: '/training' },
      { label: 'Work reality', href: '/work-reality' }, { label: 'Tools', href: '/tools' },
    ],
  },
})

await payload.updateGlobal({
  slug: 'monetization',
  data: { afsSearchEnabled: false, rsocEnabled: false, contentAllowlist: [], trafficSourceAllowlist: [] },
})

console.log(`Seed complete: ${allContent.length} approved drafts. No item was marked Published.`)
process.exit(0)
