import { defineConfig } from 'drizzle-kit';

if (!process.env.DB_URL) throw new Error('`DB_URL` is not set in .env.local');

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DB_URL
  }
});
