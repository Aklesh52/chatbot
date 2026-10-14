// Vercel's Neon integration exposes the connection string as DATABASE_URL.
export const databaseUrl = () =>
  process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
