'use server';

import type { Metadata } from 'next';
import { FULL_NAME, SITE_URL } from '@/config/constants';

import db from '@/db';
import postsTable, { type Post } from '@/db/schema/posts';
import { eq } from 'drizzle-orm';

import { notFound } from 'next/navigation';

import Link from 'next/link';
import Transition from '@/components/transition';
import MDXBody from '@/components/mdx-body';

export async function generateStaticParams() {
  return await db
    .select({
      slug: postsTable.slug
    })
    .from(postsTable);
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
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

  if (!post) return {};

  return {
    title: post.title,
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/posts/${params.slug}`,
      siteName: `${post.title} - ${FULL_NAME}`,
      title: post.title,
      description: post.description
    }
  };
}

export default async function Post({
  params: { slug }
}: {
  params: { slug: string };
}) {
  const post = (
    await db
      .select({
        slug: postsTable.content,
        content: postsTable.content,
        created_at: postsTable.created_at,
        visible: postsTable.visible
      })
      .from(postsTable)
      .where(eq(postsTable.slug, slug))
      .limit(1)
  )?.[0];

  if (!post || !post.visible) return notFound();

  return (
    <Transition className="p-4 font-sans">
      {/* TODO: maybe make sticky 'sticky top-10 z-50' ??? need an idea for a background tho ... */}
      <section className="mb-6 mt-2 flex items-center gap-2">
        <Link
          aria-label="Posts"
          href="/posts"
          className="text-sm transition-colors hover:text-muted-foreground"
        >
          Go Back
        </Link>
        <div className="flex-grow border border-dashed" />
        <h3 className="text-sm text-muted-foreground">
          {new Date(Date.parse(post.created_at)).toLocaleDateString()}
        </h3>
      </section>
      <MDXBody>{post.content}</MDXBody>
    </Transition>
  );
}
