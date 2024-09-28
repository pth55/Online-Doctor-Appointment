import React from 'react'

function Profile({name, qua, email}) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center p-10 pb-0">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" alt="Bonnie image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{qua}</span>
            <span className="text-sm text-gray-400 dark:text-gray-300">{email}</span>
        </div>
    </div>
  )
}

export default Profile