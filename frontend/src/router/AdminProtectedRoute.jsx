import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  // Show toast ONLY once (not during render)
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login first");
    }

    if (!loading && user && user.role !== "admin") {
      toast.error("Access Denied — Admins Only");
    }
  }, [loading, user]);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
