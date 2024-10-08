'use server';

import 'server-only';

import { GITHUB_NAME } from '@/config/constants';

export default async function getRepositories(): Promise<Repository[]> {
  const resp = await fetch(
    `https://api.github.com/users/${GITHUB_NAME}/repos`,
    {
      next: {
        revalidate: 5 * 60
      }
    }
  );

  if (!resp.ok) {
    console.error('Failed to fetch repositories. Status: ' + resp.status);
    return [];
  }

  try {
    return await resp.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
