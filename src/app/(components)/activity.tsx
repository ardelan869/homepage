'use client';

import type { Activity as ActivityType } from 'react-use-lanyard';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import useLanyardSocket from '@/components/hooks/use-lanyard';

import Image from 'next/image';
import Skeleton from './skeleton';

const DISCORD_EXTERNAL_ASSETS_URL = 'https://media.discordapp.net/external/';
const DISCORD_APP_ASSETS_URL = 'https://cdn.discordapp.com/app-assets/';

export default function Activity({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { status, loading } = useLanyardSocket();
  const [activity, setActivity] = useState<ActivityType | undefined>(undefined);

  const image = activity?.assets?.large_image ?? activity?.assets?.small_image;
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    function updateElapsedTime() {
      if (!activity || !activity.timestamps) return;

      const start = activity.timestamps.start;
      const end = activity.timestamps.end || Date.now();
      const elapsed = Math.floor((end - start) / 1000);

      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;

      let timeString = '';

      if (hours > 0) {
        timeString += `${hours}h ${minutes.toString().padStart(2, '0')}m`;
      } else if (minutes > 0) {
        timeString += `${minutes}m`;
      }

      timeString += ` ${seconds.toString().padStart(2, '0')}s`;

      setElapsedTime(timeString);
    }

    updateElapsedTime();

    const interval = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(interval);
  }, [activity]);

  useEffect(() => {
    if (!status) return;

    const filtered = status.activities.filter(
      (activity) => activity.type === 0
    );

    setActivity(filtered.find((activity) => activity.assets) ?? filtered[0]);
  }, [status]);

  if (!activity && loading) return <Skeleton align="right" />;

  return (
    activity && (
      <section
        className={cn(
          'flex flex-1 items-center justify-end gap-4 xs:flex-row-reverse',
          className
        )}
        {...props}
      >
        {image && (
          <Image
            className="h-16 w-16"
            src={
              image.startsWith('mp:external/')
                ? `${DISCORD_EXTERNAL_ASSETS_URL}${image.replace(
                    'mp:external/',
                    ''
                  )}`
                : `${DISCORD_APP_ASSETS_URL}/${activity?.application_id}/${image}.webp`
            }
            alt={activity?.name ?? ''}
            width={128}
            height={128}
          />
        )}
        <article className="text-left xs:text-right">
          <h1 className="max-w-full truncate text-lg">{activity?.name}</h1>
          <h2 className="text-sm text-muted-foreground">{elapsedTime}</h2>
        </article>
      </section>
    )
  );
}
