/** @type {import('next').NextConfig} */

const url = process.env.API_URL ? `https://${process.env.API_URL}/:paths*` : 'http://satinder.local:8000/:paths*';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:paths*',
        destination: url,
      },
    ]
  },
}

module.exports = nextConfig
