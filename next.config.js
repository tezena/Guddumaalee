/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};
const nextConfig = {
  images: {
    domains: ['via.placeholder.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
 
};

module.exports = nextConfig;
