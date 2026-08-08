/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // 图片配置
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "strapi.ra0.cn",
      },
      {
        protocol: "https",
        hostname: "strapi.ra0.cn",
      },
    ],
  },

  // 压缩
  compress: true,

  // poweredByHeader
  poweredByHeader: false,

  // trailingSlash
  trailingSlash: true,

  // Fix Windows path issue with [slug] directories
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;
