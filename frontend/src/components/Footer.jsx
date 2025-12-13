import React from 'react'
import ReactDOM from 'react-dom'
import { SocialIcon } from 'react-social-icons'
import { useState } from 'react';
import SearchModal from "./SearchModal";
const Footer = () => {
  const [openSearchModal, setOpenSearchModal] = useState(false);

  return (
    <>
      <footer className="bg-black text-gray-300 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-white text-2xl font-bold">BusBuddy</h2>
            <p className="text-gray-400 mt-3 text-sm">
              Travel Smart, Travel Safe. Book buses across 500+ destinations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-orange-400">Home</a></li>
              <li><a onClick={() => setOpenSearchModal(true)} className="hover:text-orange-400">Search Buses</a></li>
              <li><a href="/my-bookings" className="hover:text-orange-400">My Bookings</a></li>
              <li><a href="/about" className="hover:text-orange-400">About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/contact" className="hover:text-orange-400">Contact Support</a></li>
              <li><a href="/terms" className="hover:text-orange-400">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-orange-400">Privacy Policy</a></li>
              <li><a href="/faq" className="hover:text-orange-400">FAQ</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4 text-xl mt-3">
              <SocialIcon url="https://twitter.com" className="hover:scale-110 transition-transform" />
              <SocialIcon url="https://instagram.com" className="hover:scale-110 transition-transform" />
              <SocialIcon url="https://facebook.com" className="hover:scale-110 transition-transform" />
              <SocialIcon url="https://linkedin.com" className="hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-800 pt-5">
          © {new Date().getFullYear()} BusBuddy. All rights reserved.
        </div>
      </footer>
      <SearchModal
        isOpen={openSearchModal}
        onClose={() => setOpenSearchModal(false)} >
      </SearchModal></>
  );
};

export default Footer;
