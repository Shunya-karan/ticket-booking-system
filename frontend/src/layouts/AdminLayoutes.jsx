import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
      {/* <div className="pt-20 px-6"> */}
        <Outlet />
      </div>
    // </div>
  );
}
