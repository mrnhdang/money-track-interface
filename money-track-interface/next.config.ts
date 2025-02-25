import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  env: {
    LOCALHOST: 'http://localhost:8080',
  },
};

export default nextConfig;
