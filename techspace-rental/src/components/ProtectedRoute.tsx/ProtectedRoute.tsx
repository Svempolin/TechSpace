import React, {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  // You can include other necessary props for your ProtectedRoute
}


const ProtectedRoute = <P extends object & ProtectedRouteProps>(Component: React.ComponentType<P>): React.FC<P> => {
  const AuthRoute: React.FC<P> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!props.isAuthenticated) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    }, [props.isAuthenticated, navigate]);

    return props.isAuthenticated ? <Component {...props} /> : null;
  };

  return AuthRoute;
};

export default ProtectedRoute;
