import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/',
  out: './drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL!
  }
});
