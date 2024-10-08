import type { MDXComponents as MDXComponentsType } from 'mdx/types';

import H1 from '@/components/markdown/h1';
import H2 from '@/components/markdown/h2';
import H3 from '@/components/markdown/h3';
import H4 from '@/components/markdown/h4';
import H5 from '@/components/markdown/h5';
import H6 from '@/components/markdown/h6';
import Pre from '@/components/markdown/pre';

export const MDXComponents: MDXComponentsType = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre
};

export default MDXComponents;
