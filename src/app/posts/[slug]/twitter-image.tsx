import db from '@/db';
import postsTable from '@/db/schema/posts';
import { eq } from 'drizzle-orm';

import OGImage from '@/components/og-image';

import { FULL_NAME } from '@/config/constants';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = (
    await db
      .select({
        title: postsTable.title,
        description: postsTable.description
      })
      .from(postsTable)
      .where(eq(postsTable.slug, params.slug))
      .limit(1)
  )?.[0];

  return OGImage({
    title: post?.title ?? FULL_NAME,
    description: post?.description
  });
}
