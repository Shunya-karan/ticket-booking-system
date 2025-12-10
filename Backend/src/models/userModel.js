import pool from "../config/db.js";

export default class USER {

  static async signUp({ name, email, password }) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return result;
  }

  static async existingUsers(email) {
    const [rows] = await pool.query("Select * from users where email =?", [email]
    );
    return rows;
  }

  static async getUserbyId(id) {
    const [rows] = await pool.query(`SELECT id, name, email,role FROM users WHERE id = ?`, [id]);
    return rows.length > 0 ? rows[0] : null;
  }
  
  static async countUsers() {
  const [rows] = await pool.query("SELECT COUNT(*) AS total FROM users");
  return rows[0].total;
}
static async updateUser(userId, data) {
    const fields = [];
    const values = [];

    for (const key in data) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
    }

    values.push(userId);

    const query = `
        UPDATE users 
        SET ${fields.join(", ")}
        WHERE id = ?
    `;

    const [result] = await pool.query(query, values);
    return result;
}

}
