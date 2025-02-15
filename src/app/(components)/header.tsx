'use client';

import {
  FULL_NAME,
  GITHUB_AVATAR_URL,
  GITHUB_URL,
  DESCRIPTION,
  DISCORD_STATUS_COLOR
} from '@/config/constants';
import { LINKS } from '@/config/links';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import useLanyardSocket from '@/components/hooks/use-lanyard';

import Image from 'next/image';
import Link from 'next/link';

function NavBar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const path = usePathname();

  return (
    <nav className={cn('flex gap-4 self-end', className)} {...props}>
      {LINKS.map((link) => (
        <Link
          key={link.name}
          aria-label={link.name}
          href={link.href}
          className={cn(
            'text-sm text-muted-foreground',
            path === link.href ? 'text-foreground' : 'hover:underline'
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}

export default function Header() {
  const { status } = useLanyardSocket();
  const path = usePathname();

  return (
    !path.includes('posts/') && (
      <header className="sticky top-0 z-50 flex max-h-28 min-h-28 items-center justify-between border-b p-4 pt-6">
        <section className="flex items-center gap-5">
          <Link
            className="relative h-16 w-16"
            aria-label="Github Profile"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="h-16 w-16 rounded-full"
              src={GITHUB_AVATAR_URL}
              alt={FULL_NAME}
              width={256}
              height={256}
            />
            <span
              className="absolute bottom-[5px] right-[5px] h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  DISCORD_STATUS_COLOR[status?.discord_status ?? 'offline']
              }}
            />
          </Link>
          <article>
            <h1 className="text-xl font-medium">{FULL_NAME}</h1>
            <h2 className="text-sm text-muted-foreground">{DESCRIPTION}</h2>
            <NavBar className="xs:hidden flex" />
          </article>
        </section>
        <NavBar className="xs:flex hidden" />
      </header>
    )
  );
}
