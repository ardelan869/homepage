'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CodeXml, GitFork, Star } from 'lucide-react';
import { motion } from 'framer-motion';

import Link from 'next/link';
import Languages from '@/components/home/pinned/Languages';

import langColors from '@/config/langColors';

export default function PinnedRepository({
	pinnedRepo,
	i,
}: {
	pinnedRepo: PinnedRepo;
	i: number;
}) {
	const primaryLanguage = pinnedRepo.languages.edges.find(
		(l) => l.node.name === pinnedRepo.primaryLanguage.name,
	)!;
	const primaryLanguagePercentage =
		(primaryLanguage.size / pinnedRepo.languages.totalSize) * 100;

	return (
		<motion.div
			key={pinnedRepo.name}
			variants={{
				enter: {
					opacity: 1,
					filter: 'blur(0)',
					transform: 'translateY(0)',
					transition: {
						delay: (50 * i) / 1000,
						duration: 0.5,
						ease: [0.4, 0, 0.2, 1],
					},
					transitionEnd: {
						filter: 'none',
						transform: 'none',
					},
				},
				exit: {
					opacity: 0,
					filter: 'blur(2px)',
					transform: 'translateY(10px)',
					transition: {
						delay: (50 * i) / 1000,
						duration: 0.5,
						ease: [0.4, 0, 0.2, 1],
					},
				},
			}}
			initial="exit"
			animate="enter"
			exit="exit"
		>
			<Link
				href={pinnedRepo.url}
				aria-label={pinnedRepo.name}
				target="_blank"
			>
				<div className="sr-only">{pinnedRepo.name}</div>
				<Card className="sm:w-[400px] w-full hover:bg-border transition-colors">
					<CardHeader>
						<div className="flex items-center gap-2">
							<CardTitle className="font-mono font-bold text-lg">
								{pinnedRepo.name}
							</CardTitle>
							<Badge className="flex items-center gap-1 py-[1.5px] px-2">
								<Star
									size={12}
									color="#ffc107"
									className="fill-[#ffc107]"
								/>
								{pinnedRepo.stargazers.totalCount}
							</Badge>
							<Badge
								className="flex items-center gap-1 py-[1.5px] px-2"
								variant="secondary"
							>
								<GitFork size={12} />
								{pinnedRepo.forks.totalCount}
							</Badge>
						</div>
						<CardDescription className="line-clamp-2 h-10">
							{pinnedRepo.description}
						</CardDescription>
					</CardHeader>
					<CardContent className="pb-2">
						<Badge
							variant="secondary"
							className="text-white"
							style={{
								backgroundColor: `${
									langColors[
										pinnedRepo.primaryLanguage
											.name as keyof typeof langColors
									] ?? undefined
								}`,
							}}
						>
							<CodeXml size={15} color="#fff" className="mr-2" />
							{pinnedRepo.primaryLanguage.name} (
							{primaryLanguagePercentage
								.toFixed(1)
								.replace(/\.0$/, '')}
							%)
						</Badge>
					</CardContent>
					<Languages languages={pinnedRepo.languages} />
				</Card>
			</Link>
		</motion.div>
	);
}
