const required = ['SITE_HOST', 'SITE_URL', 'OPERATOR_NAME', 'CONTACT_EMAIL', 'DATABASE_URL', 'PAYLOAD_SECRET']
const missing = required.filter((name) => !process.env[name]?.trim())
const errors = [...missing.map((name) => `${name} is required.`)]

if (process.env.SITE_URL && (!process.env.SITE_URL.startsWith('https://') || process.env.SITE_URL.includes('localhost'))) {
  errors.push('SITE_URL must be the final HTTPS production URL.')
}
if (process.env.CONTACT_EMAIL?.endsWith('.invalid')) errors.push('CONTACT_EMAIL cannot use the .invalid placeholder domain.')
if ((process.env.PAYLOAD_SECRET || '').length < 32) errors.push('PAYLOAD_SECRET must contain at least 32 characters.')
if (process.env.CONTENT_APPROVED !== 'true') errors.push('CONTENT_APPROVED must be true after Editorial Team review.')

if (errors.length) {
  console.error(`Production environment is blocked:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log('Production environment validation passed.')
