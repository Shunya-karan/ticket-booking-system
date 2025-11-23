import pool from "../config/db.js";


export default class BUS {
    static async addBus(
        {
            bus_name, bus_number, bus_type, bus_images, start_point, end_point, travel_date, departure_time, arrival_time, price }) {
        const [result] = await pool.query(
            `INSERT INTO buses(bus_name, bus_number, bus_type, bus_images, start_point, end_point, travel_date, departure_time, arrival_time, price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                bus_name, bus_number, bus_type,
                JSON.stringify(bus_images), start_point, end_point, travel_date, departure_time, arrival_time, price]);
        console.log("MODEL IMAGES:", bus_images);
        console.log("MODEL TYPE:", typeof bus_images);

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
            bus_name,bus_number,bus_type, bus_images,start_point,end_point, travel_date,departure_time,arrival_time,price} = data;

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
        }const [result] = await pool.query(
            `UPDATE buses 
         SET bus_name=?, bus_number=?, bus_type=?, bus_images=?, 
             start_point=?, end_point=?, travel_date=?, 
             departure_time=?, arrival_time=?, price=? 
         WHERE id=?`,
            [bus_name,bus_number,bus_type,bus_images,start_point,end_point,travel_date,departure_time,arrival_time,price,bus_id ]);return result;
    }



    static async deleteBus(bus_id) {
        const [result] = await pool.query("Delete from buses where id =?", [bus_id]);
        return result;
    }

    static async searchBuses(from, to, date) {
        const [rows] = await pool.query(`select * from buses WHERE start_point =? and end_point=? and travel_date=?`, [from, to, date])
        return rows;
    }

    static async getActiveBus() {
        const [rows] = await pool.query(`select * from buses WHERE travel_date>=CURDATE() ORDER BY travel_date ASC`);
        return rows;
    }
}
