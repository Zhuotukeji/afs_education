import type { CollectionConfig } from 'payload'
import { authenticated } from '@/lib/access'

export const Sources: CollectionConfig = {
  slug: 'sources',
  access: { create: authenticated, delete: authenticated, read: () => true, update: authenticated },
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'organization', type: 'text', required: true },
    { name: 'url', type: 'text', required: true, unique: true },
    { name: 'sourceType', type: 'select', options: ['federal', 'state', 'credential-body', 'research', 'other'] },
    { name: 'accessedAt', type: 'date', required: true },
    { name: 'notes', type: 'textarea' },
  ],
}
