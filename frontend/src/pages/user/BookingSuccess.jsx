import { useLocation, useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
const BookingSuccess = () => {
  const { bookingId } = useParams();
  const { state } = useLocation();

  const seats = state?.seats || [];
  const amount = state?.amount || 0;
  const passengers = state?.passengers || [];

  return (
    <><Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4">
      
      <div className="max-w-3xl mx-auto">
        
        {/* Success Animation Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100 mb-8">
          
          {/* Success Header with Animation */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center relative overflow-hidden">
            {/* Animated Background Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-40 translate-y-40"></div>
            
            <div className="relative z-10">
              {/* Animated Success Icon */}
              <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-3">
                Booking Confirmed!
              </h1>
              <p className="text-white/90 text-lg">
                Your journey is all set. Have a safe trip!
              </p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-8">
            
            {/* Booking ID Card */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Booking ID</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    {bookingId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 font-medium mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-gray-800">₹{amount}</p>
                </div>
              </div>
            </div>

            {/* Seats Booked */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h2 className="text-xl font-bold text-gray-800">Seats Booked</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {seats.map((seat) => (
                  <div
                    key={seat}
                    className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl font-bold shadow-md text-lg"
                  >
                    {seat}
                  </div>
                ))}
              </div>
            </div>

            {/* Passenger Details */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-800">Passenger Details</h2>
              </div>

              <div className="space-y-4">
                {passengers.map((p, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      {/* Passenger Icon */}
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      
                      {/* Passenger Info */}
                      <div className="flex-1 grid md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Name</p>
                          <p className="text-gray-800 font-bold text-lg">{p.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Seat Number</p>
                          <p className="text-gray-800 font-bold text-lg">{seats[index]}</p>
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

            {/* Important Information */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
              <div className="flex gap-3">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-blue-800 font-bold mb-2">Important Reminders</p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Please arrive 15 minutes before departure</li>
                    <li>• Carry a valid ID proof for verification</li>
                    <li>• Your Booking ID: <span className="font-bold">{bookingId}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/my-bookings" className="flex-1">
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>View My Bookings</span>
                </button>
              </Link>
              
              <Link to="/" className="flex-1">
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl border-2 border-gray-300 transition-all duration-200 flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Back to Home</span>
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* Download/Print Option */}
        <div className="text-center">
          <button
            onClick={() => window.print()}
            className="text-gray-600 hover:text-gray-800 font-semibold flex items-center gap-2 mx-auto transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Booking Details
          </button>
        </div>

      </div>
    </div>
    </>
  );
};

export default BookingSuccess;