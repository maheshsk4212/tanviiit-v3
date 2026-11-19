import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served under /v3 on tanviit.netlify.app, beside v1 at / and v2 at /v2.
  basePath: "/v3",
  cacheComponents: true,
  images: { qualities: [75, 85] },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
