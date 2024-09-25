/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
      {
        hostname: "looming-files.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
