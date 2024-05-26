'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function TypeWriter({
	texts,
	duration = 200,
	repeat = false,
	staticText,
	className,
	...props
}: {
	texts: string[];
	duration?: number;
	repeat?: boolean;
	staticText?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>) {
	const [current, setCurrent] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		setProgress(0);
	}, [current]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (progress === texts[current].length)
				return setCurrent((current) => {
					if (repeat && current === texts.length - 1) return 0;

					return Math.min((current += 1), texts.length - 1);
				});

			setProgress((progress) =>
				Math.min((progress += 1), texts[current].length),
			);
		}, duration);

		return () => clearTimeout(timeout);
	}, [progress, texts, current, repeat]);

	return (
		<div
			className={cn('flex items-center gap-1 h-11', className)}
			{...props}
		>
			<h1>
				{staticText}
				{texts[current].slice(0, progress)}
			</h1>
			<div className="animate-blink w-1 h-9 bg-foreground" />
		</div>
	);
}
