import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DB_URL;

if (!connectionString) {
    throw new Error('Database connection string is not defined in DB_URL');
}

const useSsl = connectionString.includes('supabase.co') || process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString,
    ssl: useSsl ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
});

export default pool;