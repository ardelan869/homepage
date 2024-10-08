import type { MetadataRoute } from 'next';

import db from '@/db';
import postsTable from '@/db/schema/posts';

export default async function sitemap({}: {
  slug: string;
}): Promise<MetadataRoute.Sitemap> {
  const posts = await db
    .select({ slug: postsTable.slug, updated_at: postsTable.updated_at })
    .from(postsTable);

  return posts.map((post) => ({
    url: `/posts/${post.slug}`,
    lastModified: new Date(Date.parse(post.updated_at))
  }));
}
