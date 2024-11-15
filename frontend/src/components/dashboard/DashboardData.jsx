import React from 'react';
import { useRecoilValue } from 'recoil';
import { doctorAtom } from "../../context/atoms/doctorAtom";
import GenderChart from '../../components/Graphs/GenderChart';
import Profile from '../../components/dashboard/Profile';

export default function DashboardData({ patientCount, visitByGender }) {
    const doctorData = useRecoilValue(doctorAtom);
    const patientsList = doctorData.appointments;

    return (
        <div className="flex flex-col gap-3 p-4 rounded-3xl">
            <h2 className="text-4xl font-semibold text-center text-pink-600 mb-6">Dashboard Overview</h2>
            <div className="flex flex-col gap-10 lg:flex-row">
                <Profile name={doctorData.name} qua={doctorData.edu} email={doctorData.email} />
                <div className="flex-1 min-w-[300px] bg-pink-50 border-[2px] border-pink-300 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 p-4">
                    <h2 className="text-2xl font-semibold text-pink-600">Patients by Gender</h2>
                    <div className="mt-2">
                        <GenderChart malePercentage={visitByGender.male} femalePercentage={visitByGender.female} />
                    </div>
                </div>

                <div className="flex-1 max-w-[400px] max-h-[200px] bg-pink-50 border-[2px] border-pink-300 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 p-4">
                    <h2 className="text-2xl font-semibold text-pink-600">Current Patients</h2>
                    <p className="text-5xl text-green-500">{patientCount}</p>
                </div>
            </div>

            {/* Patients List Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-3xl p-4 border-2 border-pink-300 mt-[30px]">
                <h2 className="text-xl font-semibold text-pink-600">Basic Overview of Patients</h2>
                <div className="mt-2">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b text-left">First Name</th>
                                <th className="px-4 py-2 border-b text-left">Last Name</th>
                                <th className="px-4 py-2 border-b text-left">DOB</th>
                                <th className="px-4 py-2 border-b text-left">Issue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientsList.map((patient, index) => (
                                <tr key={index} className="hover:bg-pink-50">
                                    <td className="px-4 py-2 border-b">{patient.fname}</td>
                                    <td className="px-4 py-2 border-b">{patient.lname}</td>
                                    <td className="px-4 py-2 border-b">{patient.dob}</td>
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
