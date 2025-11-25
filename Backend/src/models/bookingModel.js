import pool from "../config/db.js";

export default class BOOKING{

    static async checkSeatAvailability(bus_id,seats){
        const [rows]=await pool.query(
            `SELECT seat_number from booked_seats where bus_id=? and seat_number IN (?)`,[bus_id,seats]
        );
        return rows;
    }


    static async createBooking(user_id,bus_id,total_amount){
    const [result] =await pool.query(`Insert into bookings (user_id,bus_id,total_amount,payment_status,status) values(?,?,?,'PAID','CONFIRMED')`,[user_id,bus_id,total_amount]
    );
    return result.insertId;
}

    static async saveBookedSeats(booking_id,bus_id,seats){
    const values = seats.map(seat=>[booking_id,bus_id,seat]);

    await pool.query(
        `Insert into booked_seats(booking_id,bus_id,seat_number) values ?`,[values]);
}


    static async getBookingById(booking_id) {
    const [rows] = await pool.query(
        `SELECT * FROM bookings WHERE id = ?`,
        [booking_id]
    );
    return rows.length > 0 ? rows[0] : null;
    }

    static async getBookedSeatsById(booking_id){
        const [rows]=await pool.query(`SELECT seat_number FROM booked_seats where booking_id=?`,[booking_id]
        );
        return rows;
    }

    static async removeSeats(booking_id, seatsToRemove) {
    await pool.query(
        `DELETE FROM booked_seats WHERE booking_id = ? AND seat_number IN (?)`,
        [booking_id, seatsToRemove]
    );
    }

    static async updateBookingAmount(booking_id, new_amount) {
    await pool.query(
        `UPDATE bookings SET total_amount = ? WHERE id = ?`,
        [new_amount, booking_id]
    );
    }

    static async cancelEntireBooking(booking_id) {
    await pool.query(
        `UPDATE bookings SET status = 'CANCELLED' WHERE id = ?`,
        [booking_id]
    );
    }


    

}