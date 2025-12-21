import { serial, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password_hash: text().notNull(),
    created_at: timestamp().defaultNow(),
    username: text('username').notNull().default('')
});
