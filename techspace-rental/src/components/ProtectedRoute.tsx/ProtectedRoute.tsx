import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean; // You should get this value from your authentication logic
}

const ProtectedRoute = <P extends object>(Component: ComponentType<P>): React.FC<P & ProtectedRouteProps> => {
  const AuthRoute: React.FC<P & ProtectedRouteProps> = (props) => {
    const { isAuthenticated, ...rest } = props;
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Component {...rest as P} /> : null;
  };

  return AuthRoute;
};

export default ProtectedRoute;
