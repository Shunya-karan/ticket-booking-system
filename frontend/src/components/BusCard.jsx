const BusCard = ({ bus }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Bus Image with Overlay */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {bus.bus_images?.[0] ? (
          <>
            <img
              src={bus.bus_images[0]}
              alt={bus.bus_name}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            {/* Bus Type Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg">
              <span className="text-sm font-bold text-gray-800">{bus.bus_type}</span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Bus Name */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-1">{bus.bus_name}</h2>

        {/* Route Info */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 bg-green-50 rounded-xl p-3 border border-green-200">
            <p className="text-xs text-green-700 font-medium mb-1">From</p>
            <p className="text-gray-800 font-bold text-sm line-clamp-1">{bus.start_point}</p>
          </div>

          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <div className="flex-1 bg-red-50 rounded-xl p-3 border border-red-200">
            <p className="text-xs text-red-700 font-medium mb-1">To</p>
            <p className="text-gray-800 font-bold text-sm line-clamp-1">{bus.end_point}</p>
          </div>
        </div>

        {/* Travel Date & Time */}
        <div className="flex items-start gap-3 mb-4 bg-gray-50 p-3 rounded-xl">
          <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {new Date(bus.travel_date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                weekday: "long",
              })}
            </p>
            {bus.departure_time && (
              <p className="text-xs text-gray-600 mt-1">Departure: {bus.departure_time}</p>
            )}
          </div>
        </div>

        {/* Price & Button Row */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Starting from</p>
            <p className="text-3xl font-bold text-gray-800">
              ₹{bus.price}
            </p>
          </div>

          <a href={`/bus-details/${bus.id}`} className="flex-shrink-0">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <span>View</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BusCard;