/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    baseUrl: 'https://server.book-fair.cf',
  },
}

module.exports = nextConfig