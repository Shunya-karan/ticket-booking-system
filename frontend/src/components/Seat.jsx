const Seat = ({ seatLayout, bookedSeats, selectedSeats, toggleSeat }) => {
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

      {/* Seat Grid */}
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {seatLayout?.rows?.map((row, rowIndex) =>
          row.map((seat, colIndex) => {
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);

            return (
              <button
                key={seat}
                disabled={isBooked}
                onClick={() => toggleSeat(seat)}
                className={`
                  relative p-4 rounded-xl font-bold text-lg transition-all duration-200 
                  border-2 shadow-md
                  ${
                    isBooked
                      ? "bg-gray-400 border-gray-500 text-white cursor-not-allowed opacity-60"
                      : isSelected
                      ? "bg-gradient-to-br from-orange-500 to-red-500 border-orange-600 text-white scale-105 shadow-lg"
                      : "bg-white border-gray-300 text-gray-700 hover:border-orange-400 hover:shadow-lg hover:scale-105"
                  }
                `}
              >
                {/* Seat Icon */}
                <div className="flex flex-col items-center gap-1">
                  <svg 
                    className={`w-8 h-8 ${
                      isBooked ? "text-white" : isSelected ? "text-white" : "text-gray-600"
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 18v3h3v-3h10v3h3v-6H4v3zm15-8h3v3h-3v-3zM2 10h3v3H2v-3zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"/>
                  </svg>
                  <span className="text-sm">{seat}</span>
                </div>

                {/* Selected Checkmark */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                {/* Booked Lock Icon */}
                {isBooked && (
                  <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-md">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Aisle Indicator (optional) */}
      <div className="text-center mt-6 text-sm text-gray-500 italic">
        Tap on available seats to select
      </div>
    </div>
  );
};

export default Seat;