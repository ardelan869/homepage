import OGImage from '@/components/og-image';
import { FULL_NAME } from '@/config/constants';
import { SEO_DESCRIPTION } from '@/config/seo';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default async function Image() {
  return OGImage({
    title: FULL_NAME,
    description: SEO_DESCRIPTION
  });
}
