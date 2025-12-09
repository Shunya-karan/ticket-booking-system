import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { getAdminstats, getUpcomingBuses, popularRoutes, recentBookings, revenues } from "../../services/adminService";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBuses: 0,
    activeBuses: 0,
    totalBookings: 0,
    totalUsers: 0
  });
  const [recent, setRecent] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [revenue, setRevenue] = useState({ total: 0, today: 0 });
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      await Promise.all([
        loadStats(),
        fetchRecentBookings(),
        loadPopularRoutes(),
        loadRevenue(),
        loadUpcoming()
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await getAdminstats();
      setStats(res.data);
    } catch (err) {
      toast.error("Failed to load dashboard stats");
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const res = await recentBookings();
      setRecent(res.data.bookings);
    } catch (err) {
      toast.error("Failed to load recent bookings");
    }
  };

  const loadPopularRoutes = async () => {
    const res = await popularRoutes();
    setRoutes(res.data.routes);
  };

  const loadRevenue = async () => {
    const res = await revenues();
    setRevenue({
      total: res.data.totalRevenue,
      today: res.data.todayRevenue
    });
  };

  const loadUpcoming = async () => {
    const res = await getUpcomingBuses();
    setUpcoming(res.data.buses);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your bus service today.</p>
      </div>

      {/* Revenue Cards - Featured */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* Today's Revenue */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>


            </div>
            <span className="text-white/80 text-sm font-medium">Today</span>
          </div>
          <p className="text-white/90 text-sm font-medium mb-1">Today's Revenue</p>
          <h2 className="text-5xl font-bold">₹{revenue.today.toLocaleString()}</h2>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-white/80 text-sm font-medium">All Time</span>
          </div>
          <p className="text-white/90 text-sm font-medium mb-1">Total Revenue</p>
          <h2 className="text-5xl font-bold">₹{revenue.total.toLocaleString()}</h2>
        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* Total Buses */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Total Buses</p>
          <h2 className="text-4xl font-bold text-gray-800">{stats.totalBuses}</h2>
        </div>

        {/* Active Buses */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Active Buses</p>
          <h2 className="text-4xl font-bold text-gray-800">{stats.activeBuses}</h2>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Total Bookings</p>
          <h2 className="text-4xl font-bold text-gray-800">{stats.totalBookings}</h2>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Total Users</p>
          <h2 className="text-4xl font-bold text-gray-800">{stats.totalUsers - 1}</h2>
        </div>

      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">ID</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">User</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Bus</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Date</th>
              </tr>
            </thead>

            <tbody>
              {recent.map((b) => (
                <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">#{b.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{b.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{b.bus_name}</td>
                  <td className="px-4 py-4 text-sm font-bold text-gray-800">₹{b.total_amount}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${b.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {new Date(b.booked_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popular Routes & Upcoming Buses */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Popular Routes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Popular Routes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Route</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Buses</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Bookings</th>
                </tr>
              </thead>

              <tbody>
                {routes.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                      {r.from_city} → {r.to_city}
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-blue-600">{r.total_buses}</td>
                    <td className="px-4 py-4 text-sm font-bold text-green-600">{r.total_bookings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Buses */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Buses</h2>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {upcoming.map(bus => (
              <div key={bus.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition">
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{bus.bus_name}</p>
                  <p className="text-sm text-gray-600">{bus.start_point} → {bus.end_point}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">
                    {new Date(bus.travel_date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short"
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}