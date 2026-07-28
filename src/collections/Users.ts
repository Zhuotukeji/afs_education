import type { CollectionConfig } from 'payload'

import { adminsOnly, authenticated } from '@/lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: adminsOnly,
    delete: adminsOnly,
    read: authenticated,
    update: authenticated,
  },
  admin: { useAsTitle: 'email' },
  auth: {
    lockTime: 15 * 60 * 1000,
    maxLoginAttempts: 5,
    tokenExpiration: 60 * 60 * 8,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      defaultValue: 'author',
      required: true,
      options: ['admin', 'editor', 'reviewer', 'author'],
    },
    { name: 'displayName', type: 'text', required: true },
    { name: 'totpEnabled', type: 'checkbox', defaultValue: false, access: { read: ({ req }) => Boolean(req.user) } },
    { name: 'totpSecretEncrypted', type: 'text', hidden: true, access: { read: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin' } },
    { name: 'recoveryCodeHashes', type: 'text', hasMany: true, hidden: true, access: { read: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin' } },
  ],
}
