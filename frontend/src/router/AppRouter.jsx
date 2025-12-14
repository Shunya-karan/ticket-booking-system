import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/forall/Home";
import About from "../pages/forall/about";
import Contact from "../pages/forall/contact";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// User pages (protected)
import SearchBus from "../pages/user/SearchBus";
import MyBookings from "../pages/user/MyBookings";
import BusDetails from "../pages/user/BusDetails";
import MyProfile from "../pages/user/MyProfile";
import SelectSeat from "../pages/user/SelectSeat";
import BookingSuccess from "../pages/user/BookingSuccess";

// Admin pages

import AdminDashboard
  from "../pages/admin/Dashboard";
import AllBuses from "../pages/admin/AllBuses";
import AddBus from "../pages/admin/AddBus";
import EditBus from "../pages/admin/EditBus";
import ActiveBusAdmin from "../pages/admin/ActiveBuses";
import BusBookings from "../pages/admin/BusBookings";
import AdminProfile from "../pages/admin/profile";


import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminProtectedRoute";

import AdminLayout from "../layouts/AdminLayoutes";

import ActiveBuses from "../pages/Activebus";
import Ticket from "../pages/Ticket";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected User Routes */}
        <Route
          path="/search-bus"
          element={
            <ProtectedRoute>
              <SearchBus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bus-details/:busId"
          element={
            <ProtectedRoute>
              <BusDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/select-seat/:busId"
          element={
            <ProtectedRoute>
              <SelectSeat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-success/:bookingId"
          element={
            <ProtectedRoute>
              <BookingSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Active-bus"
          element={
            <ProtectedRoute>
              <ActiveBuses />
            </ProtectedRoute>
          }
        />
        <Route path="/ticket/:booking_id" element={<Ticket />} />


        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="buses" element={<AllBuses />} />
          <Route path="add-bus" element={<AddBus />} />
          <Route path="edit-bus/:bus_id" element={<EditBus />} />
          <Route path="Active-bus" element={<ActiveBusAdmin />} />
          <Route path="bus-bookings/:bus_id" element={<BusBookings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>




        {/* 404 */}
        <Route path="*" element={<h1>Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}
