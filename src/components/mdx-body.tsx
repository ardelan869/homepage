'use server';

import 'server-only';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
// @ts-ignore - no types available
import remarkA11yEmoji from '@fec/remark-a11y-emoji';

import { cn } from '@/lib/utils';

import MDXComponents from '@/components/markdown';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function MDXBody({
  children,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: string;
}) {
  return (
    <div className={cn('prose dark:prose-invert', className)} {...props}>
      <MDXRemote
        source={children}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkA11yEmoji],
            rehypePlugins: [
              rehypeSlug,
              rehypePrettyCode.bind(null, { theme: 'github-dark-default' })
            ]
          }
        }}
        components={MDXComponents}
      />
    </div>
  );
}
