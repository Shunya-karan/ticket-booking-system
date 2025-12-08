import { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import BusCard from "../components/BusCard";
import toast from "react-hot-toast";
import { GetActiveBus } from "../services/busService";

const ActiveBuses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      const res = await GetActiveBus();
      setBuses(res.data.buses || []);
    } catch (err) {
      toast.error("Failed to load buses");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-orange-50">
        <div>
          <div className="w-14 h-14 mx-auto border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading buses...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-10">

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Active Buses
        </h1>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buses.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">
              No active buses available.
            </p>
          ) : (
            buses.map((bus) => <BusCard key={bus.id} bus={bus} />)
          )}
        </div>

      </div>

      <Footer />
    </>
  );
};

export default ActiveBuses;
