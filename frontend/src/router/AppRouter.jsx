import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/auth/Signup.jsx";
import Login from "../pages/auth/Login.jsx";
import Home from "../pages/forall/Home.jsx";
import Contact from "../pages/forall/contact.jsx";
import About from "../pages/forall/about.jsx";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/contact" element={<Contact/>}/>
        <Route path="/About" element={<About/>}/>
        {/* 404 Page */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
