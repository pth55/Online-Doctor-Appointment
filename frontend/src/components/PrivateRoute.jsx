// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isLogin from '../context/atoms/isLogin';

const PrivateRoute = ({ children }) => {
    const loginState = useRecoilValue(isLogin);
    return loginState.isLoggedIn ? children : <Navigate to="/doctor-login" replace/>;
};

export default PrivateRoute;
