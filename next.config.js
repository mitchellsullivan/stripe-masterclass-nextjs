/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'],
  },
  env: {
    STRIPE_PUBLIC_KEY: process.env["STRIPE_PUBLIC_KEY"]
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  }
}
