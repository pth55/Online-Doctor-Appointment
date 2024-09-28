import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar"

const CustomComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative md:bg-orange-100 bg-orange-200 gap-10">
      <NavBar />
      <h1 className='text-6xl'>Welcome to the Hospital</h1>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-10">
        <button type="button" className="font-bold text-black border-[2px] border-[#FFA500] hover:bg-[#FFA500] focus:ring-4 focus:outline-none focus:ring-[#FFA500] rounded-lg text-sm px-4 py-2 text-center" >
            <Link to="/patient-register">Take Appointment</Link>
        </button>
      </div>
    </div>
  );
};

export default CustomComponent;