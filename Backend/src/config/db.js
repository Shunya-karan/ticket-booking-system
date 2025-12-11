import dotenv from "dotenv";

import mysql from "mysql2/promise";

dotenv.config();
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10
});

export default pool;
