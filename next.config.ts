import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false
  }
};

export default nextConfig;
