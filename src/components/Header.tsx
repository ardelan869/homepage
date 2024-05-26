import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Link from 'next/link';

import NavBar from '@/components/NavBar';
import ColorSchemeSwitcher from '@/components/ColorSchemeSwitcher';
import config from '@/config';

export default function Header() {
	return (
		<header className="sticky top-0 z-10 top animate-ttb backdrop-blur-xl">
			<div className="container py-2 border-b lg-sm:grid lg-sm:grid-cols-3 lg-sm:grid-rows-1 flex justify-between items-center">
				<Link href="/">
					<h1 className="font-mono text-lg font-bold">{`${config.personal.firstName} ${config.personal.lastName[0]}.`}</h1>
				</Link>
				<NavBar />
				<div className="flex items-center gap-2 justify-self-end">
					<Link
						href={`https://github.com/${config.github.username}`}
						target="_blank"
					>
						<Button variant="ghost" className="p-2 w-9 h-9">
							<Github />
						</Button>
					</Link>
					<ColorSchemeSwitcher />
				</div>
			</div>
		</header>
	);
}
