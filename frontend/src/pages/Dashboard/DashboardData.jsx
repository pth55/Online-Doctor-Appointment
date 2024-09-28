import React from 'react';
import { useRecoilValue } from 'recoil';
import { doctorAtom } from "../../context/atoms/doctorAtom";
import GenderChart from '../../components/Graphs/GenderChart';
import Profile from '../../components/dashboard/Profile';

export default function Dashboard1({ patientCount, visitByGender }) {
    const doctorData = useRecoilValue(doctorAtom);
    const patientsList = doctorData.appointments;

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className='flex flex-col gap-10 lg:flex-row'>
                <Profile name={doctorData.name} qua={doctorData.edu} email={doctorData.email} />
                <div className="flex-1 min-w-[300px] max-h-[200px] bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Current Patients</h2>
                    <p className="text-5xl text-red-400">{patientCount}</p>
                </div>

                <div className="flex-1 min-w-[300px] bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Patients by Gender</h2>
                    <div className="mt-2">
                        <GenderChart malePercentage={visitByGender.male} femalePercentage={visitByGender.female} />
                    </div>
                </div>
            </div>

            {/* Patients List Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold">Patients List</h2>
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
                            {patientsList.map((patient, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{patient.fname}</td>
                                    <td className="px-4 py-2 border-b">{patient.lname}</td>
                                    <td className="px-4 py-2 border-b">{patient.phone}</td>
                                    <td className="px-4 py-2 border-b">{patient.dob}</td>
                                    <td className="px-4 py-2 border-b">{patient.email}</td>
                                    <td className="px-4 py-2 border-b">{patient.issue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
