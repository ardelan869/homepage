import { SKILLS } from '@/config/skills';

import Image from 'next/image';
import Link from 'next/link';

export default function Skills() {
  return (
    <section className="flex w-full flex-wrap items-center justify-start gap-1">
      {SKILLS.map(({ icon: Icon, label, href }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border p-1.5 text-sm text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
        >
          {typeof Icon === 'string' ? (
            <Image
              className="h-6 w-6"
              src={Icon}
              alt={label}
              width={24}
              height={24}
              objectFit="contain"
            />
          ) : (
            <Icon className="h-6 w-6 object-contain" />
          )}
          {label}
        </Link>
      ))}
    </section>
  );
}
