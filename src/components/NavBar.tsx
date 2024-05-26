'use client';

import Link from 'next/link';

import navItems from '@/config/nav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function NavBar() {
	const path = usePathname();

	return (
		<nav className="justify-self-center lg-sm:block hidden">
			<ul className="flex items-center gap-8">
				{navItems.map((navItem) => (
					<Link
						key={navItem.href}
						href={navItem.href}
					>
						<li
							className={cn(
								'text-sm transition-colors',
								path === navItem.href
									? 'text-foreground'
									: 'text-foreground/50 hover:text-foreground',
							)}
						>
							{navItem.label}
						</li>
					</Link>
				))}
			</ul>
		</nav>
	);
}
