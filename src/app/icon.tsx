import { getRandomInt } from '@/lib/utils';
import { ImageResponse } from 'next/og';

import { FIRST_NAME, SITE_URL } from '@/config/constants';

export const runtime = 'edge';

export const size = {
  width: 630,
  height: 630
};

export const contentType = 'image/png';

export default function Icon() {
  const randomTexture = getRandomInt(1, 8);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 570,
          backgroundImage: `url(${SITE_URL}/assets/images/texture_${randomTexture}.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}
      >
        {FIRST_NAME[0]}
      </div>
    ),
    {
      ...size
    }
  );
}
