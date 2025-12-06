import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/forall/Home";
import About from "../pages/forall/About";
import Contact from "../pages/forall/Contact";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// User pages (protected)
import SearchBus from "../pages/user/SearchBus";
import MyBookings from "../pages/user/MyBookings";
import BusDetails from "../pages/user/BusDetails";
import MyProfile from "../pages/user/MyProfile";
import SelectSeat from "../pages/user/SelectSeat";
import BookingSuccess from "../pages/user/BookingSuccess";

import ProtectedRoute from "./ProtectedRoute";

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

        {/* 404 */}
        <Route path="*" element={<h1>Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}
