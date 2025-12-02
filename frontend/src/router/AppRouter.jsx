import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/forall/Home";
import About from "../pages/forall/About";
import Contact from "../pages/forall/Contact";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// User pages (keep all these)
import SearchBus from "../pages/user/SearchBus";
import MyBookings from "../pages/user/MyBookings";
import BusDetails from "../pages/user/BusDetails";
import SelectSeat from "../pages/user/SelectSeat";
import BookingSuccess from "../pages/user/BookingSuccess";
import Myprofile from "../pages/user/MyProfile";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Features */}
        <Route path="/search-bus" element={<SearchBus />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/bus-details/:busId" element={<BusDetails />} />
        <Route path="/select-seat/:busId" element={<SelectSeat />} />
        <Route path="/booking-success/:id" element={<BookingSuccess />} />
        <Route path="/My-profile" element={<Myprofile/>} />

        {/* 404 */}
        <Route path="*" element={<h1>Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}
