'use client';

import Link from 'next/link';

import config from '@/config';
import NavBar from '@/components/NavBar';
import ColorSchemeSwitcher from '@/components/ColorSchemeSwitcher';

export default function Header() {
	return (
		<header className="sticky top-0 z-10 top animate-ttb backdrop-blur-xl bg-foreground/5 transition-colors">
			<div className="container py-2 border-b grid grid-cols-3 grid-rows-1 items-center">
				<Link href="/">
					<h1 className="font-mono text-lg font-bold">{`${config.personal.firstName} ${config.personal.lastName[0]}.`}</h1>
				</Link>
				<NavBar />
				<div className="flex items-center gap-2 justify-self-end">
					<ColorSchemeSwitcher />
				</div>
			</div>
		</header>
	);
}
