import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'tse1.mm.bing.net', pathname: '/**' },
      { protocol: 'https', hostname: 'tse2.mm.bing.net', pathname: '/**' },
      { protocol: 'https', hostname: 'tse3.mm.bing.net', pathname: '/**' },
      { protocol: 'https', hostname: 'tse4.mm.bing.net', pathname: '/**' },
      { protocol: 'https', hostname: '5.imimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'andigitallock.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/**' },
      { protocol: 'https', hostname: 'gettoeasy.com.bd', pathname: '/**' },
      { protocol: 'https', hostname: 'i5.walmartimages.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'image.made-in-china.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'infiniahomeandkitchen.com',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'm.media-amazon.com', pathname: '/**' },
      { protocol: 'https', hostname: 'media.karousell.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'www.hitachi-homeappliances.com',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'www.thebrick.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
