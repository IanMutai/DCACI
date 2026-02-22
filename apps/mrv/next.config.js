/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@nctp/api-types", "@nctp/utils"],
  env: {
    PORT: "3001",
  },
};

module.exports = nextConfig;
