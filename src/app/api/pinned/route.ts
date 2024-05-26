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

export async function GET() {
	try {
		const response = await fetch('https://api.github.com/graphql', {
			next: { revalidate: 60 },
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
			},
			body: JSON.stringify({ query }),
		});

		const responseBody = await response.text();

		if (!response.ok) {
			return Response.json([]);
		}

		try {
			const { data } = JSON.parse(responseBody);

			return Response.json(data.user.pinnedItems.nodes);
		} catch (error) {
			return Response.json([]);
		}
	} catch (error) {
		return Response.json([]);
	}
}
