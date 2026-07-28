export type ContentType =
  | 'hub'
  | 'career'
  | 'credential'
  | 'comparison'
  | 'training'
  | 'state-requirement'
  | 'skill'
  | 'work-reality'
  | 'research'
  | 'tool'

export interface SourceCitation {
  accessedAt: string
  organization: string
  title: string
  url: string
}

export interface ContentSection {
  body: string
  heading: string
}

export interface PublicContent {
  contentType: ContentType
  dataYear: number
  editorMemo: string
  jurisdiction: string
  originalEvidence: string
  path: string
  qualityScore: number
  relatedSlugs: string[]
  sections: ContentSection[]
  seoDescription: string
  seoTitle: string
  slug: string
  sources: SourceCitation[]
  summary: string
  title: string
  updatedAt: string
}
