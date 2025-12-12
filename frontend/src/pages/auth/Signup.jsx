import { useState } from "react";
import AuthInput from "../../components/AuthInput.jsx";
import { PostSignUp } from "../../services/authservice.js";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import AuthNavbar from "../../components/AuthNavbar.jsx";
import IMAGES from "../../assets/image.js";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  MapPin,
  Clock,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const { login, isLoggedIn } = useAuth();

  // if (isLoggedIn) {
  //   return <Navigate to="/" replace />;
  // }

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password) {
      toast.error("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await PostSignUp(name, email, password);

      toast.success(
        `Registration Successful! Welcome ${res.data.user.name}! 🎉`
      );
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/login"), 1200);


    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-red-50">
        <AuthNavbar />

        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* LEFT SIDE */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Background blur circles */}
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
                <div
                  className="absolute -bottom-8 right-0 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Main Card */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-3xl shadow-2xl overflow-hidden mb-6 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                    {/* Banner Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={IMAGES.banner}
                        alt="BusBuddy Banner"
                        className="w-full h-50 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out animate-fadeIn"
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Why Choose BusBuddy?
                    </h3>

                    <div className="space-y-5">
                      {/* Feature 1 */}
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                          <MapPin className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">
                            Extensive Network
                          </h4>
                          <p className="text-sm text-gray-600">
                            Connect to 500+ destinations across the country
                          </p>
                        </div>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <Clock className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">
                            On-Time Guarantee
                          </h4>
                          <p className="text-sm text-gray-600">
                            95% punctuality rate with real-time tracking
                          </p>
                        </div>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <Shield className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">
                            Safe & Secure
                          </h4>
                          <p className="text-sm text-gray-600">
                            Verified operators and secure payment gateway
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                      <p className="text-sm text-gray-700 text-center">
                        <span className="font-bold text-orange-600">
                          50,000+
                        </span>{" "}
                        happy travelers this month! 🎉
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - SIGNUP FORM */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border-2 border-orange-100 max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg">
                    <User className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Create Account
                  </h2>
                  <p className="text-gray-600">
                    Start your journey with us today
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSignup} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <AuthInput
                        placeholder="Enter your name"
                        value={name}
                        onChange={setName}
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <AuthInput
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={setEmail}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Password with Toggle */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <AuthInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={setPassword}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Must be at least 6 characters
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Sign Up Now
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/signin"className="text-orange-600 font-bold hover:text-orange-700 hover:underline">Sign In</Link>
                      
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t-2 border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    By signing up, you agree to our{" "}
                    <a
                      href="/terms"
                      className="text-orange-600 hover:underline font-semibold"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-orange-600 hover:underline font-semibold"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;