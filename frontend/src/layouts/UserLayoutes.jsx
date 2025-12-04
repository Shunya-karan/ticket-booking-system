import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const UserLayoutes = () => {
  return (
    <>
      <UserNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayoutes;
