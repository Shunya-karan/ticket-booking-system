import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SleeperSeat from "../../components/SleeperSeat";
import Seat from "../../components/Seat";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { BUSdetails } from "../../services/busService";

const BusDetails = () => {
  const { busId } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    loadBusDetails();
  }, []);

  const loadBusDetails = async () => {
    try {
      const res = await BUSdetails(busId)
      // console.log("Booked Seats From Backend:", res.data.booked_seats);

      setBus(res.data.buses);
      setBookedSeats((res.data.booked_seats || []).map(s => s.seat_number));
    } catch (err) {
      toast.error("Failed to fetch bus details");
    }
  };

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBook = () => {
    if (selectedSeats.length === 0) {
      toast.error("Select at least one seat");
      return;
    }
    console.log("NAVIGATING WITH:", { selectedSeats, bus });

    navigate(`/select-seat/${busId}`, {
      state: { selectedSeats,bus }
          
    });
  };

  if (!bus) {
    return (
      <> 
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading bus details...</p>
        </div>
      </div>
      </>
    );
  }

  const totalPrice = selectedSeats.length * bus.price;

  return (
    <> 
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pb-32">

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white font-medium mb-4 transition-colors group"
          >
            <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Results</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{bus.bus_name}</h1>
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                {bus.bus_type}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Bus Images Gallery */}
        {bus.bus_images?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Bus Gallery
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
              {bus.bus_images.map((img, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 snap-center"
                >
                  <img
                    src={img}
                    alt={`${bus.bus_name} ${index + 1}`}
                    className="w-80 h-56 object-contain rounded-2xl shadow-lg border border-orange-100"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bus Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Journey Details
          </h2>
          <div className="w-64 flex items-center gap-2 mb-6 p-3 bg-gradient-to-r from-blue-50 to-blue-300-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>

            <p className="text-sm font-medium text-gray-700">
              {bus.bus_number}
            </p>
          </div>
          <div className="w-64 flex items-center gap-2 mb-6 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium text-gray-700">
              {new Date(bus.travel_date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                weekday: "long",
              })}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Route Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium">Departure From</p>
                  <p className="text-lg font-bold text-gray-800">{bus.start_point}</p>
                  <p className="text-orange-600 font-semibold">{bus.departure_time}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium">Arrival At</p>
                  <p className="text-lg font-bold text-gray-800">{bus.end_point}</p>
                  <p className="text-orange-600 font-semibold">{bus.arrival_time}</p>
                </div>
              </div>
            </div>
              
            {/* Price & Type */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <p className="text-sm text-gray-600 font-medium mb-2">Fare Per Seat</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  ₹{bus.price}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <p className="text-sm text-gray-600 font-medium mb-2">Bus Type</p>
                <p className="text-2xl font-bold text-gray-800">{bus.bus_type}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seat Selection Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-orange-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Select Your Seats
            </h2>

            {selectedSeats.length > 0 && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Selected Seats</p>
                <p className="text-xl font-bold text-orange-600">{selectedSeats.length}</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded"></div>
              <span className="text-sm text-gray-600 font-medium">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
              <span className="text-sm text-gray-600 font-medium">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-400 rounded"></div>
              <span className="text-sm text-gray-600 font-medium">Booked</span>
            </div>
          </div>

          {/* Seat Layout */}
          <div className="overflow-x-auto">
            {bus.bus_type === "Sleeper" ? (
              <SleeperSeat
                seatLayout={bus.seat_layout}
                bookedSeats={bookedSeats}
                selectedSeats={selectedSeats}
                toggleSeat={toggleSeat}
              />
            ) : (
              <Seat
                seatLayout={bus.seat_layout}
                bookedSeats={bookedSeats}
                selectedSeats={selectedSeats}
                toggleSeat={toggleSeat}
              />
            )}
          </div>
        </div>

      </div>

      {/* Fixed Bottom Booking Bar */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-orange-500 shadow-2xl">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-sm text-gray-500">Selected Seats</p>
                  <p className="text-xl font-bold text-gray-800">
                    {selectedSeats.sort((a, b) => a - b).join(", ")}
                  </p>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div>
                  <p className="text-sm text-gray-500">Total Fare</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    ₹{totalPrice}
                  </p>
                </div>
              </div>

              <button
                onClick={handleBook}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center gap-3"
              >
                <span className="text-lg">Proceed to Book</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
    </>
  );
};

export default BusDetails;