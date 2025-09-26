import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maydiv.com'

  const routes = [
    '',
    '/about',
    '/projects',
    '/contact',
    '/apps',
    '/apps/ui-ux',
    '/web-development',
    '/app-development',
    '/ai',
    '/testimonials',
    '/seo-demo',
    '/seo-test',
    '/marketing',
    '/blog',
    '/career',
  ]

  const now = new Date().toISOString()

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))
}


