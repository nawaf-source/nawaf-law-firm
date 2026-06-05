/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep ESLint warnings from blocking the production build on Vercel.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
