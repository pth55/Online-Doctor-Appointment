// src/App.js
import './App.css';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import About from './components/About';
import Contact from './components/Contact';
import DoctorLogin from './components/Auth/DoctorLogin';
import PatientRegister from './components/PatientRegister/PatientRegister';
import DoctorRegister from './components/DoctorRegister/DoctorRegister';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();

  // Show NavBar for the listed routes and include wildcard path separately
  const showNavBar = ["/", "/home", "/about", "/contact", "/doctor-login", "/patient-register", "/doctor-register"].includes(location.pathname) || location.pathname === "*";
  
  // Orange background color only for routes that are not /doctor-login and /patient-register
  const backgroundColor = ["/dashboard"].includes(location.pathname) ? 'bg-white' : 'bg-orange-100';

  return (
    <div className={`${backgroundColor} min-h-screen flex flex-col`}>
      {/* Conditionally render NavBar */}
      {showNavBar && <NavBar />}
      <div className={`flex-1 ${showNavBar ? 'pt-[80px]' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/patient-register" element={<PatientRegister />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
