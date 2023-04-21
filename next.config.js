module.exports = async (phase, { defaultConfig }) => {
  const nextConfig = {
    // future: { webpack5: true },
    // pwa: {
    //   dest: "public",
    //   disable: process.env.NODE_ENV === "development",
    // },
    env: {
      NEXT_PUBLIC_SUPABASE_URL: "https://mcqzpfkknjhuyegcmibg.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jcXpwZmtrbmpodXllZ2NtaWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NzczNTUsImV4cCI6MTk5NzU1MzM1NX0.Z3ixgyb5edVmTWeYLGb_BVZThb2GoGxPT1Iy5l4sHzM",
      siteTitle: "Doggy Stickers",
      siteDescription: "Get some Doggy Stickers!",
      siteKeywords: "dog, stickers, fun",
      siteUrl: "https://www.doggystickers.xyz",
      siteImagePreviewUrl: "/images/main.jpg",
      twitterHandle: "@deepwhitman",
      NEXT_PUBLIC_LOCAL_STORAGE_NAME: "doggystickers",
    },
    images: {
      domains: ["cdn.shopify.com"],
    },
  };
  return nextConfig;
};
// const withPWA = require("next-pwa")({
//   dest: "public",
// });

// module.exports = withPWA({
//   // future: { webpack5: true },
//   // pwa: {
//   //   dest: "public",
//   //   disable: process.env.NODE_ENV === "development",
//   // },
//   env: {
//     NEXT_PUBLIC_SUPABASE_URL: "https://mcqzpfkknjhuyegcmibg.supabase.co",
//     NEXT_PUBLIC_SUPABASE_ANON_KEY:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jcXpwZmtrbmpodXllZ2NtaWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NzczNTUsImV4cCI6MTk5NzU1MzM1NX0.Z3ixgyb5edVmTWeYLGb_BVZThb2GoGxPT1Iy5l4sHzM",
//     siteTitle: "Doggy Stickers",
//     siteDescription: "Get some Doggy Stickers!",
//     siteKeywords: "dog, stickers, fun",
//     siteUrl: "https://www.doggystickers.xyz",
//     siteImagePreviewUrl: "/images/main.jpg",
//     twitterHandle: "@deepwhitman",
//   },
//   images: {
//     domains: ["cdn.shopify.com"],
//   },
// });
