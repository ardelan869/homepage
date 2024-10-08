'use server';

import type { Metadata } from 'next';
import { FULL_NAME, GITHUB_NAME, SITE_URL } from '@/config/constants';

import getRepositories from '@/server/actions/github';

import Repository from './(components)/repository';
import Transition from '@/components/transition';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projects',
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/projects`,
      siteName: `Projects - ${FULL_NAME}`
    }
  };
}

export default async function Projects() {
  const repositories = (await getRepositories()).filter(
    (r) => r.name !== GITHUB_NAME
  );

  return (
    <Transition className="overflow-y-scroll">
      {repositories.map((repo, index) => (
        <Repository
          key={repo.id}
          repo={repo}
          className={index === repositories.length - 1 ? 'border-none' : ''}
        />
      ))}
    </Transition>
  );
}
