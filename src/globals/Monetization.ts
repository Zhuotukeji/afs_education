import type { GlobalConfig } from 'payload'
import { adminsOnly } from '@/lib/access'

export const Monetization: GlobalConfig = {
  slug: 'monetization',
  access: { read: adminsOnly, update: adminsOnly },
  fields: [
    { name: 'afsSearchEnabled', type: 'checkbox', defaultValue: false },
    { name: 'rsocEnabled', type: 'checkbox', defaultValue: false },
    { name: 'publisherId', type: 'text' },
    { name: 'searchStyleId', type: 'text' },
    { name: 'rsocStyleId', type: 'text' },
    { name: 'contentAllowlist', type: 'text', hasMany: true },
    { name: 'trafficSourceAllowlist', type: 'text', hasMany: true },
    { name: 'adsTxtLine', type: 'text' },
  ],
}
