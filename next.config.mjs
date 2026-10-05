/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Quota d'optimisation Vercel épuisé (erreur 402) : images servies telles quelles
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
