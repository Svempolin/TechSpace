import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute = <P extends object>(Component: ComponentType<P>): React.FC<P & ProtectedRouteProps> => {
  const AuthRoute: React.FC<P & ProtectedRouteProps> = (props) => {
    const { isAuthenticated, ...rest } = props;
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Component {...rest as P} /> : null;
  };

  return AuthRoute;
};

export default ProtectedRoute;

