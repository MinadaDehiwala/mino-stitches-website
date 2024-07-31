import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = (props) => {
    const userType = props.isUserAuthenticated().userType;

    if (userType === "unauthenticated") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
