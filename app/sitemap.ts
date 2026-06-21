import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://paisarupay.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/apply-for-loan`,
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/banker-partnership`,
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/free-consultation`,
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/refer-n-earn`,
      lastModified: new Date('2026-06-22'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date('2026-06-22'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
