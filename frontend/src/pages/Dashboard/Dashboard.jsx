import React, { useState } from 'react'; 
import DashboardData from './DashboardData.jsx';
import Appointments from '../../components/dashboard/Appointments.jsx';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { doctorAtom } from "../../context/atoms/doctorAtom.js";
import isLogin from "../../context/atoms/isLogin";
import { Link, useNavigate } from 'react-router-dom';

const DashboardComponent = () => {
    const appointments = useRecoilValue(doctorAtom).appointments;
    const totalAppointments = appointments.length;
    const maleCount = appointments.filter(patient => patient.gender === 'male').length;
    const femaleCount = appointments.filter(patient => patient.gender === 'female').length;

    const malePercentage = totalAppointments ? (maleCount / totalAppointments) * 100 : 0;
    const femalePercentage = totalAppointments ? (femaleCount / totalAppointments) * 100 : 0;

    return (
        <DashboardData 
            patientCount={totalAppointments}
            visitByGender={{ male: malePercentage, female: femalePercentage }} 
        />
    );
};

export default function Dashboard() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentComponent, setCurrentComponent] = useState(<DashboardComponent />);

    const setRecoilState = useSetRecoilState(doctorAtom);
    const setIsLogin = useSetRecoilState(isLogin);
    const navigate = useNavigate();

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    const handleSidebarClick = (component) => {
        setCurrentComponent(component);
        setDrawerOpen(false);
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button 
                                onClick={toggleDrawer} 
                                aria-controls="logo-sidebar" 
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a className="flex ms-2 md:me-24">
                                <Link to='/' className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Doctor Dashboard</Link>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-50 h-screen pt-20 transition-transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button onClick={() => handleSidebarClick(<DashboardComponent />)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleSidebarClick(<Appointments />)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Appointments</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => {
                                setRecoilState({
                                    appointments: [],
                                    id: null,
                                    name: null,
                                    email: null,
                                    phone: null,
                                    edu: null,
                                    password: null,
                                });
                                setIsLogin({isLoggedIn: false});
                                navigate("/");
                            }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Log out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-[150px]">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    {currentComponent}
                </div>
            </div>
        </>
    );
}