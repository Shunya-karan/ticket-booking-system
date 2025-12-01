import { useState } from "react";
import AuthInput from "../../components/AuthInput.jsx";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../../components/AuthNavbar"

const Login = () => {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async (e) => {
    
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    
    try {
      const res = await api.post("/auth/signin", {
        name,
        email,
        password,
      });

      toast.success(`Login Successful! Welcome ${res.data.user.name}! 🎉`);

      setTimeout(() => navigate("/"), 1200);
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-red-50">
        <AuthNavbar 
          signinorsignup="Sign up"
          signinorsignuppath="/signup"
        />


        </div>
)}
export default Login;
