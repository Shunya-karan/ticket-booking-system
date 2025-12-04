import pool from "../config/db.js";
import { SEAT_LAYOUTS } from "../utils/seatlayouts.js";

export default class BUS {
    static async addBus(
        {
            bus_name, bus_number, bus_type, bus_images, start_point, end_point, travel_date, departure_time, arrival_time, price }) {

        let seat_layout;
        if (bus_type.toLowerCase() === "sleeper") {
            seat_layout = SEAT_LAYOUTS.sleeper_32;
        } else {
            seat_layout = SEAT_LAYOUTS.seater_40;
        }

        const [result] = await pool.query(
            `INSERT INTO buses(bus_name, bus_number, bus_type, bus_images, start_point, end_point, travel_date, departure_time, arrival_time, price,seat_layout)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
            [
                bus_name, bus_number, bus_type,
                JSON.stringify(bus_images), start_point, end_point, travel_date, departure_time, arrival_time, price, JSON.stringify(seat_layout)]);
        // console.log("MODEL IMAGES:", bus_images);
        // console.log("MODEL TYPE:", typeof bus_images);
        console.log("Seat Layout saved:", seat_layout);
        return result;
    }

    
    static async getAllBus() {
        const [result] = await pool.query("SELECT * FROM buses ORDER BY travel_date ASC");
        // console.log(result)
        // console.log("POOL:", pool);

        return result
    }

    static async updateBusDetails(bus_id, data) {
        let {
            bus_name, bus_number, bus_type, bus_images, start_point, end_point, travel_date, departure_time, arrival_time, price } = data;

        // If bus_images is JSON string → parse it
        if (typeof bus_images === "string") {
            try {
                bus_images = JSON.parse(bus_images);
            } catch (err) {
                bus_images = null;
            }
        }// If bus_images is array → string
        if (Array.isArray(bus_images)) {
            bus_images = JSON.stringify(bus_images);
        }

        const [oldData] = await pool.query("SELECT bus_type FROM buses WHERE id = ?", [bus_id]);

        const old_type = oldData[0].bus_type.toLowerCase();
        let seat_layout = null;

        // If bus type changed → generate new layout
        if (old_type !== bus_type.toLowerCase()) {
            if (bus_type.toLowerCase() === "sleeper") {
                seat_layout = SEAT_LAYOUTS.sleeper_32;
            } else {
                seat_layout = SEAT_LAYOUTS.seater_40;
            }
            seat_layout = JSON.stringify(seat_layout);
        }
        console.log(seat_layout)



        const [result] = await pool.query(
            `UPDATE buses 
         SET bus_name=?, bus_number=?, bus_type=?, bus_images=?, 
             start_point=?, end_point=?, travel_date=?, 
             departure_time=?, arrival_time=?, price=?,seat_layout = COALESCE(?, seat_layout)
         WHERE id=?`,
            [bus_name, bus_number, bus_type, bus_images, start_point, end_point, travel_date, departure_time, arrival_time, price, seat_layout, bus_id]);
        return result;
    }

    static async deleteBus(bus_id) {
        const [result] = await pool.query("Delete from buses where id =?", [bus_id]);
        return result;
    }

    static async searchBuses(from, to, date) {
        let query = `SELECT * FROM buses WHERE start_point = ? AND end_point = ?`;
        let params = [from, to];

        if (date) {
            query += ` AND travel_date = ?`;
            params.push(date);
        }

        const [rows] = await pool.query(query, params);
        return rows;
    }


    static async getActiveBus() {
        const [rows] = await pool.query(`select * from buses WHERE travel_date>=CURDATE() ORDER BY travel_date ASC`);
        return rows;
    }

    static async getBusById(bus_id) {
        const [rows] = await pool.query(`select * from buses where id=?`, [bus_id]);
        return rows.length > 0 ? rows[0] : null
    }

    static async getPopularRoutes() {
        const [rows] = await pool.query(`
    SELECT start_point AS from_city,
           end_point AS to_city,
           COUNT(*) AS total_buses
    FROM buses
    GROUP BY start_point, end_point
    ORDER BY total_buses DESC
    LIMIT 6;
  `);

        return rows;
    }


}


