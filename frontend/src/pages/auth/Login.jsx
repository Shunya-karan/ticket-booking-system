import { useState } from "react";
import AuthInput from "../../components/AuthInput.jsx";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate ,Navigate} from "react-router-dom";
import AuthNavbar from "../../components/AuthNavbar.jsx";
import IMAGES from "../../assets/image.js";
import {Mail,
  Lock,
  User,
  ArrowRight,
  MapPin,
  Clock,
  Shield,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";


const Login = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login,isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await api.post("/auth/signin", {email, password });

      // const res_data=await res.json();
      console.log(res.data)
      login(res.data.token, res.data.user);

      toast.success(
        `Login Successful! Welcome ${res.data.user.name}! 🎉`
      );

      setTimeout(() => navigate("/"), 1200);

      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
      setIsLoading(false)
    }
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

            {/* RIGHT SIDE - signin FORM */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border-2 border-orange-100 max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg">
                    <User className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    User Login
                  </h2>
                  <p className="text-gray-600">
                    Start your journey with us today
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSignin} className="space-y-5">
                  

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

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <AuthInput
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={setPassword}
                        autoComplete="new-password"
                      />
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
                        Sign In...
                      </>
                    ) : (
                      <>
                        Sign In Now
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <a
                      href="/signup"
                      className="text-orange-600 font-bold hover:text-orange-700 hover:underline"
                    >
                      Register now
                    </a>
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t-2 border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    By signing, you agree to our{" "}
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

export default Login;
