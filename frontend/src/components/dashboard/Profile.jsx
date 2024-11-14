import React from 'react';

function Profile({ name, qua, email }) {
  return (
    <div className="w-full max-w-sm max-h-[300px] bg-pink-50 border-[2px] border-pink-300 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
        <div className="flex flex-col items-center p-10">
            <img className="w-32 h-32 mb-3 rounded-full shadow-lg" src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" alt="Doctor profile"/>
            <h5 className="mb-1 text-xl font-medium text-green-600">{name}</h5>
            <span className="text-sm text-gray-700">{qua}</span>
            <span className="text-sm text-gray-500">{email}</span>
        </div>
    </div>
  );
}

export default Profile;
