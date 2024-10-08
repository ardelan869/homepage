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
          fontSize: 112,
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
        {title}
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: '#f4f4f5',
            textAlign: 'center',
            width: '90%'
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...options
    }
  );
}
