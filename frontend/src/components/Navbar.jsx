import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="max-w-full mx-auto px-4 sm:px-7 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/*Logo*/}
        <Link to="/" className="flex items-center gap-3 group">

          <div className="flex items-center gap-2">
            <img

              src="/logo.png"
              alt="BusBuddy Logo"
              className="w-14 h-20 object-contain"
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
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
