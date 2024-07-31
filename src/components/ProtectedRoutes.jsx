import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextManager.jsx';

const ProtectedRoutes = ({ allowedRoles }) => {
  const { authUser } = useContext(AuthContext);
  const location = useLocation();

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(authUser.account_type)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
