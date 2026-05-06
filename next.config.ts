import type { NextConfig } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bikinundangan.net"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bikinundangan.net" }],
        destination: `${siteUrl}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "bikinundangan.site" }],
        destination: `${siteUrl}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bikinundangan.site" }],
        destination: `${siteUrl}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
