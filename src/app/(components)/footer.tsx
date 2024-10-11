'use client';

import { SOCIALS } from '@/config/socials';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

export default function Footer() {
  const path = usePathname();

  return (
    !path.includes('posts/') && (
      <footer className="relative mt-auto grid max-h-28 min-h-28 w-full flex-grow place-items-center border-t">
        <section className="flex items-center justify-center gap-4">
          {SOCIALS.map(({ handle, url, name, icon: Icon }, index) => (
            <Link
              key={index}
              aria-label={name}
              href={`${url}${handle}`}
              rel="noreferrer noopener"
              target="_blank"
              className="group rounded-full p-2 transition-colors hover:bg-border"
            >
              <Icon className="stroke-muted-foreground/80 transition-all group-hover:scale-110 group-hover:stroke-foreground" />
            </Link>
          ))}
        </section>
        <span className="absolute bottom-2 right-2 text-right text-xs">
          &copy; {new Date().getFullYear()} Ardelan Yamanel
        </span>
      </footer>
    )
  );
}
