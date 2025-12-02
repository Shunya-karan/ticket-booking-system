import { useState } from "react";
import IMAGES from "../assets/image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;
  const { isLoggedIn, logout } = useAuth();

  let buttonText = "";
  let buttonPath = "";

  if (!isLoggedIn) {
    if (currentPath === "/login") {
      buttonText = "Signup";
      buttonPath = "/signup";
    } else if (currentPath === "/signup") {
      buttonText = "Login";
      buttonPath = "/login";
    } else {
      buttonText = "Login";
      buttonPath = "/login";
    }
  }


  const activeText = (path) =>
    currentPath === path
      ? "text-orange-600 font-bold"   // Active page
      : "text-gray-700 hover:text-orange-500 font-semibold";  // Normal page


  return (
    <>
      <header className="bg-white shadow-md border-b-2 border-orange-200">
        <div className="max-w-full mx-auto px-4 sm:px-7 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/*Logo*/}
            <div className="flex items-center gap-2">
              <img
                src={IMAGES.logo}
                alt="BusBuddy Logo"
                className="w-14 object-contain"
              />

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

              <Link to="/" className={`${activeText('/')} transition-colors text-sm`}>
                Home
              </Link>

              <Link to="/contact" className={`${activeText('/contact')} transition-colors text-sm`}>
                Contact us
              </Link>

              <Link to="/about" className={`${activeText('/about')} transition-colors text-sm`}>
                About
              </Link>


              {/* Desktop: Login / Signup / Logout */}
              {!isLoggedIn ? (
                <button
                  onClick={() => navigate(buttonPath)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                >
                  {buttonText}
                </button>
              ) : (
                <button
                  onClick={() => {
                    logout()
                    navigate("/login");
                  }}
                  className="bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-black"
                >
                  Logout
                </button>
              )}


            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              {/* three horizontal lines */}
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t shadow-md animate-slideDown">
            <nav className="flex flex-col gap-4 px-6 py-4">
              <Link to="/" className={`${activeText('/')} transition-colors text-sm`}>
                Home
              </Link>

              <Link to="/contact" className={`${activeText('/contact')} transition-colors text-sm`}>
                Contact us
              </Link>

              <Link to="/about" className={`${activeText('/about')} transition-colors text-sm`}>
                About
              </Link>


              {/* mobile: Login / Signup / Logout */}
              {!isLoggedIn ? (
                <button
                  onClick={() => navigate(buttonPath)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                >
                  {buttonText}
                </button>
              ) : (
                <button
                  onClick={() => {
                    logout()
                    navigate("/login");
                  }}
                  className="bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-black"
                >
                  Logout
                </button>
              )}



            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default AuthNavbar;
