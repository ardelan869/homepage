import 'server-only';
import config from '@/config';

const query = `{
  user(login: "${config.github.username}") {
    pinnedItems(first: ${config.github.pinnedRepos}) {
      nodes {
        ... on Repository {
          name
          description
          url
					stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          primaryLanguage {
            name
          }
          languages(first: 10) {
            totalSize
            edges {
              node {
                name
              }
              size
            }
          }
        }
      }
    }
  }
}`;

export async function getPinnedGithubRepos(): Promise<PinnedRepo[]> {
	try {
		const response = await fetch('https://api.github.com/graphql', {
			next: { revalidate: 30 * 60 },
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
			},
			body: JSON.stringify({ query }),
		});

		const responseBody = await response.text();

		if (!response.ok) {
			console.error(responseBody);
			return [];
		}

		try {
			const { data } = JSON.parse(responseBody);

			return data.user.pinnedItems.nodes;
		} catch (error) {
			console.error(error);
			return [];
		}
	} catch (error) {
		console.error(error);
		return [];
	}
}
