/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@nctp/api-types", "@nctp/utils"],
  env: {
    PORT: "3002",
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3002"],
    },
  },
};

module.exports = nextConfig;
