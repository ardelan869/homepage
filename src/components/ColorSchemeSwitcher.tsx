'use client';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { ColorSchemes } from '@/providers/ColorScheme';
import { MonitorSmartphone, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ColorSchemeSwitcher({
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { setTheme } = useTheme();
	const [theme, setLocalTheme] = useState<ColorSchemes>('system');

	const [open, setOpen] = useState(false);
	// const [colorScheme, setColorScheme] = useColorScheme();

	const setScheme = (scheme: ColorSchemes) => {
		// setColorScheme(scheme);
		setTheme(scheme);
		setOpen(false);
	};

	useEffect(() => {
		setLocalTheme(
			(localStorage.getItem('theme') as ColorSchemes) ?? 'system',
		);
	});

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					className={cn('p-2 h-9 w-9', className)}
					onClick={() => setOpen((b) => !b)}
					{...props}
				>
					<div className="sr-only">Color Scheme Switcher</div>
					{/* {colorScheme === 'light' && <Sun />}
					{colorScheme === 'dark' && <Moon />}
					{colorScheme === 'system' && <MonitorSmartphone />} */}
					{theme === 'light' && <Sun />}
					{theme === 'dark' && <Moon />}
					{theme === 'system' && <MonitorSmartphone />}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-28 p-1">
				{['light', 'dark', 'system'].map((scheme) => (
					<Button
						key={scheme}
						variant="ghost"
						size="sm"
						className="text-center w-full"
						onClick={() => setScheme(scheme as ColorSchemes)}
					>
						{scheme[0].toUpperCase() + scheme.slice(1)}
					</Button>
				))}
			</PopoverContent>
		</Popover>
	);
}
