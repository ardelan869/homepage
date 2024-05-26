import config from '@/config';
import socials from '@/config/socials';
import ColorSchemeSwitcher from '@/components/ColorSchemeSwitcher';
import { Codepen, Github, Instagram, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const socialIcons: Record<keyof typeof socials, typeof Codepen> = {
	codepen: Codepen,
	twitter: Twitter,
	instagram: Instagram,
	github: Github,
	mail: Mail,
};

export default function Footer() {
	const socialEntries = Object.entries(socials);

	return (
		<footer className="border-t bg-primary-foreground">
			<svg
				width="200"
				height="200"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute w-0 h-0"
			>
				<defs>
					<radialGradient
						id="instagram"
						cx="30%"
						cy="107%"
						r="150%"
						fx="30%"
						fy="107%"
					>
						<stop offset="0%" stopColor="#fdf497" stopOpacity={1} />
						<stop offset="5%" stopColor="#fdf497" stopOpacity={1} />
						<stop
							offset="45%"
							stopColor="#fd5949"
							stopOpacity={1}
						/>
						<stop
							offset="60%"
							stopColor="#d6249f"
							stopOpacity={1}
						/>
						<stop
							offset="90%"
							stopColor="#285AEB"
							stopOpacity={1}
						/>
					</radialGradient>
				</defs>
			</svg>

			<div className="container h-48 flex items-center justify-center">
				<div className="flex items-center justify-center gap-4 md:gap-8 h-full">
					{socialEntries.map(([platform, data]) => {
						const Icon = socialIcons[platform];

						return (
							<Link
								key={platform}
								href={`${data.baseUrl}${data.username}`}
								target="_blank"
								className="group w-16 h-16 transition-colors rounded-full grid place-items-center hover:bg-foreground/15"
							>
								<Icon
									size={32}
									className={cn(
										'stroke-muted-foreground stroke-1 group-hover:stroke-2 transition-all group-hover:scale-110 group-hover:cursor-pointer',
										data.hover
											? 'group-hover:stroke-current'
											: 'group-hover:stroke-foreground',
									)}
									style={
										{
											'--tw-stroke': data.hover,
										} as Record<string, string | undefined>
									}
								/>
							</Link>
						);
					})}
				</div>
			</div>
			<div className="h-12 bg-muted">
				<div className="container h-full flex items-center justify-between">
					<h1>
						&copy; {new Date().getFullYear()}{' '}
						{config.personal.firstName} {config.personal.lastName}
					</h1>
					<ColorSchemeSwitcher className="hover:bg-muted-foreground/50" />
				</div>
			</div>
		</footer>
	);
}
