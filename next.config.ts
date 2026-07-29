import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Content images are served from Sanity's asset CDN. The built-in optimizer
     * handles them from here — deliberately no `images.loaderFile`, which is
     * global and would break any remaining local `/images/*` sources.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
