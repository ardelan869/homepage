import { cn } from '@/lib/utils';

export default function HorizontalScroll({
	duration = 5000,
	className,
	children,
	...props
}: {
	duration?: number;
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('max-w-[500px] overflow-hidden w-full', className)}
			{...props}
			style={{
				mask: 'linear-gradient(90deg, transparent, white 30%, white 70%, transparent)',
				WebkitMask:
					'linear-gradient(90deg, transparent, white 30%, white 70%, transparent)',
			}}
		>
			<div
				className="flex flex-wrap gap-4 w-max flex-nowrap animate-horizontalScroll"
				style={
					{
						'--horizontal-scroll-duration': `${duration}ms`,
					} as Record<string, string>
				}
			>
				{children}
				{children}
			</div>
		</div>
	);
}
