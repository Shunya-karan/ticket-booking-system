import pool from "../config/db.js";


export default class BUS {
    static async addBus({  bus_name, start_point,end_point,travel_date,departure_time,arrival_time,price}){
        const [result] = await pool.query("INSERT INTO buses(bus_name, start_point, end_point, travel_date, departure_time, arrival_time, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [bus_name, start_point, end_point, travel_date, departure_time, arrival_time, price]);

    return result;
    }

    static async getAllBus(){
        const [result]=await pool.query("SELECT * FROM buses ORDER BY travel_date ASC");
        return result 
    }

    static async updateBusDetails(bus_id,data){
        const{bus_name, start_point,end_point,travel_date,departure_time,arrival_time,price,}=data;

        const [result] = await pool.query ("UPDATE BUSES SET bus_name=?,start_point=?,end_point=?,travel_date=?,departure_time=?,arrival_time=?,price=? where id=?",[bus_name, start_point,end_point,travel_date,departure_time,arrival_time,price,bus_id]);
        return result
    }

    static async deleteBus(bus_id){
        const [result]=await pool.query("Delete from buses where id =?",[bus_id]);
        return result;
    }
}
