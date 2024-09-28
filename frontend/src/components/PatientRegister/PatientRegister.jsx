import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientRegister = () => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        firstname: '', 
        lastname: '',
        dob: '',
        phone: '',
        email: '',
        issue: '',
        gender: '',
        doctorId: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // api to fetch list of all dcotors
                const response = await fetch('http://localhost:3043/api/doctorList');
                const data = await response.json();
                setDoctors(Object.entries(data).map(([docId, name]) => ({ docId, name })));
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch('http://localhost:3043/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text(); // Get error message
                throw new Error(errorMessage);
            }
    
            const result = await response.json();
            alert('Registration successful!');
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center border rounded-lg p-4 max-w-md mx-auto'>
            <span className='text-5xl m-2'>Patient Registration</span>
            <form onSubmit={handleSubmit} className='w-full'>
                <input
                    type="text"
                    name="firstname" // Match with API
                    placeholder='First Name'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-orange-400 border-orange-400 focus:outline-none focus:border-[3px]'
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="lastname" // Match with API
                    placeholder='Last Name'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-orange-400 border-orange-400 focus:outline-none focus:border-[3px]'
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="dob"
                    className='mb-4 w-full p-2 border rounded bg-transparent text-orange-400 border-orange-400 focus:outline-none focus:border-[3px]'
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder='Phone Number'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-orange-400 border-orange-400 focus:outline-none focus:border-[3px]'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder='Email'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-orange-400 border-orange-400 focus:outline-none focus:border-[3px]'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="issue"
                    placeholder='Issue'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-orange-400 border-orange-400 focus:outline-none focus:border-[3px]'
                    value={formData.issue}
                    onChange={handleChange}
                    required
                />

                <select
                    name="gender"
                    className='mb-4 w-full p-2 border rounded bg-transparent text-orange-400 border-orange-400 focus:outline-none focus:border-[3px]'
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <select
                    name="doctorId"
                    className='mb-4 w-full p-2 border rounded bg-transparent text-orange-400 border-orange-400 focus:outline-none focus:border-[3px]'
                    value={formData.doctorId}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.docId} value={doctor.docId}>
                            {doctor.name}
                        </option>
                    ))}
                </select>

                <button
                    type='submit'
                    className={`relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-orange-100 text-black rounded-md group-hover:bg-opacity-0">
                        {loading ? 'Processing...' : "Register"}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default PatientRegister;
