/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: [
    "@nctp/api-types",
    "@nctp/api-client",
    "@nctp/ui",
    "@nctp/utils",
  ],
  env: {
    MRV_SERVICE_URL: process.env.MRV_SERVICE_URL || "http://localhost:4001",
    NDC_SERVICE_URL: process.env.NDC_SERVICE_URL || "http://localhost:4002",
    REGISTRY_SERVICE_URL:
      process.env.REGISTRY_SERVICE_URL || "http://localhost:4003",
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/mrv/:path*",
        destination: `${process.env.MRV_SERVICE_URL || "http://localhost:4001"}/api/:path*`,
      },
      {
        source: "/api/proxy/ndc/:path*",
        destination: `${process.env.NDC_SERVICE_URL || "http://localhost:4002"}/api/:path*`,
      },
      {
        source: "/api/proxy/registry/:path*",
        destination: `${process.env.REGISTRY_SERVICE_URL || "http://localhost:4003"}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
