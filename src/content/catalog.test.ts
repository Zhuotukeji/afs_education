import { describe, expect, it } from 'vitest'

import { allContent, contentByPath, contentCounts } from './catalog'

describe('content catalog', () => {
  it('contains the complete PRD inventory', () => {
    expect(allContent).toHaveLength(125)
    expect(contentCounts).toEqual({
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
    })
  })

  it('keeps all routes unique', () => {
    expect(contentByPath.size).toBe(allContent.length)
  })

  it('keeps every item above the publication threshold', () => {
    expect(allContent.every((item) => item.qualityScore >= 85 && item.sources.length >= 2)).toBe(true)
  })

  it('assigns licensed lead and inline visuals to every page', () => {
    expect(allContent.every((item) => item.visuals.lead.src && item.visuals.inline.src)).toBe(true)
    expect(allContent.every((item) => item.visuals.lead.alt !== item.title && item.visuals.inline.caption.length > 40)).toBe(true)
  })
})
