import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Content } from './collections/Content'
import { Media } from './collections/Media'
import { Redirects } from './collections/Redirects'
import { Sources } from './collections/Sources'
import { Careers, Credentials, Jurisdictions } from './collections/Taxonomy'
import { Users } from './collections/Users'
import { Monetization } from './globals/Monetization'
import { Navigation } from './globals/Navigation'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: { titleSuffix: ' - Career Path Brief' },
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Content, Sources, Careers, Credentials, Jurisdictions, Redirects],
  cors: [process.env.SITE_URL || 'http://localhost:3000'],
  csrf: [process.env.SITE_URL || 'http://localhost:3000'],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || 'postgresql://careerpath:careerpath@localhost:5432/careerpath' },
    push: process.env.NODE_ENV !== 'production' || process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings, Navigation, Monetization],
  secret: process.env.PAYLOAD_SECRET || 'development-secret-must-not-be-used-in-production',
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
