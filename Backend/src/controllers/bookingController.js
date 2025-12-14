
import BOOKING from "../models/bookingModel.js";
import BUS from "../models/busModel.js";
import USER from "../models/userModel.js";
import { sendEmail } from "../utils/mailer.js";

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
        if (!bus) return res.status(404).json({ error: "BUS NOT FOUND" });

        const alreadyBookedSeat = await BOOKING.checkSeatAvailability(bus_id, seats);
        if (alreadyBookedSeat.length > 0) {
            return res.status(409).json({
                error: "Some seats already booked",
                seats: alreadyBookedSeat.map(s => s.seat_number),
            });
        }

        const total_amount = seats.length * bus.price;

        const booking_id = await BOOKING.createBooking(user_id, bus_id, total_amount);
        await BOOKING.saveBookedSeats(booking_id, bus_id, seats);
        await BOOKING.savePassengerDetails(booking_id, seats, passengers);

        // 🔥 Fetch user data for email
        const user = await USER.getUserbyId(user_id);

        // 🔥 SEND EMAIL CONFIRMATION
        const emailHTML = `
      <h2>Your Bus Ticket is Confirmed 🎉</h2>
      <p>Hi <b>${user.name}</b>, thank you for booking with BusBuddy!</p>
      
      <h3>Booking Details:</h3>
      <p><b>Bus:</b> ${bus.bus_name}</p>
      <p><b>Route:</b> ${bus.start_point} → ${bus.end_point}</p>
      <p><b>Date:</b> ${bus.travel_date}</p>
      <p><b>Seats:</b> ${seats.join(", ")}</p>
      <p><b>Total Paid:</b> ₹${total_amount}</p>
      
      <br/>
      <p>Safe Travels! 🚍</p>
      <p><b>BusBuddy Team</b></p>
    `;

        sendEmail(user.email, "Your BusBuddy Ticket is Confirmed 🎫", emailHTML);

        return res.status(201).json({
            message: "Booking successful & email sent",
            booking_id,
            seats,
            total_amount,
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const cancelSelectedSeats = async (req, res) => {
    try {
        const user_id = req.user.id;
        const booking_id = req.params.booking_id;
        const { seats } = req.body;

        if (!Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({ error: "Seats array is required" });
        }

        // Fetch booking
        const booking = await BOOKING.getBookingById(booking_id);
        if (!booking) return res.status(404).json({ error: "Booking not found" });

        if (booking.user_id !== user_id)
            return res.status(403).json({ error: "Unauthorized" });

        if (booking.status === "CANCELLED")
            return res.status(400).json({ error: "Booking already cancelled" });

        // Fetch bus
        const bus = await BUS.getBusById(booking.bus_id);

        // Fetch booked seats
        const bookedSeats = await BOOKING.getBookedSeatsById(booking_id);
        const bookedSeatList = bookedSeats.map(s => s.seat_number);

        // Validate seats belong to this booking
        const invalidSeats = seats.filter(s => !bookedSeatList.includes(s));
        if (invalidSeats.length > 0) {
            return res.status(400).json({
                error: "Some seats do not belong to this booking",
                invalidSeats
            });
        }

        // Remove seats + passenger details
        await BOOKING.removeSeats(booking_id, seats);

        // Remaining seats
        const remainingSeats = bookedSeatList.filter(seat => !seats.includes(seat));

        // If no seats remain → cancel entire booking
        if (remainingSeats.length === 0) {
            await BOOKING.cancelEntireBooking(booking_id);

            return res.status(200).json({
                message: "All seats cancelled. Booking cancelled.",
                booking_id
            });
        }

        // Update booking amount
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

export const getTicketById = async (req, res) => {
  try {
    const { booking_id } = req.params;

    const booking = await BOOKING.getFullBookingById(booking_id);

    if (!booking) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Safely parse images
    if (booking.bus?.bus_images && typeof booking.bus.bus_images === "string") {
      try {
        booking.bus.bus_images = JSON.parse(booking.bus.bus_images);
      } catch {
        booking.bus.bus_images = [];
      }
    }

    return res.status(200).json({ booking });

  } catch (err) {
    console.error("TICKET API ERROR:", err);
    return res.status(500).json({ error: "Failed to load ticket" });
  }
};






