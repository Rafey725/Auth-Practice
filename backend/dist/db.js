import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practice_db',
    password: 'hanzila_db',
    port: 5432
});
export const db = drizzle(pool);
