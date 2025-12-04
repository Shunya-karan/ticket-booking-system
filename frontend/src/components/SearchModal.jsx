import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (!from || !to || !date) {
      toast.error("All fields are required");
      return;
    }

    onClose(); // Close modal
    navigate(`/search-bus?from=${from}&to=${to}&date=${date}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-white w-[90%] max-w-lg p-6 rounded-2xl shadow-xl relative">

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Search Buses
        </h2>

        {/* Inputs */}
        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="From City"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-3 rounded-lg w-full text-black"
          />

          <input
            type="text"
            placeholder="To City"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-3 rounded-lg w-full text-black"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded-lg w-full text-black"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Search Now
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
