import type { ImageResponseOptions } from 'next/server';

import { getRandomInt } from '@/lib/utils';
import { ImageResponse } from 'next/og';

import { SITE_URL } from '@/config/constants';

export default function OGImage({
  title,
  description,
  options
}: {
  title: string;
  description?: string;
  options?: ImageResponseOptions;
}) {
  const randomTexture = getRandomInt(1, 8);

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url(${SITE_URL}/assets/images/texture_${randomTexture}.png)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600
        }}
      >
        <h1
          style={{
            maxWidth: '100%',
            textAlign: 'center',
            fontSize: 112,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            padding: '0 5%'
          }}
        >
          {title}
        </h1>
        {description && (
          <h2
            style={{
              maxWidth: '100%',
              textAlign: 'center',
              fontSize: 36,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              padding: '0 10%'
            }}
          >
            {description}
          </h2>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...options
    }
  );
}
