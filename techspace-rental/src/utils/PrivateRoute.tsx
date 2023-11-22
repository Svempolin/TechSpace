import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
