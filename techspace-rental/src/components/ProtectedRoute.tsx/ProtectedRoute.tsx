import React from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface ProtectedRouteProps {
  // Assuming Component is a React component type
  Component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Component, ...props }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // !! boolean casting
  const navigate = useNavigate() as NavigateFunction;

  if (isAuthenticated) {
    return <Component {...props} />;
  } else {
    navigate('/login');
    return null;
  }
};

export default ProtectedRoute;




// // ProtectedRoute.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoute = (Component) => {
//   const AuthRoute = (props) => {
//     const isAuthenticated = !!localStorage.getItem('token'); // !! boolean casting
//     const navigate = useNavigate();

//     if (isAuthenticated) {
//       return <Component {...props} />;
//     } else {
//       navigate('/login');
//       return null;
//     }
//   };

//   return AuthRoute;
// };

// export default ProtectedRoute;