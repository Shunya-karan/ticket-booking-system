import { useEffect, useState } from "react";
import { getMyBookings, CancelSelectedSeats } from "../../services/bookingService";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await getMyBookings();
      console.log("My bookings:", res.data);
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelSelectedSeatsAPI = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat to cancel");
      return;
    }

    setCancelling(true);
    try {
      await CancelSelectedSeats(selectedBooking.id, selectedSeats);
      toast.success("Selected seats cancelled successfully");
      setShowSeatModal(false);
      setSelectedSeats([]);
      loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.error || "Error cancelling seats");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-gray-50 pb-20">

        {/* Page Header */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 shadow-xl">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">My Bookings</h1>
                <p className="text-white/90">Manage and view all your bus reservations</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                <p className="text-white/80 text-sm">Total Bookings</p>
                <p className="text-white text-3xl font-bold">{bookings.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">

          {/* Empty State */}
          {bookings.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
              <p className="text-gray-500 mb-6">Start your journey by booking your first bus ticket</p>
              <a href="/">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition">
                  Book Now
                </button>
              </a>
            </div>
          )}

          {/* Bookings List */}
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Booking Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-white/80 text-sm font-medium">Booking ID</p>
                      <p className="text-white text-2xl font-bold">#{booking.id}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg ${booking.status === "CONFIRMED"
                            ? "bg-green-500 text-white"
                            : "bg-gradient-to-r from-red-600 to-gray-500 text-white"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Content */}
                <div className="p-6">

                  {/* Bus Information */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">{booking.bus_name}</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">From</p>
                          <p className="text-gray-800 font-bold">{booking.bus.start_point}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">To</p>
                          <p className="text-gray-800 font-bold">{booking.bus.end_point}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 p-3 bg-gray-100 rounded-lg">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-semibold text-gray-700">
                        Travel Date: {new Date(booking.bus.travel_date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          weekday: "long",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Seats and Amount */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                        </svg>
                        <p className="text-sm text-blue-700 font-medium">Seats Booked</p>
                      </div>
                      <p className="text-xl font-bold text-blue-800">{booking.seats.join(", ")}</p>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">₹{booking.total_amount}</p>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <h3 className="text-lg font-bold text-gray-800">Passenger Details</h3>
                    </div>

                    <div className="space-y-3">
                      {(booking.passengers || []).map((p, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="flex items-start gap-4">
                            <div className="bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div className="flex-1 grid md:grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Name</p>
                                <p className="text-gray-800 font-bold">{p.name}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Seat Number</p>
                                <p className="text-gray-800 font-bold">{p.seat_number}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Age</p>
                                <p className="text-gray-800 font-semibold">{p.age} years</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Gender</p>
                                <p className="text-gray-800 font-semibold">{p.gender}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href={`/ticket/${booking.id}`} target="_blank" rel="noopener noreferrer">
                      <button
                        className="flex-1 w-64 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        <span>Print Ticket</span>
                      </button>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setSelectedSeats([]);
                        setShowSeatModal(true);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Cancel Seats</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />

      {/* Cancel Seats Modal */}
      {showSeatModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Cancel Seats</h2>
                    <p className="text-white/80 text-sm">Select seats to cancel</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSeatModal(false)}
                  className="text-white/80 hover:text-white transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  Booking ID: <span className="font-bold text-gray-800">#{selectedBooking?.id}</span>
                </p>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedBooking?.seats.map((seat) => (
                    <label
                      key={seat}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedSeats.includes(seat)
                          ? "bg-red-50 border-red-500"
                          : "bg-gray-50 border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <input
                        type="checkbox"
                        value={seat}
                        checked={selectedSeats.includes(seat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSeats([...selectedSeats, seat]);
                          } else {
                            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
                          }
                        }}
                        className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                        </svg>
                        <span className="font-bold text-gray-800">Seat {seat}</span>
                      </div>
                      {selectedSeats.includes(seat) && (
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-blue-800">
                        {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Seats: {selectedSeats.sort((a, b) => a - b).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSeatModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
                >
                  Cancel
                </button>

                <button
                  onClick={cancelSelectedSeatsAPI}
                  disabled={cancelling || selectedSeats.length === 0}
                  className={`flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${cancelling || selectedSeats.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-700 hover:shadow-xl"
                    }`}
                >
                  {cancelling ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Confirm Cancel</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBookings;