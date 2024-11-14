// src/components/NavBar/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-white dark:bg-[#FFA500] fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black hover:underline">The Hospitals</span>
        </Link>
        
        {/* Centered links */}
        <div className="flex space-x-6">
          <Link to="/home" className="text-black font-semibold hover:underline">Home</Link>
          <Link to="/patient-register" className="text-black font-semibold hover:underline">Take Appointment</Link>
          <Link to="/about" className="text-black font-semibold hover:underline">About</Link>
          <Link to="/contact" className="text-black font-semibold hover:underline">Contact</Link>
        </div>

        {/* Doctor Login button, separate for alignment */}
        <div className="flex md:order-2 gap-5">
        <button
            type="button"
            className="font-bold text-black border-[2px] border-white bg-[#FFA500] hover:bg-[#e59400] focus:ring-4 focus:outline-none focus:ring-[#FFA500] rounded-lg px-4 py-2"
          >
            <Link to="/doctor-register">Doctor Register</Link>
          </button>
          <button
            type="button"
            className="font-bold text-black border-[2px] border-white bg-[#FFA500] hover:bg-[#e59400] focus:ring-4 focus:outline-none focus:ring-[#FFA500] rounded-lg px-4 py-2"
          >
            <Link to="/doctor-login">Doctor Login</Link>
          </button>
          
        </div>
      </div>
    </nav>
  );
}
