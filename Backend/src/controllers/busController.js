// import { json } from "express";
import BUS from "../models/busModel.js";
import BOOKING from "../models/bookingModel.js";


// ADD BUS
export const addBus = async (req, res) => {
    try {
        const {
            bus_name,bus_number,bus_type,bus_images, start_point,end_point,travel_date, departure_time,arrival_time,price} = req.body;

        // Validation
        if ( !bus_name ||!bus_number ||!bus_type ||
            !bus_images ||!Array.isArray(bus_images) ||bus_images.length === 0 ||!start_point ||!end_point ||!travel_date ||!departure_time ||!arrival_time ||!price) {
            return res.status(400).json({ message: "All fields are required, including images" });
        }
        console.log("BUS IMAGES RECEIVED:", bus_images);
        console.log("TYPE:", typeof bus_images);

        const result = await BUS.addBus({
            bus_name,bus_number,bus_type,bus_images,start_point,end_point, travel_date,departure_time,arrival_time,price });

        return res.status(201).json({
            message: "Bus added successfully",
            bus_id: result.insertId
        })
    } 
        catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// GET ALL BUSES (ADMIN)
export const getAllBuses = async (req, res) => {
    try {
        const buses = await BUS.getAllBus();

    buses.forEach(bus => {
        if (typeof bus.bus_images === "string") {
            bus.bus_images = JSON.parse(bus.bus_images);
        }
    });


        return res.status(200).json({ message: "All buses fetched successfully", buses });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// UPDATE BUS
export const updateBus = async (req, res) => {
    try {
        const busId = req.params.bus_id;
        const updateResult = await BUS.updateBusDetails(busId, req.body);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "Bus not found", busId });
        }

        return res.status(200).json({ message: "Updated successfully", busId });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// DELETE BUS
export const deletingBus = async (req, res) => {
    try {
        const busId = req.params.bus_id;
        const deleteResult = await BUS.deleteBus(busId);

        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ message: "Bus not found", busId });
        }

        return res.status(200).json({ message: "Deleted successfully", busId });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// SEARCH BUSES
export const getSearchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "from and to are required" });
    }

    const buses = await BUS.searchBuses(from, to, date);

    buses.forEach(bus => {
      if (typeof bus.bus_images === "string") {
        bus.bus_images = JSON.parse(bus.bus_images);
      }
    });

    if (buses.length === 0) {
      return res.status(404).json({ message: "No buses found" });
    }

    return res.status(200).json({
      message: "Buses fetched successfully",
      buses,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


// ACTIVE BUSES
export const getAllActiveBus = async (req, res) => {
    try {
        const buses = await BUS.getActiveBus();

    buses.forEach(bus => {
    if (typeof bus.bus_images === "string") {
        bus.bus_images = JSON.parse(bus.bus_images);
    }
    });


        if (buses.length === 0) {
            return res.status(400).json({ message: "No buses are active" });
        }

        return res.status(200).json({ message: "Active buses fetched", buses });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

//GET BUS DETAILS BY ID
export const getBusDetails =async(req,res)=>{
    try{
        const bus_id = req.params.bus_id;

        const buses = await BUS.getBusById(bus_id);

        if(!buses){
            return res.status(404).json({message:"Bus not found"});
        }

        if(typeof buses.bus_images==="string"){
            try{
                buses.bus_images = JSON.parse(buses.bus_images);
            }catch{
                buses.bus_images=[];
            }
        }

                // Parse seat layout
        if (typeof buses.seat_layout === "string") {
            try {
                buses.seat_layout = JSON.parse(buses.seat_layout);
            } catch {
                buses.seat_layout = null;
            }
        }

        const bookedSeats = await BOOKING.getBookedSeatsByBus(bus_id);
        return res.status(200).json({
            message: "Bus details fetched successfully",
            buses,
            booked_seats: bookedSeats
        });
    }catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const getPopularRoutes = async (req, res) => {
  try {
    const routes = await BUS.getPopularRoutes();

    return res.status(200).json({
      message: "Popular routes fetched",
      routes   // <-- IMPORTANT
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


