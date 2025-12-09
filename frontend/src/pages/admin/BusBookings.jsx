import { useEffect, useState } from "react";
import { BusBookingss } from "../../services/adminService";
import { useParams } from "react-router-dom";

const BusBookings = () => {
  const { bus_id } = useParams();  // ✅ FIXED
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Bus ID from params:", bus_id);

  useEffect(() => {
    if (bus_id) {
      loadBookings();
    }
  }, [bus_id]); // ✅ FIXED

  const loadBookings = async () => {
    try {
      const res = await BusBookingss(bus_id);
      console.log("My bookings:", res.data);

      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">Bookings for Bus ID: {bus_id}</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found for this bus.</p>
      ) : (
        <div>
          {bookings.map((b) => (
            <div key={b.id} className="border p-3 mb-3 rounded">
              <p><b>User:</b> {b.user?.name}</p>
              <p><b>Email:</b> {b.user?.email}</p>
              <p><b>Seats:</b> {b.seats.join(", ")}</p>
              <p><b>Total Price:</b> ₹{b.total_amount}</p>
              <p><b>Booking Date:</b> {new Date(b.booked_at).toLocaleDateString("en-In")}</p>
              <p><b>Status:</b> {b.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusBookings;
