import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function AdminRoute({ children }) {
  const { isLoggedIn, user, loading } = useAuth();

  // Wait until auth loads
  if (loading) return null;

  if (!isLoggedIn) {
    toast.error("Please login first");
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    toast.error("Access Denied — Admins Only");
    return <Navigate to="/" replace />;
  }

  return children;
}
