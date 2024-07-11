import config from '@/config';
import { getPinnedGithubRepos } from '@/server/actions';
import type { Metadata } from 'next';

import TypeWriter from '@/components/TypeWriter';
import PinnedRepositories from '@/components/home/pinned/Repositories';
import Image from 'next/image';

export const metadata: Metadata = {
	title: `Home - ${config.personal.firstName} ${config.personal.lastName}`,
};

export default async function Home() {
	const pinnedRepos: PinnedRepo[] = await getPinnedGithubRepos();

	return (
		<main className="container">
			<section className="w-full flex flex-col items-center mt-20">
				<div className="rounded-full relative ring ring-offset-4 ring-offset-background ring-1 ring ring-muted-foreground">
					<Image
						loading={'eager'}
						width={128}
						height={128}
						className="w-32 h-32 hover:scale-110 hover:cursor-pointer transition-transform rounded-full"
						src={`https://github.com/${config.github.username}.png`}
						alt={config.github.username}
					/>
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
