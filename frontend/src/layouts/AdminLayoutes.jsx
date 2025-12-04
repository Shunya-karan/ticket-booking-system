import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayoutes = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default AdminLayoutes;
