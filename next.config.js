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
      siteTitle: "Shop Pii",
      siteDescription: "Get your ultimate Pi's Product!",
      siteKeywords: "dog, stickers, fun",
      siteUrl: "https://www.doggystickers.xyz",
      siteImagePreviewUrl: "/images/main.jpg",
      twitterHandle: "@deepwhitman",
      NEXT_PUBLIC_LOCAL_STORAGE_NAME: "ShopPii",
    },
    images: {
      domains: ["mcqzpfkknjhuyegcmibg.supabase.co"],
    },
  };
  return nextConfig;
};
