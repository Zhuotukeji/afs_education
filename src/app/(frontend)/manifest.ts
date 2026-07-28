import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Career Path Brief', short_name: 'Career Brief', description: 'Source-backed career decisions.', start_url: '/', display: 'standalone', background_color: '#F7F8F5', theme_color: '#174C43', lang: 'en-US', icons: [{ src: '/icon', sizes: '64x64', type: 'image/png' }, { src: '/apple-icon', sizes: '180x180', type: 'image/png' }] }
}
