import type { CollectionConfig } from 'payload'
import { authenticated } from '@/lib/access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { create: authenticated, delete: authenticated, read: () => true, update: authenticated },
  admin: { useAsTitle: 'alt' },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'credit', type: 'text', required: true },
    { name: 'licenseName', type: 'text', required: true },
    { name: 'licenseUrl', type: 'text', required: true },
    { name: 'sourceUrl', type: 'text', required: true },
  ],
  upload: {
    imageSizes: [
      { name: 'card', width: 720, height: 480, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  },
}
