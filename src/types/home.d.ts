interface RepoLanguage {
	node: {
		name: string;
	};
	size: number;
}

interface PinnedRepo {
	name: string;
	description?: string;
	url: string;
	stargazers: {
		totalCount: number;
	};
	forks: {
		totalCount: number;
	};
	primaryLanguage: {
		name: string;
	};
	languages: {
		totalSize: number;
		edges: RepoLanguage[];
	};
}
