import { allContent, contentCounts } from '../src/content/catalog'

const expectedCounts = {
  hub: 9,
  career: 36,
  credential: 18,
  comparison: 16,
  training: 12,
  'state-requirement': 10,
  skill: 8,
  'work-reality': 8,
  research: 4,
  tool: 4,
}

const errors: string[] = []
const seenPaths = new Set<string>()
const seenTitles = new Set<string>()
const seenSeoTitles = new Set<string>()
const bannedPhrases = [
  "in today's fast-paced",
  "whether you're just starting out",
  "it's important to note",
  'there are several factors to consider',
  'embarking on a rewarding career',
  'navigate the ever-changing landscape',
  'ultimately, the choice depends on your goals',
]

if (allContent.length !== 125) errors.push(`Expected 125 content pages, found ${allContent.length}.`)

for (const [type, expected] of Object.entries(expectedCounts)) {
  const actual = contentCounts[type as keyof typeof contentCounts]
  if (actual !== expected) errors.push(`Expected ${expected} ${type} pages, found ${actual}.`)
}

for (const item of allContent) {
  if (seenPaths.has(item.path)) errors.push(`Duplicate path: ${item.path}`)
  if (seenTitles.has(item.title)) errors.push(`Duplicate title: ${item.title}`)
  if (seenSeoTitles.has(item.seoTitle)) errors.push(`Duplicate SEO title: ${item.seoTitle}`)
  seenPaths.add(item.path)
  seenTitles.add(item.title)
  seenSeoTitles.add(item.seoTitle)

  if (item.sections.length < 4) errors.push(`${item.path} has fewer than four sections.`)
  if (item.sources.length < 2) errors.push(`${item.path} has fewer than two sources.`)
  if (item.qualityScore < 85) errors.push(`${item.path} fails the 85-point quality gate.`)
  if (!item.editorMemo || !item.originalEvidence) errors.push(`${item.path} lacks private editorial evidence.`)
  if (item.seoDescription.length < 80 || item.seoDescription.length > 180) {
    errors.push(`${item.path} SEO description length is ${item.seoDescription.length}.`)
  }
  const body = `${item.summary} ${item.sections.map((section) => `${section.heading} ${section.body}`).join(' ')}`
  const wordCount = body.trim().split(/\s+/).length
  if (wordCount < 250) errors.push(`${item.path} is too short at ${wordCount} words.`)
  for (const phrase of bannedPhrases) {
    if (body.toLowerCase().includes(phrase)) errors.push(`${item.path} contains banned phrase: ${phrase}`)
  }
  for (const citation of item.sources) {
    try {
      const url = new URL(citation.url)
      if (url.protocol !== 'https:') errors.push(`${item.path} source is not HTTPS: ${citation.url}`)
    } catch {
      errors.push(`${item.path} has invalid source URL: ${citation.url}`)
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Content audit passed: ${allContent.length} pages across 10 content types.`)
