'use server';

import db from '@/db';
import posts, { type Post } from '@/db/schema/posts';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getPostBySlug(slug: string) {
  return (
    await db.select().from(posts).where(eq(posts.slug, slug)).limit(1)
  )[0];
}

export async function deletePost(
  slug: string,
  secret: string
): Promise<boolean> {
  if (secret !== process.env.POST_ADMIN_SECRET) {
    return false;
  }

  const res = await db.delete(posts).where(eq(posts.slug, slug));

  revalidatePath('/posts');

  return typeof res.rowCount === 'number' && res.rowCount > 0;
}

export async function createOrEditPost(
  post: Omit<Omit<Post, 'visible'>, 'created_at'>,
  secret: string
): Promise<{ message: string } | undefined> {
  if (secret !== process.env.POST_ADMIN_SECRET) {
    return {
      message: 'Invalid secret'
    };
  }

  const existing = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.slug, post.slug))
    .limit(1);

  if (existing.length && existing[0]?.slug === post.slug) {
    await db
      .update(posts)
      .set({
        ...post,
        updated_at: new Date().toISOString()
      })
      .where(eq(posts.slug, post.slug));
  } else {
    await db.insert(posts).values({
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      visible: true
    });
  }

  revalidatePath('/posts');
  revalidatePath(`/posts/${post.slug}`);

  return;
}

export default createOrEditPost;
