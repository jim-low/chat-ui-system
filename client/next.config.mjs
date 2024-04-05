/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // output: 'export' is for static exports, for statically hosted websites
  distDir: 'build',
  images: {
    // domains: ["fastly.picsum.photos"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: "/id/**"
      }
    ]
  }
};

export default nextConfig;
