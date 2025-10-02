import "dotenv/config"
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE,
    ssl: { rejectUnauthorized: false }
});

export default pool;
