'use client';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { type ColorSchemes, useColorScheme } from '@/providers/ColorScheme';
import { MonitorSmartphone, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export default function ColorSchemeSwitcher() {
	const [open, setOpen] = useState(false);
	const [colorScheme, setColorScheme] = useColorScheme();

	const setScheme = (scheme: ColorSchemes) => {
		setColorScheme(scheme);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					className="p-2 h-9 w-9"
					onClick={() => setOpen((b) => !b)}
				>
					{colorScheme === 'light' && <Sun />}
					{colorScheme === 'dark' && <Moon />}
					{colorScheme === 'system' && <MonitorSmartphone />}
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
						{scheme.charAt(0).toUpperCase() + scheme.slice(1)}
					</Button>
				))}
			</PopoverContent>
		</Popover>
	);
}
