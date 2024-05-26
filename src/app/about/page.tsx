import config from '@/config';
import type { Metadata } from 'next';

import HorizontalScroll from '@/components/HorizontalScroll';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const metadata: Metadata = {
	title: 'About',
	openGraph: {
		type: 'article',
		url: `${config.url}/contact`,
		siteName: 'About Me',
	},
};

export default function About() {
	return (
		<main className="container">
			<section className="flex flex-col items-center mt-20 gap-10 px-5 pb-20">
				<div className="rounded-full relative ring ring-offset-4 ring-offset-background ring-1 ring ring-muted-foreground">
					<Avatar className="w-32 h-32 hover:scale-110 hover:cursor-pointer transition-transform">
						<AvatarImage
							src={`https://github.com/${config.github.username}.png`}
							alt={config.github.username}
						/>
						<AvatarFallback children={config.github.username} />
					</Avatar>
				</div>
				{config.personal.quote !== undefined && (
					<h3 className="text-muted-foreground/50 italic">
						"
						{typeof config.personal.quote === 'string'
							? config.personal.quote
							: config.personal.quote.text}
						"
						{typeof config.personal.quote !== 'string' &&
							`- ${config.personal.quote.author}`}
					</h3>
				)}
				<HorizontalScroll duration={2 * 60000}>
					{config.personal.skills.map((skill) => (
						<img
							key={skill}
							src={skill}
							loading="lazy"
							className="w-8 h-8 object-contain"
						/>
					))}
				</HorizontalScroll>
				{config.personal.qAndA.map((entry) => (
					<div className="flex flex-col gap-1" key={entry.question}>
						<h1 className="font-mono font-bold text-2xl text-center max-w-[800px] w-full">
							{entry.question}
						</h1>
						<article
							className="text-foreground/50 max-w-[800px] p-2"
							dangerouslySetInnerHTML={{ __html: entry.answer }}
						/>
					</div>
				))}
			</section>
		</main>
	);
}
