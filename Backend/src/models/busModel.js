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
        bus_name,
        bus_number,
        bus_type,
        bus_images,
        start_point,
        end_point,
        travel_date,
        departure_time,
        arrival_time,
        price
    } = data;

    // Convert images to JSON
    if (Array.isArray(bus_images)) {
        bus_images = JSON.stringify(bus_images);
    }

    // Get old bus type
    const [oldData] = await pool.query(
        "SELECT bus_type FROM buses WHERE id = ?",
        [bus_id]
    );

    const old_type = oldData[0].bus_type.toLowerCase();
    const new_type = bus_type.toLowerCase();

    let seat_layout = null;

    // If type changed → generate new seat layout
    if (old_type !== new_type) {
        seat_layout =
            new_type === "sleeper"
                ? JSON.stringify(SEAT_LAYOUTS.sleeper_32)
                : JSON.stringify(SEAT_LAYOUTS.seater_40);
    }

    // Update base fields (always)
    await pool.query(
        `UPDATE buses 
        SET bus_name=?, bus_number=?, bus_type=?, bus_images=?, 
            start_point=?, end_point=?, travel_date=?, departure_time=?, 
            arrival_time=?, price=?
        WHERE id=?`,
        [
            bus_name,
            bus_number,
            bus_type,
            bus_images,
            start_point,
            end_point,
            travel_date,
            departure_time,
            arrival_time,
            price,
            bus_id
        ]
    );

    // Update seat_layout only if changed
    if (seat_layout) {
        await pool.query(
            `UPDATE buses SET seat_layout=? WHERE id=?`,
            [seat_layout, bus_id]
        );
    }

    return { affectedRows: 1 };
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
        const [rows] = await pool.query(`
    SELECT * FROM buses 
    WHERE DATE(travel_date) >= CURDATE() 
    ORDER BY travel_date ASC
  `);
        return rows;
    }


    static async getBusById(bus_id) {
        const [rows] = await pool.query(`select * from buses where id=?`, [bus_id]);
        return rows.length > 0 ? rows[0] : null
    }

    static async getPopularRoutes() {
        const [rows] = await pool.query(`
    SELECT 
      b.start_point AS from_city,
      b.end_point AS to_city,
      COUNT(DISTINCT b.id) AS total_buses,
      COUNT(bk.id) AS total_bookings
    FROM buses b
    LEFT JOIN bookings bk ON bk.bus_id = b.id
    GROUP BY b.start_point, b.end_point
    ORDER BY total_bookings DESC
    LIMIT 6;
  `);

        return rows;
    }

    static async countAllBuses() {
        const [rows] = await pool.query("SELECT COUNT(*) AS total FROM buses");
        return rows[0].total;
    }

    static async countActiveBuses() {
        const [rows] = await pool.query(
            "SELECT COUNT(*) AS total FROM buses WHERE DATE(travel_date) >= CURDATE()"
        );
        return rows[0].total;
    }

    static async getUpcomingBuses() {
  const [rows] = await pool.query(
    `SELECT id, bus_name, start_point, end_point, travel_date 
     FROM buses
     WHERE travel_date >= CURDATE()
     ORDER BY travel_date ASC
     LIMIT 5`
  );
  return rows;
}

}


