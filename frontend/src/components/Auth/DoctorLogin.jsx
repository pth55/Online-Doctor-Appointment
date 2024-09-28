import React, { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { doctorAtom } from "../../context/atoms/doctorAtom";
import isLogin from "../../context/atoms/isLogin";
import { useNavigate } from 'react-router-dom';

export default function DoctorLogin() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false); // To handle loading state

    const uname = useRef(null);
    const pass = useRef(null);
    
    const setDoctorData = useSetRecoilState(doctorAtom);
    const setIsLogin = useSetRecoilState(isLogin);
    
    const navigate = useNavigate(); 

    const validateLogin = async () => {
        const username = uname.current.value.trim();
        const password = pass.current.value.trim();
    
        if (!username || !password) {
            setErrorMessage('Please enter both username and password.');
            return;
        }
    
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3043/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: username,
                    pass: password,
                }),
            });
    
            const data = await response.json();
    
            if (!data.success) {
                setErrorMessage(data.message);
            } else {
                const doctorData = data.data[0]; // Extract the first doctor from the data array
                setDoctorData({
                    appointments: doctorData.appointments || [],
                    id: doctorData._id,
                    docId: doctorData.docId,
                    name: doctorData.name,
                    email: doctorData.email,
                    phone: doctorData.phone,
                    edu: doctorData.edu
                    // password is not taking into the atom
                });
                
                setIsLogin({
                    isLoggedIn: true
                });

                navigate("/dashboard");
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
        setLoading(false);
    };
    

    return (
        <div className='flex flex-col items-center justify-center border rounded-lg p-4 max-w-md mx-auto'>
            <span className='text-5xl m-2'>Doctor Login</span>
            <input
                type="text"
                placeholder='Username'
                className='mb-4 w-full p-2 border rounded bg-transparent text-orange-400 border-orange-400 focus:outline-none focus:border-[3px]'
                ref={uname}
            />

            <input
                type="password"
                placeholder='Password'
                className='mb-4 w-full p-2 border border-orange-400 rounded bg-transparent text-orange-400 focus:outline-none focus:border-[3px]'
                ref={pass}
            />

            {errorMessage && (
                <div className='mt-4 text-red-500 font-semibold'>{errorMessage}</div>
            )}
            
            <button
                onClick={validateLogin}
                type='button'
                className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-orange-100 text-black rounded-md group-hover:bg-opacity-0">
                    {loading ? 'Processing...' : "Login"}
                </span>
            </button>
        </div>
    );
}
