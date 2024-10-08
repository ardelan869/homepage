import { boolean, pgTable, text } from 'drizzle-orm/pg-core';

const posts = pgTable('posts', {
  slug: text('slug').primaryKey().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  created_at: text('created_at').notNull(),
  updated_at: text('updated_at').notNull(),
  visible: boolean('visible').notNull().default(false)
});

export type Post = typeof posts.$inferSelect;

export default posts;
