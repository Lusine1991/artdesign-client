/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ArtDesignGevorgyans.mooo.com",
      },
    ];
  },
  
};

module.exports = nextConfig;

