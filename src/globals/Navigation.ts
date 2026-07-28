import type { GlobalConfig } from 'payload'
import { authenticated } from '@/lib/access'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: { read: () => true, update: authenticated },
  fields: [
    {
      name: 'items',
      type: 'array',
      maxRows: 9,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
