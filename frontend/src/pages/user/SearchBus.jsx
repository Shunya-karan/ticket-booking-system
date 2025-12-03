import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const SearchBus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const from = query.get("from");
  const to = query.get("to");
  const date = query.get("date");

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, [from, to, date]);

  const fetchBuses = async () => {
    try {
      const res = await api.get(
        `/bus/search?from=${from}&to=${to}&date=${date}`
      );

      setBuses(res.data.buses);
    } catch (err) {
      toast.error("No buses found for this route");
      setBuses([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold">
            Buses from {from} → {to}
          </h1>
          <p className="opacity-90 text-lg">Travel Date: {date}</p>
        </div>
      </div>

      {/* Bus List */}
      <div className="max-w-5xl mx-auto mt-8 px-4">

        {buses.length === 0 && (
          <p className="text-center text-gray-500 mt-20 text-lg">
            No buses available. Try another route.
          </p>
        )}

        {buses.map((bus) => (
          <div
            key={bus.bus_id}
            className="bg-white p-4 mb-6 rounded-2xl shadow-lg border hover:shadow-xl transition"
          >
            <div className="flex flex-col md:flex-row gap-4">

              {/* Bus Images Slider */}
            <div className="w-full md:w-1/3 relative overflow-hidden rounded-xl">
            <div className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide ">
                {bus.bus_images?.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt="Bus"
                    className="w-full object-cover snap-center flex-shrink-0 "
                />
                ))}
            </div>
            </div>


              {/* Bus Details */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {bus.bus_name} <span className="text-sm text-gray-500">({bus.bus_type})</span>
                </h2>

                <div className="mt-2 grid grid-cols-2 text-gray-700 text-sm">
                  <p><span className="font-semibold">From:</span> {bus.start_point}</p>
                  <p><span className="font-semibold">To:</span> {bus.end_point}</p>

                  <p><span className="font-semibold">Departure:</span> {bus.departure_time}</p>
                  <p><span className="font-semibold">Arrival:</span> {bus.arrival_time}</p>
                </div>

                <p className="mt-3 text-lg font-bold text-orange-600">
                  ₹{bus.price}
                </p>
              </div>

              {/* Button */}
              <div className="flex items-center md:w-1/4">
                <button
                  onClick={() => navigate(`/bus-details/${bus.bus_id}`)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-[1.02] transition"
                >
                  View Seats
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default SearchBus;
