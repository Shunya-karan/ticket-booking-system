import { useState } from "react";
import IMAGES from "../assets/image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";
import SearchModal from "./SearchModal"; // adjust path if needed

const UserNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);

    const { logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const activeText = (path) =>
        currentPath === path
            ? "text-orange-600 font-bold"
            : "text-gray-700 hover:text-orange-500 font-semibold";

    return (
        <>
            <header className="bg-white shadow-md border-b-2 border-orange-200">
                <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between">

                    {/* LOGO */}
                    <div className="flex items-center gap-2">
                        <img
                            src={IMAGES.logo}
                            alt="BusBuddy"
                            className="w-10 sm:w-12 md:w-14 object-contain"
                        />
                        <div className=" sm:block">
                            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 bg-clip-text text-transparent">
                                BusBuddy
                            </h1>
                            <p className="text-xs text-gray-600 font-semibold tracking-wide">
                                Travel Smart, Travel Safe
                            </p>
                        </div>
                    </div>

                    {/* DESKTOP NAVIGATION — Now only visible on LARGE SCREENS */}
                    <nav className="hidden lg:flex items-center gap-6">

                        <Link to="/" className={`${activeText("/")} text-sm`}>
                            Home
                        </Link>
                        <Link to="/Active-bus" className={`${activeText("/Active-bus")} text-sm`}>
                            Active Buses
                        </Link>
                        <button
                            onClick={() => setOpenSearchModal(true)}
                            className={`${activeText("/search-bus")} transition-colors text-sm`}
                        >
                            Search Buses
                        </button>


                        <Link to="/my-bookings" className={`${activeText("/my-bookings")} text-sm`}>
                            My Bookings
                        </Link>

                        <Link to="/about" className={`${activeText("/about")} text-sm`}>
                            About
                        </Link>

                        <Link to="/contact" className={`${activeText("/contact")} text-sm`}>
                            Contact
                        </Link>

                        {/* PROFILE DROPDOWN */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200"
                            >
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-semibold text-gray-800">
                                    {user?.name || "User"}
                                </span>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded-xl w-48 py-2 z-50">
                                    <Link to="/my-profile" className="block px-4 py-2 hover:bg-orange-100">
                                        My Profile
                                    </Link>
                                    <Link to="/my-bookings" className="block px-4 py-2 hover:bg-orange-100">
                                        My Bookings
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="block text-left px-4 py-2 w-full hover:bg-red-100 text-red-500"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    </nav>

                    {/* MOBILE TOGGLE BUTTON */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden text-gray-700"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* MOBILE MENU */}
                {menuOpen && (
                    <div className="lg:hidden bg-white border-t shadow-md px-6 py-4">
                        <nav className="flex flex-col gap-4">

                            <Link to="/" className={`${activeText("/")} text-sm`}>
                                Home
                            </Link>

                            <Link to="/Active-bus" className={`${activeText("/Active-bus")} text-sm`}>
                                Active Buses
                            </Link>

                            <a
                                onClick={() => setOpenSearchModal(true)}
                                className={`${activeText("/search-bus")} transition-colors text-sm`}
                            >
                                Search Buses
                            </a>


                            <Link to="/my-bookings" className={`${activeText("/my-bookings")} text-sm`}>
                                My Bookings
                            </Link>

                            <Link to="/about" className={`${activeText("/about")} text-sm`}>
                                About
                            </Link>

                            <Link to="/contact" className={`${activeText("/contact")} text-sm`}>
                                Contact
                            </Link>
                            <Link to="/my-profile" className={`${activeText("/my-profile")} text-sm`}>
                                My Profile
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
            <SearchModal
                isOpen={openSearchModal}
                onClose={() => setOpenSearchModal(false)}
            />
        </>
    );

};

export default UserNavbar;
