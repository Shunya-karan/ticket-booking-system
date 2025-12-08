import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyBookings } from "../services/bookingService";

const Ticket = () => {
  const { booking_id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    const res = await getMyBookings();
    const data = res.data.bookings.find((b) => b.id == booking_id);
    setBooking(data);

    setTimeout(() => {
      window.print(); // auto print when ticket page loads
    }, 800);
  };

  if (!booking) return <p className="p-10 text-center">Loading Ticket...</p>;

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white shadow-xl rounded-xl border-2 border-orange-200 mt-10">
      {/* Header */}
      
<div className="text-center mb-8">
  <img 
    src="../public/logo.png"
    alt="Company Logo" 
    className="w-28 mx-auto mb-3"
  />

  <h1 className="text-4xl font-bold text-orange-600">Bus Ticket</h1>
  <p className="text-gray-600 font-medium mt-1">Booking ID: #{booking.id}</p>
</div>


      {/* Bus Info */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800">{booking.bus_name}</h2>
        <p className="text-gray-700">
          {booking.bus.start_point} → {booking.bus.end_point}
        </p>
        <p className="text-gray-600">
          Date:{" "}
          {new Date(booking.bus.travel_date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            weekday: "long",
          })}
        </p>
      </div>

      {/* Seats */}
      <div className="mb-4">
        <h3 className="font-bold text-gray-800 mb-2">Seats</h3>
        <p className="text-gray-700">{booking.seats.join(", ")}</p>
      </div>

      {/* Passengers */}
      <div className="mb-4">
        <h3 className="font-bold text-gray-800 mb-2">Passenger Details</h3>

        {booking.passengers.map((p, i) => (
          <div key={i} className="border p-3 rounded-xl mb-2">
            <p><b>Name:</b> {p.name}</p>
            <p><b>Seat:</b> {p.seat_number}</p>
            <p><b>Age:</b> {p.age}</p>
            <p><b>Gender:</b> {p.gender}</p>
          </div>
        ))}
      </div>

      {/* Amount */}
      <div className="text-right">
        <p className="text-xl font-bold text-orange-600">
          Total Amount: ₹{booking.total_amount}
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 text-sm mt-6">
        Thank you for booking with us!
      </p>
    </div>
  );
};

export default Ticket;
