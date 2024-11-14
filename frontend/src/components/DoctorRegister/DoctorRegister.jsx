import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        education: '',
        phone: '',
        email: '', // Added email field
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3043/api/doctorRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const result = await response.json();
            alert('Doctor Registration successful!');
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-white flex flex-col items-center justify-center border-[1px] rounded-lg p-4 max-w-md mx-auto mt-[150px]'>
            <span className='text-4xl m-2 pb-5 font-semibold text-[#FFA500] hover:underline'>Doctor Registration</span>
            <form onSubmit={handleSubmit} className='w-full'>
                <input
                    type="text"
                    name="fullName"
                    placeholder='Full Name'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="education"
                    placeholder='Qualification'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.education}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder='Phone Number'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email" // Changed to email input
                    name="email"
                    placeholder='Email Address'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder='Password (min 5 chars, alphanumeric)'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={5}
                />
                <div className="flex justify-center mt-4">
                    <button
                        type='submit'
                        className={`relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-orange-100 text-black rounded-md group-hover:bg-opacity-0">
                            {loading ? 'Processing...' : 'Register'}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorRegister;
