/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "qrlyjjp3vyom7aer.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
    ],
  },
};

export default nextConfig;
