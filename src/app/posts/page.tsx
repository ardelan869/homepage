'use server';

import type { Metadata } from 'next';
import { SITE_URL } from '@/config/constants';

import postsTable from '@/db/schema/posts';
import db from '@/db';

import Transition from '@/components/transition';
import Post from '@/components/post';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Posts',
    openGraph: {
      url: `${SITE_URL}/posts`,
      siteName: 'Posts'
    }
  };
}

export default async function Posts() {
  const posts = await db
    .select({
      slug: postsTable.slug,
      title: postsTable.title,
      description: postsTable.description,
      visible: postsTable.visible
    })
    .from(postsTable);

  return (
    <Transition className="h-full w-full overflow-y-scroll">
      {!posts.length && (
        <section className="grid h-full w-full place-items-center">
          <h1 className="text-center text-2xl">No Posts found :&#40;</h1>
        </section>
      )}
      {posts.map(
        (post) =>
          post.visible && (
            <Link
              key={post.slug}
              aria-label={post.title}
              href={`/posts/${post.slug}`}
              className="group flex h-20 items-center justify-between border-b px-3 text-muted-foreground transition-colors duration-300 hover:cursor-pointer hover:bg-foreground hover:text-muted"
            >
              <Post post={post} />
            </Link>
          )
      )}
    </Transition>
  );
}
