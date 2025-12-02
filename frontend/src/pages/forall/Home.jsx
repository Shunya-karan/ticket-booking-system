import { useAuth } from "../../context/AuthContext";
import AuthNavbar from "../../components/AuthNavbar";
import AdminNavbar from "../../components/AdminNavbar";
import UserNavbar from "../../components/Usernavbar";

const Home = () => {
  const { isLoggedIn, user, loading } = useAuth();

  // 🔥 Show loader while user info is being fetched
  if (loading) {
    return (
      <div className="text-center p-8 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <>
      {!isLoggedIn && <AuthNavbar />}

      {isLoggedIn && user?.role === "user" && <UserNavbar />}

      {isLoggedIn && user?.role === "admin" && <AdminNavbar />}

      {/* your other home content */}
    </>
  );
};

export default Home;
