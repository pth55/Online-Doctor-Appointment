import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import DoctorLogin from "./components/Auth/DoctorLogin.jsx"
import Landing from "./components/Landing/Landing.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import PatientRegister from './components/PatientRegister/PatientRegister.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <div className='h-[100svh]'>
      <div className="pt-[5rem]">
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Landing/>} />
          {/* DOCTOR DASHBOARD */}
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          } />
          
          <Route path='/doctor-login' element={<DoctorLogin/>} />
          <Route path='/patient-register' element={<PatientRegister/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
