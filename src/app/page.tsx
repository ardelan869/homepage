import config from '@/config';
import TypeWriter from '@/components/TypeWriter';
import PinnedRepositories from '@/components/home/pinned/Repositories';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Home',
};

async function getPinnedRepos(): Promise<PinnedRepo[]> {
	const response = await fetch(`${config.url}/api/pinned`);
	let pinnedRepos: PinnedRepo[] = [];

	try {
		pinnedRepos = (await response.json()) as PinnedRepo[];
	} catch (error) {}

	return pinnedRepos;
}

export default async function Home() {
	const pinnedRepos: PinnedRepo[] = await getPinnedRepos();

	return (
		<main className="container">
			<section className="w-full flex flex-col items-center mt-20">
				<div className="rounded-full relative ring ring-offset-4 ring-offset-background ring-1 ring ring-muted-foreground">
					<Avatar className="w-32 h-32 hover:scale-110 hover:cursor-pointer transition-transform">
						<AvatarImage
							src={`https://github.com/${config.github.username}.png`}
							alt={config.github.username}
						/>
						<AvatarFallback children={config.github.username} />
					</Avatar>
				</div>
				<TypeWriter
					texts={[`Hi, I'm ${config.personal.firstName}.`]}
					className="font-mono font-bold mt-12 text-4xl"
				/>
				<PinnedRepositories pinnedRepos={pinnedRepos} />
				{JSON.stringify(pinnedRepos)}
			</section>
		</main>
	);
}
