// import { json } from "express";
import BUS from "../models/busModel.js";
import BOOKING from "../models/bookingModel.js";


// SEARCH BUSES 
export const getSearchBuses = async (req, res) => {
  try {
    let { from, to, date } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "from and to are required" });
    }

    from = from.trim();
    to = to.trim();

    const buses = await BUS.searchBuses(from, to, date);

    buses.forEach(bus => {
      if (typeof bus.bus_images === "string") {
        try {
          bus.bus_images = JSON.parse(bus.bus_images);
        } catch {
          bus.bus_images = [];
        }
      }
    });

    // ✅ IMPORTANT: Always return 200
    return res.status(200).json({
      message: buses.length ? "Buses found" : "No buses available",
      buses,
    });

  } catch (err) {
    console.error(err);
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
export const getBusDetails = async (req, res) => {
  try {
    const bus_id = req.params.bus_id;

    const buses = await BUS.getBusById(bus_id);

    if (!buses) {
      return res.status(404).json({ message: "Bus not found" });
    }

    if (typeof buses.bus_images === "string") {
      try {
        buses.bus_images = JSON.parse(buses.bus_images);
      } catch {
        buses.bus_images = [];
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
  } catch (err) {
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


