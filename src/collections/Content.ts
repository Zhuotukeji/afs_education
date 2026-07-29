import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '@/lib/access'

const publicationGate: CollectionBeforeChangeHook = ({ data }) => {
  if (data.workflowStatus !== 'published') return data

  const score = data.qualityScore || {}
  const total = Number(score.total || 0)
  const facts = Number(score.factualAccuracy || 0)
  const originality = Number(score.originalValue || 0)
  const sources = Array.isArray(data.sources) ? data.sources : []

  if (total < 85 || facts < 23 || originality < 16) {
    throw new Error('Published content must pass the 85-point quality gate.')
  }
  if (!data.editorMemo || !data.originalEvidence || sources.length < 2) {
    throw new Error('Published content requires an editor memo, original evidence, and sources.')
  }
  data.publishedAt ||= new Date().toISOString()
  return data
}

export const Content: CollectionConfig = {
  slug: 'content',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'contentType', 'workflowStatus', 'updatedAt'],
    useAsTitle: 'title',
  },
  hooks: { beforeChange: [publicationGate] },
  versions: { drafts: true, maxPerDoc: 25 },
  fields: [
    { name: 'title', type: 'text', required: true, unique: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      index: true,
      options: [
        'hub',
        'career',
        'credential',
        'comparison',
        'training',
        'state-requirement',
        'skill',
        'work-reality',
        'research',
        'tool',
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    {
      name: 'visuals',
      type: 'group',
      fields: [
        {
          name: 'lead',
          type: 'group',
          fields: [
            { name: 'src', type: 'text', required: true },
            { name: 'alt', type: 'text', required: true },
            { name: 'caption', type: 'textarea', required: true },
            { name: 'credit', type: 'text', required: true },
            { name: 'sourceUrl', type: 'text', required: true },
            { name: 'licenseName', type: 'text', required: true },
            { name: 'licenseUrl', type: 'text', required: true },
          ],
        },
        {
          name: 'inline',
          type: 'group',
          fields: [
            { name: 'src', type: 'text', required: true },
            { name: 'alt', type: 'text', required: true },
            { name: 'caption', type: 'textarea', required: true },
            { name: 'credit', type: 'text', required: true },
            { name: 'sourceUrl', type: 'text', required: true },
            { name: 'licenseName', type: 'text', required: true },
            { name: 'licenseUrl', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      minRows: 3,
      required: true,
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'workflowStatus',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      index: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Research checked', value: 'research-checked' },
        { label: 'Fact checked', value: 'fact-checked' },
        { label: 'Copy edited', value: 'copy-edited' },
        { label: 'Approved', value: 'approved' },
        { label: 'Published', value: 'published' },
      ],
    },
    { name: 'editorMemo', type: 'textarea', required: true, access: { read: ({ req }) => Boolean(req.user) } },
    { name: 'originalEvidence', type: 'textarea', required: true },
    { name: 'dataYear', type: 'number' },
    { name: 'jurisdiction', type: 'text', defaultValue: 'United States' },
    { name: 'publishedAt', type: 'date' },
    { name: 'nextReviewAt', type: 'date', required: true },
    {
      name: 'sources',
      type: 'array',
      minRows: 2,
      required: true,
      fields: [
        { name: 'organization', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'accessedAt', type: 'date', required: true },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'canonicalOverride', type: 'text' },
        { name: 'noIndex', type: 'checkbox', defaultValue: false },
        { name: 'ogTitle', type: 'text' },
        { name: 'ogDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
        { name: 'internalTopics', type: 'text', hasMany: true },
      ],
    },
    {
      name: 'qualityScore',
      type: 'group',
      fields: [
        { name: 'factualAccuracy', type: 'number', required: true, min: 0, max: 25 },
        { name: 'decisionCompleteness', type: 'number', required: true, min: 0, max: 20 },
        { name: 'originalValue', type: 'number', required: true, min: 0, max: 20 },
        { name: 'humanEditorialSignal', type: 'number', required: true, min: 0, max: 15 },
        { name: 'actionability', type: 'number', required: true, min: 0, max: 10 },
        { name: 'presentation', type: 'number', required: true, min: 0, max: 10 },
        { name: 'total', type: 'number', required: true, min: 0, max: 100 },
      ],
    },
    { name: 'relatedSlugs', type: 'text', hasMany: true },
    { name: 'rsocEligible', type: 'checkbox', defaultValue: false },
    { name: 'changeLog', type: 'textarea' },
    { name: 'aiAssistanceLog', type: 'textarea', access: { read: ({ req }) => Boolean(req.user) } },
  ],
}
