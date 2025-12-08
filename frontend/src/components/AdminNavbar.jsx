import { useState } from "react";
import IMAGES from "../assets/image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";
// import SearchModal from "./SearchModal"; // adjust path if needed

const AdminNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const [openSearchModal, setOpenSearchModal] = useState(false);

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

                        <Link to="/admin" className={`${activeText("/admin")} text-sm`}>
                            Dashboard
                        </Link>
                        <Link to="/admin/Active-bus" className={`${activeText("/admin/Active-bus")} text-sm`}>
                            Active Buses
                        </Link>

                        {/* <button
                            onClick={() => setOpenSearchModal(true)}
                            className={`${activeText("/search-bus")} transition-colors text-sm`}
                        >
                            Search Buses
                        </button> */}


                        <Link to="/admin/buses" className={`${activeText("/admin/buses")} text-sm`}>
                            All Buses
                        </Link>

                        <Link to="/admin/add-bus" className={`${activeText("/admin/add-bus")} text-sm`}>
                            Add Bus
                        </Link>

                        <Link to="/admin/profile" className={`${activeText("/admin/profile")} text-sm`}>
                            Profile
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

                            <Link to="/admin" className={`${activeText("/admin")} text-sm`}>
                                Dashboard
                            </Link>
                            <Link to="/admin/Active-bus" className={`${activeText("/admin/Active-bus")} text-sm`}>
                                Active Buses
                            </Link>


                            <Link to="/admin/buses" className={`${activeText("/admin/buses")} text-sm`}>
                                All Buses
                            </Link>

                            <Link to="/admin/add-bus" className={`${activeText("/admin/add-bus")} text-sm`}>
                                Add Bus
                            </Link>

                            <Link to="/admin/profile" className={`${activeText("/admin/profile")} text-sm`}>
                                Profile
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

export default AdminNavbar;
