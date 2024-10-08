import type { Post } from '@/db/schema/posts';
import { cn } from '@/lib/utils';

export default function Post({
  post,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  post: { title: string; description: string };
}) {
  return (
    <article
      className={cn('flex flex-col items-start justify-center', className)}
      {...props}
    >
      <h1 className="text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-background">
        {post.title}
      </h1>
      <h2 className="max-w-full truncate text-sm text-current">
        {post.description}
      </h2>
    </article>
  );
}
