import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { doctorAtom } from '../../context/atoms/doctorAtom';

const Modal = ({ appointment, onDelete, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-10 rounded shadow-md">
                <h2 className="text-xl font-semibold">Appointment Details</h2>
                <p><strong>First Name:</strong> {appointment.fname}</p>
                <p><strong>Last Name:</strong> {appointment.lname}</p>
                <p><strong>Phone Number:</strong> {appointment.phone}</p>
                <p><strong>DOB:</strong> {appointment.dob}</p>
                <p><strong>Email:</strong> {appointment.email}</p>
                <p><strong>Issue:</strong> {appointment.issue}</p>
                
                <div className="flex justify-end mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded" onClick={onDelete}>
                        Delete
                    </button>
                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Appointments() {
    const setPatientsList = useSetRecoilState(doctorAtom);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const doctorData = useRecoilValue(doctorAtom);
    const patientsList = doctorData.appointments;
    
    const handleRowClick = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedAppointment) return; // Safety check

        // Make API call to delete from the database
        try {
            const response = await fetch('http://localhost:3043/api/deletePatient', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctorId: doctorData.docId, // Pass the doctor ID
                    email: selectedAppointment.email, // Pass the patient's email
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete appointment from DB');
            }

            // Now update local state only after successful deletion
            setPatientsList((prevState) => {
                if (!Array.isArray(prevState.appointments)) {
                    console.error('Expected appointments to be an array');
                    return prevState; // Return the previous state if it's not an array
                }
        
                return {
                    ...prevState,
                    appointments: prevState.appointments.filter((patient) => 
                        patient.email !== selectedAppointment.email // Use a unique attribute to filter
                    ),
                };
            });

            // Close modal after successful deletion
            setIsModalOpen(false);
            setSelectedAppointment(null);
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Failed to delete appointment from DB. Please try again.');
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    return (
        <div className="flex flex-col gap-4 p-4 bg-pink-50 rounded-3xl">
            <h2 className="text-4xl font-semibold text-center text-pink-600 mb-6">All Appointments</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-3xl p-4 border-2 border-pink-300">
                <div className="mt-2">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b text-left">First Name</th>
                                <th className="px-4 py-2 border-b text-left">Last Name</th>
                                <th className="px-4 py-2 border-b text-left">Phone Number</th>
                                <th className="px-4 py-2 border-b text-left">DOB</th>
                                <th className="px-4 py-2 border-b text-left">Email</th>
                                <th className="px-4 py-2 border-b text-left">Issue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientsList.map((ele, ind) => (
                                <tr key={ele.docId || ind} className="hover:bg-gray-50" onClick={() => handleRowClick(ele)}>
                                    <td className="px-4 py-2 border-b">{ele.fname}</td>
                                    <td className="px-4 py-2 border-b">{ele.lname}</td>
                                    <td className="px-4 py-2 border-b">{ele.phone}</td>
                                    <td className="px-4 py-2 border-b">{ele.dob}</td>
                                    <td className="px-4 py-2 border-b">{ele.email}</td>
                                    <td className="px-4 py-2 border-b">{ele.issue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <Modal 
                    appointment={selectedAppointment} 
                    onDelete={handleDelete} 
                    onClose={handleClose} 
                />
            )}
        </div>
    );
}
