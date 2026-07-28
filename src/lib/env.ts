import { z } from 'zod'

const productionSchema = z.object({
  CONTACT_EMAIL: z.string().email().refine((value) => !value.endsWith('.invalid')),
  DATABASE_URL: z.string().url(),
  OPERATOR_NAME: z.string().min(2),
  PAYLOAD_SECRET: z.string().min(32),
  SITE_URL: z.string().url().refine((value) => value.startsWith('https://')),
})

export function assertProductionEnvironment() {
  if (process.env.NODE_ENV === 'production') {
    return productionSchema.parse(process.env)
  }
  return null
}

export function getSiteConfig() {
  return {
    contactEmail: process.env.CONTACT_EMAIL || 'editorial@example.invalid',
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
    name: process.env.SITE_NAME || 'Career Path Brief',
    operatorName: process.env.OPERATOR_NAME || 'Career Path Brief Editorial Team',
    url: (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  }
}
