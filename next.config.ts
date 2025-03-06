import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
    PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  // Increase time limit for API routes to handle longer requests
  api: {
    responseLimit: "8mb",
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

export default nextConfig;
