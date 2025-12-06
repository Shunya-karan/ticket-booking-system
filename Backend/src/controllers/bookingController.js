import BOOKING from "../models/bookingModel.js";
import BUS from "../models/busModel.js";
import USER from "../models/userModel.js";


export const bookseats = async (req, res) => {

    try {
        const user_id = req.user.id;
        const { bus_id, seats, passengers } = req.body;

        if (!bus_id || !Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({ error: "bus_id and seats[] are required" });
        }

        if (!passengers || passengers.length !== seats.length) {
            return res.status(400).json({ error: "passengers Info required for each seats" });

        }

        const bus = await BUS.getBusById(bus_id);
        if (!bus) {
            return res.status(404).json({ error: "BUS NOT FOUND" });
        }

        const alreadyBookedSeat = await BOOKING.checkSeatAvailability(bus_id, seats);
        if (alreadyBookedSeat.length > 0) {
            return res.status(409).json({
                error: "some seats already booked",
                seats: alreadyBookedSeat.map(s => s.seat_number)
            });
        }

        const total_amount = seats.length * bus.price;

        const booking_id = await BOOKING.createBooking(user_id, bus_id, total_amount);

        await BOOKING.saveBookedSeats(booking_id, bus_id, seats);

        await BOOKING.savePassengerDetails(booking_id, seats, passengers)

        return res.status(201).json({
            message: "Booking successful",
            booking_id,
            seats,
            total_amount
        });


    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

export const cancelSelectedSeats = async (req, res) => {
    try {
        const user_id = req.user.id;
        const booking_id = req.params.booking_id;
        const { seats } = req.body;

        if (!Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({ error: "Seats array is required" });
        }

        // 1. Fetch booking
        const booking = await BOOKING.getBookingById(booking_id);
        if (!booking) return res.status(404).json({ error: "Booking not found" });

        if (booking.user_id !== user_id)
            return res.status(403).json({ error: "Unauthorized" });

        if (booking.status === "CANCELLED")
            return res.status(400).json({ error: "Booking already cancelled" });

        // 2. Fetch bus
        const bus = await BUS.getBusById(booking.bus_id);

        // 3. Fetch booked seats
        const bookedSeats = await BOOKING.getBookedSeatsById(booking_id);
        const bookedSeatList = bookedSeats.map(s => s.seat_number);

        // 4. Validate seats belong to this booking
        const invalidSeats = seats.filter(s => !bookedSeatList.includes(s));
        if (invalidSeats.length > 0) {
            return res.status(400).json({
                error: "Some seats do not belong to this booking",
                invalidSeats
            });
        }

        // 5. Remove seats + passenger details
        await BOOKING.removeSeats(booking_id, seats);

        // 6. Remaining seats
        const remainingSeats = bookedSeatList.filter(seat => !seats.includes(seat));

        // 7. If no seats remain → cancel entire booking
        if (remainingSeats.length === 0) {
            await BOOKING.cancelEntireBooking(booking_id);

            return res.status(200).json({
                message: "All seats cancelled. Booking cancelled.",
                booking_id
            });
        }

        // 8. Update booking amount
        const newAmount = remainingSeats.length * bus.price;
        await BOOKING.updateBookingAmount(booking_id, newAmount);

        return res.status(200).json({
            message: "Selected seats cancelled successfully",
            cancelled_seats: seats,
            remaining_seats: remainingSeats,
            new_amount: newAmount
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getMyBookings = async (req, res) => {

    try {

        const user_id = req.user.id

        const bookings = await BOOKING.getBookingsByUser(user_id)

        if (bookings.length === 0) {
            return res.status(200).json({
                message: "No bookings found",
                bookings: []
            });
        }
        for (let booking of bookings) {

            // Fetch seats
            const seats = await BOOKING.getBookedSeatsById(booking.id);
            booking.seats = seats.map(s => s.seat_number);

            // Fetch passengers
            const passengers = await BOOKING.getPassengersDetailsById(booking.id);
            booking.passengers = passengers; // <--- IMPORTANT

            // Fetch bus details
            const bus = await BUS.getBusById(booking.bus_id);

            // Parse images
            if (typeof bus.bus_images === "string") {
                try {
                    bus.bus_images = JSON.parse(bus.bus_images);
                } catch {
                    bus.bus_images = [];
                }
            }

            booking.bus = bus;
        }

        return res.status(200).json({
            message: "My bookings fetched successfully",
            bookings
        });


    } catch (err) {
        return res.json({ message: err.message })
    }
}

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