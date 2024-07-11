import type { MetadataRoute } from 'next';
import { config } from '@/config';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: config.url,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${config.url}/about`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
	];
}
