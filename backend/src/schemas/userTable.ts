import { serial, primaryKey, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 255 }).notNull().default(' '),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password_hash: text().notNull(),
    created_at: timestamp().defaultNow(),
})
