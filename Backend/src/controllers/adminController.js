import USER from "../models/userModel.js";
import BOOKING from "../models/bookingModel.js";
import BUS from "../models/busModel.js";


// ADD BUS (ADMIN)
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

// ACTIVE BUSES 
export const getActiveBus = async (req, res) => {
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
// UPDATE BUS (ADMIN)
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

// DELETE BUS (ADMIN)
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


export const getAdminStats = async (req, res) => {
  try {
    const totalBuses = await BUS.countAllBuses();
    const activeBuses = await BUS.countActiveBuses();
    const totalBookings = await BOOKING.countBookings();
    const totalUsers = await USER.countUsers();

    return res.status(200).json({
      totalBuses,
      activeBuses,
      totalBookings,
      totalUsers,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAllBookingofBus = async (req, res) => {
    try {
        const bus_id = req.params.bus_id

        const bus = await BUS.getBusById(bus_id);
        if (!bus) {
            return res.status(500).json({ message: "Bus not found" })
        }

        const bookings = await BOOKING.getAllBookingof(bus_id)

        if (bookings.length === 0) {
            return res.status(200).json({
                message: "No bookings found"
            });
        }

        for (let booking of bookings) {
            const seats = await BOOKING.getBookedSeatsById(booking.id);
            booking.seats = seats.map(s => s.seat_number);
            console.log(booking.seats)

            const User = await USER.getUserbyId(booking.user_id);
            booking.user = {
                id: User.id,
                name: User.name,
                email: User.email
            };

        }
        return res.status(200).json({
            message: "Bookings fetched successfully",
            bus_id,
            bus_name: bus.bus_name,
            bookings
        });


    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export const getRecentBookings = async (req, res) => {
  try {
    const data = await BOOKING.getRecentBookings(10);
    res.status(200).json({ bookings: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getRevenueOverview = async (req, res) => {
  try {
    const total = await BOOKING.getTotalRevenue();
    const today = await BOOKING.getTodayRevenue();


    return res.status(200).json({
      totalRevenue: total,
      todayRevenue: today
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUpcomingBuses = async (req, res) => {
  try {
    const buses = await BUS.getUpcomingBuses();
    res.status(200).json({ buses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSingleBus = async (req, res) => {
  try {
    const busId = req.params.bus_id;
    const bus = await BUS.getBusById(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    if (typeof bus.bus_images === "string") {
      bus.bus_images = JSON.parse(bus.bus_images);
    }

    return res.status(200).json({ bus });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;

    const admin = await USER.getUserbyId(adminId);

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "Admin not found" });
    }

    delete admin.password; 

    return res.status(200).json({ admin });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { name, password } = req.body;

    const payload = {};

    if (name) payload.name = name;
    // if (profile_image) payload.profile_image = profile_image;
    if (password) payload.password = password; // You can hash here

    await USER.updateUser(adminId, payload);

    return res.status(200).json({ message: "Profile updated successfully" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
