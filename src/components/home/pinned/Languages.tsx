'use client';

import langColors from '@/config/langColors';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Languages({
	languages,
}: {
	languages: {
		totalSize: number;
		edges: RepoLanguage[];
	};
}) {
	return (
		<div className="w-full h-4 rounded-lg overflow-hidden flex flex-col justify-end">
			<div className="w-full h-2 flex items-center">
				{languages.edges
					.sort((a, b) => b.size - a.size)
					.map((language) => {
						const percent =
							(language.size / languages.totalSize) * 100;

						return (
							<Tooltip key={language.node.name}>
								<TooltipTrigger
									className="h-full"
									style={{
										backgroundColor:
											langColors[
												language.node
													.name as keyof typeof langColors
											] ?? undefined,
										width: `${percent}%`,
									}}
								>
									<div className="sr-only">
										{language.node.name} (
										{percent.toFixed(1).replace(/\.0$/, '')}
										%)
									</div>
								</TooltipTrigger>
								<TooltipContent>
									{language.node.name} (
									{percent.toFixed(1).replace(/\.0$/, '')}%)
								</TooltipContent>
							</Tooltip>
						);
					})}
			</div>
		</div>
	);
}
