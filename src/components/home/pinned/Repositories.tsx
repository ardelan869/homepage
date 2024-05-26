'use client';

import { Frown, Pin } from 'lucide-react';
import PinnedRepository from '@/components/home/pinned/Repository';
import { useEffect, useState } from 'react';

export default function Repositories({
	pinnedRepos,
}: {
	pinnedRepos: PinnedRepo[];
}) {
	const [repositories, setRepositories] = useState<PinnedRepo[]>([]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setRepositories(pinnedRepos);
		}, 300);

		return () => clearTimeout(timeout);
	}, [pinnedRepos]);

	return (
		<section className="flex flex-col items-center gap-5 mt-36 pb-10 sm:max-w-full sm:px-0 px-2 max-w-[400px]">
			<div className="flex items-center gap-2">
				<Pin
					size={23}
					className="-rotate-45 fill-primary stroke-primary"
				/>
				<h1 className="font-mono font-bold text-2xl">
					Pinned Repositories
				</h1>
			</div>
			{pinnedRepos.length === 0 ? (
				<div className="flex items-center gap-2">
					<h1 className="text-2xl text-muted-foreground">
						No pinned repositories found
					</h1>
					<Frown className="stroke-muted-foreground" />
				</div>
			) : (
				<div className="grid lg-sm:grid-cols-2 gap-3">
					{repositories.map((pinnedRepo, i) => (
						<PinnedRepository
							key={i}
							pinnedRepo={pinnedRepo}
							i={i}
						/>
					))}
				</div>
			)}
		</section>
	);
}
