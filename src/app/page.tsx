import TypeWriter from '@/components/TypeWriter';
import PinnedRepositories from '@/components/home/pinned/Repositories';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { Metadata } from 'next';

import config from '@/config';
import { getPinnedGithubRepos } from '@/server/actions';

export const metadata: Metadata = {
	title: `Home - ${config.personal.firstName} ${config.personal.lastName}`,
};

export default async function Home() {
	const pinnedRepos: PinnedRepo[] = await getPinnedGithubRepos();

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
			</section>
		</main>
	);
}
