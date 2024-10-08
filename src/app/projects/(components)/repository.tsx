'use client';

import { cn } from '@/lib/utils';
import { Scale, Star } from 'lucide-react';
import Link from 'next/link';

export default function Repository({
  repo,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { repo: Repository }) {
  return (
    <Link
      aria-label={`Repository ${repo.name}`}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex h-20 items-center justify-between border-b px-3 text-muted-foreground transition-colors duration-300 hover:cursor-pointer hover:bg-foreground hover:text-muted',
        className
      )}
      {...props}
    >
      <article className="flex flex-col items-start justify-center">
        <h1 className="text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-background">
          {repo.name}
        </h1>
        <h2 className="max-w-[450px] truncate text-sm text-current">
          {repo.description}
        </h2>
      </article>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-1 text-sm text-current hover:underline">
          {repo.stargazers_count}
          <Star className="h-4 w-4 fill-[#ffca3a] stroke-[#ffca3a]" />
        </div>
        {repo.license !== null && (
          <div className="flex items-center gap-1 text-sm text-current hover:underline">
            {repo.license.key.toUpperCase()}
            <Scale className="h-4 w-4 text-current" />
          </div>
        )}
      </div>
    </Link>
  );
}
