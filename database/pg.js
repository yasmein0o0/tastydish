import "dotenv/config"
import { Pool } from "pg";

export const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
    password: process.env.PASSWORD
})