import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientAppointment = () => {
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
    const [errorMessage, setErrorMessage] = useState(''); // Add state for error message
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
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
        setErrorMessage(''); // Clear error message before each submit

        try {
            const response = await fetch('http://localhost:3043/api/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                
                // Display specific message based on status code
                if (response.status === 500) {
                    setErrorMessage('Registration failed due to a server error. Please try again later.');
                } else {
                    setErrorMessage(errorMessage);
                }

                throw new Error(errorMessage);
            }

            const result = await response.json();
            alert('Appointment successful!');
            navigate('/');
        } catch (error) {
            console.error('Appointment error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center border-[1px] rounded-lg p-4 max-w-md mx-auto mt-[150px] bg-white'>
            <span className='text-4xl m-2 pb-5 text-[#FFA500] font-semibold hover:underline'>Patient Appointment</span>
            
            {/* Display error message if it exists */}
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            
            <form onSubmit={handleSubmit} className='w-full'>
                <input
                    type="text"
                    name="firstname"
                    placeholder='First Name'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder='Last Name'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="dob"
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.dob}
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
                    type="email"
                    name="email"
                    placeholder='Email'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="issue"
                    placeholder='Issue'
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.issue}
                    onChange={handleChange}
                    required
                />
                <select
                    name="gender"
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
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
                    className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[2px]'
                    value={formData.doctorId}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.docId} value={doctor.docId} className='text-orange-600'>
                            {doctor.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-center mt-4">
                    <button
                        type='submit'
                        className={`relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-orange-100 text-black rounded-md group-hover:bg-opacity-0">
                            {loading ? 'Processing...' : "Book Appointment"}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientAppointment;
