import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import IMAGES from "../assets/image";

const Ticket = () => {
  const { booking_id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    try {
      const res = await api.get(`/booking/ticket/${booking_id}`);
      setBooking(res.data.booking);

      setTimeout(() => window.print(), 800);
    } catch (err) {
      console.error(err);
    }
  };

  if (!booking) {
    return <p className="p-10 text-center">Loading Ticket...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white shadow-xl rounded-xl border-2 border-orange-200 mt-10">

      {/* Header */}
      <div className="text-center mb-8">
        <img src={IMAGES.logo} alt="Logo" className="w-28 mx-auto mb-3" />
        <h1 className="text-4xl font-bold text-orange-600">Bus Ticket</h1>
        <p className="text-gray-600 mt-1">Booking ID: #{booking.id}</p>
      </div>

      {/* Bus Info */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-bold">{booking.bus.bus_name}</h2>
        <p>{booking.bus.start_point} → {booking.bus.end_point}</p>
        <p>
          {new Date(booking.bus.travel_date).toLocaleDateString("en-IN")}
        </p>
      </div>

      {/* Seats */}
      <div className="mb-4">
        <h3 className="font-bold">Seats</h3>
        <p>{booking.seats.join(", ")}</p>
      </div>

      {/* Passengers */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Passengers</h3>
        {booking.passengers.map((p, i) => (
          <div key={i} className="border p-3 rounded mb-2">
            <p><b>Name:</b> {p.name}</p>
            <p><b>Seat:</b> {p.seat_number}</p>
            <p><b>Age:</b> {p.age}</p>
            <p><b>Gender:</b> {p.gender}</p>
          </div>
        ))}
      </div>

      {/* Amount */}
      <div className="text-right text-xl font-bold text-orange-600">
        Total: ₹{booking.total_amount}
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        Thank you for booking with us!
      </p>
    </div>
  );
};

export default Ticket;
