import type { MetadataRoute } from 'next';
import { config } from '@/config';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${config.url}/sitemap.xml`,
	};
}
