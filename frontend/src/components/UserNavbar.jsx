import { useState } from "react";
import IMAGES from "../assets/image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react"

const UserNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const { logout, user } = useAuth();

    const activeText = (path) =>
        currentPath === path
            ? "text-orange-600 font-bold"
            : "text-gray-700 hover:text-orange-500 font-semibold";

    return (
        <>
            <header className="bg-white shadow-md border-b-2 border-orange-200">
                <div className="max-w-full mx-auto px-4 sm:px-7 lg:px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img src={IMAGES.logo} alt="BusBuddy Logo" className="w-14 object-contain" />

                            <div>
                                <h1 className="text-3xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
                                    BusBuddy
                                </h1>
                                <p className="text-xs text-gray-600 font-semibold tracking-wide">
                                    Travel Smart, Travel Safe
                                </p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">

                            <Link to="/" className={`${activeText("/")} transition-colors text-sm`}>
                                Home
                            </Link>

                            <Link to="/search-bus" className={`${activeText("/search-bus")} transition-colors text-sm`}>
                                Search Buses
                            </Link>

                            <Link to="/my-bookings" className={`${activeText("/my-bookings")} transition-colors text-sm`}>
                                My Bookings
                            </Link>

                            <Link to="/about" className={`${activeText("/about")} transition-colors text-sm no-underline`}>
                                About
                            </Link>

                            <Link to="/contact" className={`${activeText("/contact")} transition-colors text-sm no-underline`}>
                                Contact
                            </Link>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                                        <User className="w-6 h-6 text-white" strokeWidth={2} />
                                    </div>
                                    <span className="font-semibold text-gray-800">
                                        {user?.name || "User"}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border py-2 z-50">
                                        <Link
                                            to="/my-profile"
                                            className="block px-4 py-2 hover:bg-orange-100 transition"
                                        >
                                            My Profile
                                        </Link>

                                        <Link
                                            to="/my-bookings"
                                            className="block px-4 py-2 hover:bg-orange-100 transition"
                                        >
                                            My Bookings
                                        </Link>

                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}

                            </div>


                        </nav>

                        {/* Mobile Hamburger */}
                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 focus:outline-none">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-white border-t shadow-md animate-slideDown">
                        <nav className="flex flex-col gap-4 px-6 py-4">

                            <Link to="/" className={`${activeText("/")} transition-colors text-sm`}>
                                Home
                            </Link>

                            <Link to="/search-bus" className={`${activeText("/search-bus")} transition-colors text-sm`}>
                                Search Buses
                            </Link>

                            <Link to="/my-bookings" className={`${activeText("/my-bookings")} transition-colors text-sm`}>
                                My Bookings
                            </Link>

                            <Link to="/about" className={`${activeText("/about")} transition-colors text-sm`}>
                                About
                            </Link>

                            <Link to="/contact" className={`${activeText("/contact")} transition-colors text-sm`}>
                                Contact
                            </Link>

                            <button
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                                className="bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-black"
                            >
                                Logout
                            </button>

                        </nav>
                    </div>
                )}
            </header>
        </>
    );
};

export default UserNavbar;
