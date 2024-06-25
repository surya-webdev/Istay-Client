/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "syfvywhrdffjtzqcthck.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin_images/**",
      },
    ],
  },
};

export default nextConfig;
