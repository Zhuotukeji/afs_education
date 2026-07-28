import type { CollectionConfig } from 'payload'
import { authenticated } from '@/lib/access'

function makeReferenceCollection(slug: 'careers' | 'credentials' | 'jurisdictions'): CollectionConfig {
  return {
    slug,
    access: { create: authenticated, delete: authenticated, read: () => true, update: authenticated },
    admin: { useAsTitle: 'name' },
    fields: [
      { name: 'name', type: 'text', required: true, unique: true },
      { name: 'slug', type: 'text', required: true, unique: true },
      { name: 'summary', type: 'textarea', required: true },
      { name: 'officialUrl', type: 'text' },
      { name: 'dataYear', type: 'number' },
    ],
  }
}

export const Careers = makeReferenceCollection('careers')
export const Credentials = makeReferenceCollection('credentials')
export const Jurisdictions = makeReferenceCollection('jurisdictions')
