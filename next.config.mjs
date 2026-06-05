/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Don't let lint warnings (e.g. <img> usage) block the production build on Vercel.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
