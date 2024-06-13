'use client';

import Link from 'next/link';

import navItems from '@/config/nav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function NavBar() {
	const path = usePathname();

	return (
		<nav role="navigation" className="justify-self-center">
			<ul className="flex items-center justify-center gap-8">
				{navItems.map((navItem) => (
					<li
						key={navItem.href}
						className={cn(
							'text-sm transition-colors',
							path === navItem.href
								? 'text-foreground lg-sm:block hidden'
								: 'text-foreground/50 hover:text-foreground',
							path === navItem.href && 'lg-sm:block hidden',
						)}
					>
						<Link href={navItem.href} aria-label={navItem.label}>
							{navItem.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
