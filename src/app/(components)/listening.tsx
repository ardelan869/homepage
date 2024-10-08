'use client';

import { cn } from '@/lib/utils';

import getSpotifyPlayback from '@/server/actions/spotify';

import { useEffect, useState } from 'react';
import useLanyardSocket from '@/components/hooks/use-lanyard';

import Link from 'next/link';
import Image from 'next/image';
import Skeleton from './skeleton';
import { Headphones } from 'lucide-react';

export default function Listening({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { status, loading } = useLanyardSocket();
  const [playback, setPlayback] = useState<SpotifyPlayback | undefined>();

  useEffect(() => {
    async function fetchPlayback() {
      if ((status && status?.spotify) || loading) return;

      const fetchedPlayback = await getSpotifyPlayback();
      setPlayback(fetchedPlayback);
    }

    const interval = setInterval(fetchPlayback, 15000);
    fetchPlayback();

    return () => clearInterval(interval);
  }, [setPlayback, status, loading]);

  if (!playback && !status) return <Skeleton />;

  return (
    <section
      className={cn('flex flex-1 items-center gap-4', className)}
      {...props}
    >
      <Link
        href={
          playback?.track_link ??
          (status &&
            status.spotify &&
            `https://open.spotify.com/track/${status.spotify?.track_id}`) ??
          ''
        }
        target="_blank"
        rel="noopener noreferrer"
        className="group relative z-0 grid h-16 w-16 place-items-center"
      >
        {(playback?.album_image_url !== undefined ||
          status?.spotify?.album_art_url !== undefined) && (
          <Image
            className="h-16 w-16"
            src={(playback?.album_image_url ?? status?.spotify?.album_art_url)!}
            alt={playback?.track_name ?? status?.spotify?.song ?? 'N/A'}
            width={64}
            height={64}
          />
        )}
        <Headphones className="absolute -z-[1] h-14 w-14 stroke-muted-foreground transition-transform group-hover:translate-x-5 group-hover:rotate-12" />
      </Link>
      <article>
        <h1 className="max-w-60 truncate text-lg">
          {playback?.track_name ?? status?.spotify?.song}
        </h1>
        <h2 className="max-w-60 truncate text-sm text-muted-foreground">
          {playback?.artists.join(', ') ??
            status?.spotify?.artist.replaceAll('; ', ', ')}
        </h2>
      </article>
    </section>
  );
}
