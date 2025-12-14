import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { SEARCHbus } from "../../services/busService";

const SearchBus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const from = query.get("from");
  const to = query.get("to");
  const date = query.get("date");

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuses();
  }, [from, to, date]);

  const fetchBuses = async () => {
    setLoading(true);
    
      const res = await SEARCHbus(from, to, date);
     if (res.data.buses.length === 0) {
  toast.error("No buses available for this route");
} else {
  setBuses(res.data.buses);
}

    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">

        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 shadow-2xl">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/90 hover:text-white font-medium mb-6 transition-colors group"
            >
              <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back</span>
            </button>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <span>{from}</span>
                  <span className="text-3xl">→</span>
                  <span>{to}</span>
                </h1>
                <div className="flex items-center gap-4 text-white/90">
                  <p className="flex items-center gap-2">\
                    {/* Date */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {date}
                  </p>
                  <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                  <p>{buses.length} {buses.length === 1 ? 'Bus' : 'Buses'} Found</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bus List Container */}
        <div className="max-w-6xl mx-auto px-6 py-8">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Searching for buses...</p>
            </div>
          ) : buses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Buses Found</h3>
              <p className="text-gray-500">Try searching for a different route or date</p>
            </div>
          ) : (
            <div className="space-y-6">
              {buses.map((bus, index) => (
                <div
                  key={bus.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-orange-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col lg:flex-row">

                    {/* Bus Images Slider */}
                    <div className="w-full lg:w-1/3 relative bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-80 lg:h-full">
                        {bus.bus_images?.length > 0 ? (
                          bus.bus_images.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`${bus.bus_name} ${index + 1}`}
                              className="w-full h-full object-contain snap-center flex-shrink-0"
                            />
                          ))
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {bus.bus_images?.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                          Swipe for more
                        </div>
                      )}
                    </div>

                    {/* Bus Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-1">
                            {bus.bus_name}
                          </h2>
                          <span className="inline-block bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-full">
                            {bus.bus_type}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            ₹{bus.price}
                          </p>
                          <p className="text-xs text-gray-500">per seat</p>
                        </div>
                      </div>

                      {/* Route Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium">From</p>
                            <p className="text-gray-800 font-semibold">{bus.start_point}</p>
                            <p className="text-sm text-gray-600">{bus.departure_time}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium">To</p>
                            <p className="text-gray-800 font-semibold">{bus.end_point}</p>
                            <p className="text-sm text-gray-600">{bus.arrival_time}</p>
                          </div>
                        </div>
                      </div>

                      {/* Travel Date */}
                      <div className="flex items-center gap-2 mb-6 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
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

                      {/* View Seats Button */}
                      <button
                        onClick={() => navigate(`/bus-details/${bus.id}`)}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span>View Seats & Book</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
        <Footer></Footer>
      </div>
    </>

  );
};

export default SearchBus;