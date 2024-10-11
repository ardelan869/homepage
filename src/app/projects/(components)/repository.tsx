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
        'group relative flex h-20 w-full border-b px-3 text-muted-foreground transition-colors duration-300 hover:cursor-pointer hover:bg-foreground hover:text-muted',
        className
      )}
      {...props}
    >
      <article className="relative flex h-full w-full flex-1 items-center">
        <div className="absolute inset-x-0 flex justify-between">
          <div className="min-w-0 flex-1 pr-4">
            <h1 className="truncate text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-background">
              {repo.name}
            </h1>
            <h2 className="truncate text-sm text-current">
              {repo.description}
            </h2>
          </div>
          <div className="flex flex-shrink-0 flex-col items-end gap-2">
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
        </div>
      </article>
    </Link>
  );
}
