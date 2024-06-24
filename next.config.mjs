/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

const nextConfig = {
  reactStrictMode: true,
  // Disable ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add any other Next.js config options here
};

module.exports = withPWA(nextConfig);