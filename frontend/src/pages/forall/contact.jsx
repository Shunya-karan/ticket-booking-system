import { useState } from "react";
import AuthNavbar from "../../components/AuthNavbar"
import { useAuth } from "../../context/AuthContext";
import UserNavbar from "../../components/UserNavbar";

const Contact = ()=>{
    const { isLoggedIn, user } = useAuth()

    return(
        <div>
    {!isLoggedIn && <AuthNavbar />}
      {isLoggedIn && user?.role === "user" && <UserNavbar/>}
      {isLoggedIn && user?.role === "admin" && <AdminNavbar />}        </div>
    )
}
export default Contact



