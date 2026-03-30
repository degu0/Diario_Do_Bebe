import { defineConfig, env } from '@prisma/config';
import "dotenv/config";
export default defineConfig({
  // the main entry for your schema
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    path: "prisma/migrations",
    // Usamos 'npx ts-node' para garantir que ele ache o executor
    // E removemos o './' para o Windows não se confundir
    seed: 'npx ts-node prisma/seed.ts',
  },
});
