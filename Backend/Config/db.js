import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: process.env.DB_URL?.includes('supabase.co')
      ? { rejectUnauthorized: false }
      : process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false
});

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
});

export default pool;