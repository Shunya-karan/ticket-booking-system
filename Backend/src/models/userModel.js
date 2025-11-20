import pool from "../config/db.js";

export default class USER {

    static async signUp({ name, email, password }){
      const [result] = await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, password]
        );
        return result;
    }

    static async existingUsers(email){
      const [rows] = await pool.query("Select * from users where email =?",[email]
        );
        return rows;
    }
    
}
