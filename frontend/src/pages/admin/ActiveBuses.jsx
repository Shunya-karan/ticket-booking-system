import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BusFront, Pencil, Trash2, PlusCircle } from 'lucide-react'; // Added icons for flair
import { deleteBus, getActivebuses } from "../../services/adminService";

export default function ActiveBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    loadActiveBuses();
  }, []);

  const loadActiveBuses = async () => {
    setLoading(true); // Start loading
    try {
      const res = await getActivebuses();
      setBuses(res.data.buses);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch buses");
      setBuses([]); // Ensure state is an empty array on error
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  };

  const handleDelete = async (bus_id) => {
    if (!window.confirm("Are you sure? This bus will be deleted.")) return;

    try {
      await deleteBus(bus_id);
      toast.success("Bus deleted successfully");

      // Remove from UI without reloading page
      setBuses(buses.filter((bus) => bus.id !== bus_id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleUpdate = (bus_id) => {
    navigate(`/admin/edit-bus/${bus_id}`);
  };

  const handleBookings=(bus_id)=>{
    navigate(`/admin/bus-bookings/${bus_id}`)
  }
  
  // Custom addition: Function to navigate to the Add Bus page
  const handleAddBus = () => {
      navigate('/admin/add-bus'); // Assuming a route '/add-bus' exists
  };

  if (loading) {
    return (
      <div className="p-5 text-center text-lg font-medium text-gray-600">
          Loading active buses...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-white to-orange-50"> {/* Subtle gradient background */}
      
      {/* Header with CTA Button */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 flex items-center">
            <BusFront className="w-6 h-6 sm:w-8 sm:h-8 mr-2" /> Active Bus Fleet
        </h2>
        <button
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center text-sm sm:text-base"
          onClick={handleAddBus}
        >
          <PlusCircle className="w-4 h-4 mr-1 sm:mr-2" /> Add New Bus
        </button>
      </div>

      {/* Conditional Rendering: No Buses Found */}
      {buses.length === 0 ? (
        <div className="text-center p-10 bg-white border border-dashed border-gray-300 rounded-lg shadow-inner">
          <p className="text-xl font-medium text-gray-500 mb-4">
            No active buses found.
          </p>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            onClick={handleAddBus}
          >
            Start by Adding a Bus
          </button>
        </div>
      ) : (
        /* Bus Grid - Responsive Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {buses.map((bus) => (
            <div 
              key={bus.id} 
              className="border border-orange-200 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 bg-white flex flex-col"
            >
              {/* Bus Image */}
              <div className="mb-3 overflow-hidden rounded-lg">
                <img
                  src={bus.bus_images[0]}
                  alt={`Image of ${bus.bus_name}`}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x200?text=Bus+Image" }} // Fallback image
                />
              </div>

              {/* Bus Details */}
              <div className="flex-grow">
                  <h3 className="font-extrabold text-xl mb-1 text-orange-700">{bus.bus_name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold text-gray-700">Number:</span> {bus.bus_number}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold text-gray-700">Type:</span> {bus.bus_type}
                  </p>
                  <p className="text-sm text-gray-800 font-medium mt-2">
                      <span className="text-orange-600">Route:</span> {bus.start_point} <span className="text-gray-400">→</span> {bus.end_point}
                  </p>
                  <p className="text-sm text-gray-800 font-medium mt-2"><span className="text-green-600">Date: </span>{ new Date(bus.travel_date).toLocaleDateString("en-IN")}</p>
              </div>


              {/* Action Buttons */}
              <div className="flex justify-between mt-4 space-x-3 pt-3 border-t border-gray-100">
                <button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 rounded-lg transition duration-300 flex items-center justify-center text-sm shadow-md"
                  onClick={() => handleUpdate(bus.id)}
                >
                  <Pencil className="w-4 h-4 mr-1" /> Update
                </button>

                <button
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 rounded-lg transition duration-300 flex items-center justify-center text-sm shadow-md"
                  onClick={() => handleDelete(bus.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
               <div className=" flex items-center justify-between"> 
              <button className="my-4 py-2 w-48 bg-gradient-to-r from-green-500 to-green-800 hover:from-green-800 hover:to-green-900 rounded-lg font-medium flex-1 items-center justify-center text-sm shadow-md"
              onClick={()=>{
                handleBookings(bus.id)}
                }>See Bookings</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}