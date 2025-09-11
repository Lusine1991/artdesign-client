/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ArtDesignGevorgyans.mooo.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
