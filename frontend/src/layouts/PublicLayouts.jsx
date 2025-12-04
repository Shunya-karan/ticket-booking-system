import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import UserNavbar from "../components/UserNavbar";
import AdminNavbar from "../components/AdminNavbar";
import PublicFooter from "../components/PublicFooter";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const PublicLayout = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      {!isLoggedIn && <AuthNavbar />}
      {isLoggedIn && user?.role === "user" && <UserNavbar />}
      {isLoggedIn && user?.role === "admin" && <AdminNavbar />}

      <Outlet />

      {/* FOOTER LOGIC */}
      {!isLoggedIn && <PublicFooter />}
      {isLoggedIn && user?.role === "user" && <Footer />}
      {/* Admin gets no footer */}
    </>
  );
};

export default PublicLayout;
