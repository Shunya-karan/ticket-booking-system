import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";

const SelectSeat = () => {
  const { busId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const selectedSeats = state?.selectedSeats || [];
  const [loading, setLoading] = useState(false);

  const [passengers, setPassengers] = useState(
    selectedSeats.map(() => ({
      name: "",
      age: "",
      gender: "",
    }))
  );

  const handleChange = (i, field, value) => {
    const temp = [...passengers];
    temp[i][field] = value;
    setPassengers(temp);
  };

  const validateForm = () => {
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name.trim()) {
        toast.error(`Please enter name for Seat ${selectedSeats[i]}`);
        return false;
      }
      if (!p.age || p.age < 1 || p.age > 120) {
        toast.error(`Please enter valid age for Seat ${selectedSeats[i]}`);
        return false;
      }
      if (!p.gender) {
        toast.error(`Please select gender for Seat ${selectedSeats[i]}`);
        return false;
      }
    }
    return true;
  };

  const handleConfirm = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await api.post("/booking/book", {
        bus_id: busId,
        seats: selectedSeats,
        passengers,
      });

      toast.success("Booking Successful!");

      navigate(`/booking-success/${res.data.booking_id}`, {
        state: {
          seats: selectedSeats,
          amount: res.data.total_amount,
          passengers
        }
      });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (selectedSeats.length === 0) {
    return (
      <> 
      <Navbar></Navbar>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Seats Selected</h2>
          <p className="text-gray-500 mb-6">Please select seats first</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
    );
  }

  return (
    <> 
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pb-32">
      
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 shadow-xl">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white font-medium mb-4 transition-colors group"
          >
            <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Passenger Details</h1>
              <p className="text-white/90">Fill in details for all passengers</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-white/80 text-sm">Selected Seats</p>
              <p className="text-white text-2xl font-bold">{selectedSeats.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Seat Numbers Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-xl font-bold text-gray-800">Booking Summary</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {selectedSeats.map((seat) => (
              <div
                key={seat}
                className="bg-gradient-to-br from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-md"
              >
                Seat {seat}
              </div>
            ))}
          </div>
        </div>

        {/* Passenger Forms */}
        <div className="space-y-6">
          {selectedSeats.map((seat, index) => (
            <div
              key={seat}
              className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Passenger {index + 1}</h3>
                    <p className="text-white/80 text-sm">Seat Number: {seat}</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="p-6 space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={passengers[index].name}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition"
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                    />
                  </div>
                </div>

                {/* Age and Gender Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Age Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="number"
                        placeholder="Enter age"
                        value={passengers[index].age}
                        min="1"
                        max="120"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition"
                        onChange={(e) => handleChange(index, "age", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Gender Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <select
                        value={passengers[index].gender}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition appearance-none bg-white"
                        onChange={(e) => handleChange(index, "gender", e.target.value)}
                      >
                        <option className="" value="">Select Gender</option>
                        <option value="Male" >Male</option>
                        <option value="Female" className="border-orange-400">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mt-8 flex gap-3">
          <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-blue-800 font-semibold mb-1">Important Information</p>
            <p className="text-blue-700 text-sm">Please ensure all passenger details are accurate. Carry a valid ID proof during the journey.</p>
          </div>
        </div>

      </div>

      {/* Fixed Bottom Confirmation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-orange-500 shadow-2xl">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`
              w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl 
              shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3
              ${loading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02]"}
            `}
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">Processing...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg">Confirm Booking</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SelectSeat;