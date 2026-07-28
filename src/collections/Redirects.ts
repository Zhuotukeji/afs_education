import type { CollectionConfig } from 'payload'
import { authenticated } from '@/lib/access'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  access: { create: authenticated, delete: authenticated, read: () => true, update: authenticated },
  fields: [
    { name: 'from', type: 'text', required: true, unique: true },
    { name: 'to', type: 'text', required: true },
    { name: 'permanent', type: 'checkbox', defaultValue: true },
  ],
}
