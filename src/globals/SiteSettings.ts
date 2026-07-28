import type { GlobalConfig } from 'payload'
import { authenticated } from '@/lib/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true, update: authenticated },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Career Path Brief', required: true },
    { name: 'operatorName', type: 'text', required: true },
    { name: 'contactEmail', type: 'email', required: true },
    { name: 'siteUrl', type: 'text', required: true },
    { name: 'defaultDescription', type: 'textarea', required: true },
    { name: 'googleSiteVerification', type: 'text' },
  ],
}
