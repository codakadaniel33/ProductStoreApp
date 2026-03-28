import { Connection, Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT

})

try {
    const client = await pool.connect();
    console.log("Connected to database successfully")
    try {
        await client.query("ALTER TABLE products ALTER COLUMN picture TYPE text")
        console.log("Ensured products.picture column is TEXT")
    } catch (alterError) {
        if (!alterError.message.includes('column \"picture\" of relation \"products\" does not exist')) {
            console.warn("Could not alter products.picture column type:", alterError.message)
        }
    }
    client.release(); // Release the client back to the pool after use
    
} catch (error) {
    console.log("Connection Error to database", error)
}

export default pool;