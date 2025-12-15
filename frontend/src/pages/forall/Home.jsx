import { useAuth } from "../../context/AuthContext";
import AuthNavbar from "../../components/AuthNavbar";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import IMAGES from "../../assets/image";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetpopularRoutes } from "../../services/busService";

const Home = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    const loadPopular = async () => {
      try {
        const res = await GetpopularRoutes();
        // console.log("POPULAR ROUTES RESPONSE:", res.data);
        setPopularRoutes(res.data.routes);
      } catch (err) {
        // console.log("ERROR LOADING POPULAR ROUTES:", err);
      }
    };

    loadPopular();
  }, []);

  const handleSearch = () => {
    navigate(`/search-bus?from=${from}&to=${to}&date=${date || ""}`);

    

  };
  return (
    <>
      {/* NAVBARS */}
      {!isLoggedIn && <AuthNavbar />}
      {isLoggedIn && user?.role === "user" && <UserNavbar />}
      {isLoggedIn && user?.role==="admin" && navigate("/admin")}

      {/* HERO SECTION WITH VIDEO */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={IMAGES.Hero}
            type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col justify-center h-full text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight">
            Travel Smarter With BusBuddy
          </h1>

          <p className="mt-4 text-lg sm:text-xl opacity-90">
            Book bus tickets instantly. Safe, fast, and comfortable journeys!
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 bg-white p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-4 justify-center">

            <input
              type="text"
              placeholder="From"
              className="border  border-gray-700 placeholder:text-black text-black p-3 rounded-xl w-full sm:w-40"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />

            <input
              type="text"
              placeholder="To"
              className="border border-gray-700 placeholder:text-black p-3 text-black rounded-xl w-full sm:w-40"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />

            <input
              type="date"
              className="border p-3  border-gray-700 placeholder:text-black text-black rounded-xl w-full sm:w-40"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl w-full sm:w-auto"
              onClick={handleSearch}>
              Search Buses
            </button>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose BusBuddy?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-6 shadow-lg rounded-2xl text-center border bg-white hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3">🚌 Vast Network</h3>
            <p className="text-gray-600">500+ bus routes available across India.</p>
          </div>

          <div className="p-6 shadow-lg rounded-2xl text-center border bg-white hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3">⏱️ On-Time Guarantee</h3>
            <p className="text-gray-600">Always punctual with real-time tracking.</p>
          </div>

          <div className="p-6 shadow-lg rounded-2xl text-center border bg-white hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3">🛡️ Safe & Secure</h3>
            <p className="text-gray-600">Verified operators & secure payments.</p>
          </div>

        </div>
      </section>

      {/* POPULAR ROUTES SECTION */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Routes</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {popularRoutes.map((r, idx) => (
            <div key={idx} className="p-6 shadow-lg rounded-2xl border hover:shadow-xl transition">

              <h3 className="text-xl font-bold mb-2">
                {r.from_city} → {r.to_city}
              </h3>

              <p className="text-gray-600 mb-4">
                Total buses available:{" "}
                <span className="font-bold text-orange-600">
                  {r.total_buses}
                </span>
              </p>

              <button
                onClick={() =>
                  navigate(
                    `/search-bus?from=${r.from_city}&to=${r.to_city}&date`
                  )
                }
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-full py-2 rounded-xl font-semibold hover:shadow-lg"
              >
                See Buses
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE BUS TRACKER PREVIEW */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Live Bus Tracker Preview</h2>

        <div className="rounded-2xl overflow-hidden shadow-lg border">
          <iframe
            title="Live Bus Tracker"
            width="100%"
            height="350"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d241317.11610290136!2d72.7411!3d19.0822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1712123145519"
          ></iframe>
        </div>

        <p className="text-center text-gray-600 mt-4">
          *This is a preview map. Live bus tracking will be enabled soon.*
        </p>
      </section>

      {/* FOOTER */}
      {isLoggedIn && <Footer />}
    </>
  );
};

export default Home;
