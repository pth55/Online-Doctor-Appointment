// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10 text-center pt-[400px]">
      <h1 className="text-6xl font-bold text-gray-800">Welcome to the Hospital</h1>
      <p className="text-xl text-gray-600 max-w-xl">
        We are committed to providing the best healthcare services to you and your loved ones.
      </p>
      <Link
        to="/patient-register"
        className="font-bold text-black border-2 border-[#FFA500] hover:bg-[#FFA500] focus:ring-4 focus:outline-none focus:ring-[#FFA500] rounded-lg text-sm px-4 py-2"
      >
        Take Appointment
      </Link>
    </div>
  );
};

export default Home;
