/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    port: 3000,
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  },
};

module.exports = nextConfig;