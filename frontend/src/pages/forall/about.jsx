import { useAuth } from "../../context/AuthContext";
import UserNavbar from "../../components/UserNavbar";
import AuthNavbar from "../../components/AuthNavbar";
import Footer from "../../components/Footer";

const About = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <div>
        {!isLoggedIn && <AuthNavbar />}
        {isLoggedIn && user?.role === "user" && <UserNavbar />}
        
      </div>

      <div className="min-h-screen bg-gray-50">

        {/* HERO SECTION */}
        <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-20 shadow-xl">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-extrabold mb-4">About BusBuddy</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Your trusted partner for safe, affordable, and comfortable bus travel across India.
            </p>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Who We Are</h2>
            <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto leading-relaxed">
              We are a modern online bus ticket booking platform created to make your travel 
              smarter, smoother, and more enjoyable. Our goal is to simplify the way people 
              discover and book buses across India, connecting cities and bringing people together.
            </p>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose Us?</h2>

            <div className="grid md:grid-cols-3 gap-8">

              {/* Card 1 - Wide Bus Options */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-3">Wide Bus Options</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Sleeper, AC, Non-AC, Volvo — we offer buses for every travel need and budget preference.
                </p>
              </div>

              {/* Card 2 - Secure Payments */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-3">Secure Payments</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Safe and encrypted payment methods ensure your transactions are protected and hassle-free.
                </p>
              </div>

              {/* Card 3 - Trusted Experience */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-3">Trusted Experience</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Thousands of happy customers rely on our fast, easy, and reliable booking system.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* OUR MISSION */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto leading-relaxed">
              To innovate and build the most reliable, transparent and user-friendly
              bus booking experience in India. We aim to connect cities and people
              while making travel affordable and enjoyable for everyone, everywhere.
            </p>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What We Offer</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Easy Search</h4>
              <p className="text-sm text-gray-600">Find buses quickly with smart filters</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Instant Booking</h4>
              <p className="text-sm text-gray-600">Book tickets in just a few clicks</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Multiple Payments</h4>
              <p className="text-sm text-gray-600">Various secure payment options</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">24/7 Support</h4>
              <p className="text-sm text-gray-600">Always here to help you travel</p>
            </div>

          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-16 mt-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-3">Have Questions?</h2>
            <p className="text-lg text-white/90 mb-6">We're always here to help you with your journeys.</p>
            <a href="/contact">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
                Contact Us
              </button>
            </a>
          </div>
        </section>
      </div>
{isLoggedIn? <Footer />:null
}
    </>
  );
};

export default About;