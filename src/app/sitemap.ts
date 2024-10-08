import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily'
    },
    {
      url: `${SITE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: 'monthly'
    },
    {
      url: `${SITE_URL}/editor`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    }
  ];
}
