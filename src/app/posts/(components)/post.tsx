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
      className={cn(
        'relative flex h-full w-full flex-col justify-center',
        className
      )}
      {...props}
    >
      <div className="absolute inset-x-0">
        <h1 className="block truncate text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-background">
          {post.title}
        </h1>
        <h2 className="block truncate text-sm text-current">
          {post.description}
        </h2>
      </div>
    </article>
  );
}
