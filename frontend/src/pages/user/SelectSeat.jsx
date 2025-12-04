import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const SelectSeat = () => {
  const { busId } = useParams();
  const { state } = useLocation();

  const selectedSeats = state?.selectedSeats || [];

  const [passengers, setPassengers] = useState(
    selectedSeats.map(() => ({
      name: "",
      age: "",
      gender: "",
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleConfirmBooking = async () => {
    try {
      const res = await api.post("/booking/book", {
        busId,
        selectedSeats,
        passengers
      });
      toast.success("Booking successful!");
    } catch (err) {
      toast.error("Booking failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold">Passenger Details</h1>

      {selectedSeats.map((seat, index) => (
        <div key={seat} className="bg-white p-4 mt-4 rounded-lg shadow-md">
          <p className="font-semibold">Seat: {seat}</p>

          <input
            type="text"
            placeholder="Passenger Name"
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
            className="border p-2 w-full mt-2 rounded"
          />

          <input
            type="number"
            placeholder="Age"
            onChange={(e) => handleInputChange(index, "age", e.target.value)}
            className="border p-2 w-full mt-2 rounded"
          />

          <select
            onChange={(e) => handleInputChange(index, "gender", e.target.value)}
            className="border p-2 w-full mt-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      ))}

      <button
        onClick={handleConfirmBooking}
        className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default SelectSeat;
