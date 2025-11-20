import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ticketdb",
    waitForConnections: true,
    connectionLimit: 10
});

// Test query to check connection
try {
    const [rows] = await pool.query("SELECT 1");
    console.log("MySQL Test Query OK:", rows);
} catch (error) {
    console.error("MySQL Connection Error:", error);
}

export default pool;
