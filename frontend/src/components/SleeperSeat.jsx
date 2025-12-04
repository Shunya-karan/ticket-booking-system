const SleeperSeat = ({ seatLayout, bookedSeats, selectedSeats, toggleSeat }) => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-xl">
      {/* Driver Section */}
      <div className="flex justify-end mb-8">
        <div className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-xl px-6 py-3 flex items-center gap-3 shadow-md">
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-bold text-orange-700">Driver</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {/* Lower Deck */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Lower Deck</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {seatLayout?.lower?.map((seat) => {
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);

              return (
                <button
                  key={seat}
                  disabled={isBooked}
                  onClick={() => toggleSeat(seat)}
                  className={`
                    relative p-5 rounded-xl font-bold text-lg transition-all duration-200 
                    border-2 shadow-md min-h-[80px]
                    ${
                      isBooked
                        ? "bg-gray-400 border-gray-500 text-white cursor-not-allowed opacity-60"
                        : isSelected
                        ? "bg-gradient-to-br from-orange-500 to-red-500 border-orange-600 text-white scale-105 shadow-lg"
                        : "bg-white border-gray-300 text-gray-700 hover:border-orange-400 hover:shadow-lg hover:scale-105"
                    }
                  `}
                >
                  {/* Sleeper Berth Icon */}
                  <div className="flex flex-col items-center gap-2">
                    <svg 
                      className={`w-10 h-10 ${
                        isBooked ? "text-white" : isSelected ? "text-white" : "text-blue-600"
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold">{seat}</span>
                  </div>

                  {/* Selected Checkmark */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  {/* Booked Lock Icon */}
                  {isBooked && (
                    <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1.5 shadow-md">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Upper Deck */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Upper Deck</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {seatLayout?.upper?.map((seat) => {
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);

              return (
                <button
                  key={seat}
                  disabled={isBooked}
                  onClick={() => toggleSeat(seat)}
                  className={`
                    relative p-5 rounded-xl font-bold text-lg transition-all duration-200 
                    border-2 shadow-md min-h-[80px]
                    ${
                      isBooked
                        ? "bg-gray-400 border-gray-500 text-white cursor-not-allowed opacity-60"
                        : isSelected
                        ? "bg-gradient-to-br from-orange-500 to-red-500 border-orange-600 text-white scale-105 shadow-lg"
                        : "bg-white border-gray-300 text-gray-700 hover:border-orange-400 hover:shadow-lg hover:scale-105"
                    }
                  `}
                >
                  {/* Sleeper Berth Icon */}
                  <div className="flex flex-col items-center gap-2">
                    <svg 
                      className={`w-10 h-10 ${
                        isBooked ? "text-white" : isSelected ? "text-white" : "text-purple-600"
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold">{seat}</span>
                  </div>

                  {/* Selected Checkmark */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  {/* Booked Lock Icon */}
                  {isBooked && (
                    <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1.5 shadow-md">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Helper Text */}
      <div className="text-center mt-8 text-sm text-gray-500 italic">
        Tap on available berths to select
      </div>
    </div>
  );
};

export default SleeperSeat;