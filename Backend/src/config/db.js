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

// check connection
// try {
//     const [rows] = await pool.query("SELECT * from users");
//     console.log("MySQL Test Query OK:", rows[1]);
// } catch (error) {
//     console.error("MySQL Connection Error:", error);
// }

export default pool;
