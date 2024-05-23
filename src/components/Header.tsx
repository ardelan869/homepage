import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Link from 'next/link';

import NavBar from '@/components/NavBar';
import ColorSchemeSwitcher from '@/components/ColorSchemeSwitcher';

export default function Header() {
	return (
		<header className="sticky top-0 bg-primary-foreground/15 backdrop-blur-xl">
			<div className="container px-0 py-2 border-b flex items-center justify-between">
				<Link href="/">
					{/* <h1 className="font-mono text-transparent bg-text-foreground-gradient inline-block bg-clip-text">
						Ardelan Y.
					</h1> */}
					<h1 className="font-mono text-lg">Ardelan Y.</h1>
				</Link>
				<NavBar />
				<div className="flex items-center gap-2">
					<Link href="https://github.com/ardelan869">
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
