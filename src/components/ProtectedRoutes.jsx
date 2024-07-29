import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/Login.jsx';


const ProtectedRoutes = (props) => {
    //todo: change the code check if the type
    if (props.isUserAuthenticated().userType == "unauthenticated") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;