import { Link } from 'react-router-dom';
import  { useState } from 'react';
import logo from '../../assets/techspace-logo.png';
import masthead from '../../assets/masthead_2880.jpg';
import LoginModal from '../LoginModal/LoginModal'; // Import the LoginModal component
import SignupModal from '../SignupModal/SignupModal'; // Import the SignupModal component
import ProtectedRoute from '../ProtectedRoute.tsx/ProtectedRoute';


const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };
  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      console.log('Login form data:', formData);
      const response = await fetch('http://localhost:7777/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
  
      localStorage.setItem('accessToken', data.data.token);
      setIsAuthenticated(true); // Set authentication status to true upon successful login
      console.log('Login successful:', data); // Log successful login data
    } catch (error: any) {
      console.error('Error during login:', error.message);
      // Handle different error scenarios based on error.message or response status codes
      // For example, display an error message to the user based on the specific error
    }
  };
  // const handleLogin = async (formData: { email: string; password: string }) => {
  //   try {
  //     console.log('Login form data:', formData);
  //     const response = await fetch('http://localhost:7777/api/users/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  
  //     const data = await response.json();
  
  //     if (response.ok) {
  //       localStorage.setItem('accessToken', data.data.token);
  //       setIsAuthenticated(true); // Set authentication status to true upon successful login
  //       console.log('Login successful:', data); // Log successful login data
  //     } else {
  //       throw new Error(data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //   }
  // };
  
  
  const handleSignup = async (formData: any) => {
    try {
      const response = await fetch('http://localhost:7777/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <>
      <nav className="nav">
        <Link to="/" className="site-title">
          <img src={logo} alt="logo" />
        </Link>
        <ul>
          <Link to="/allvenues">All Venues</Link>
          <Link to={`/profile`}>Profile</Link>

          <li>
        <button onClick={toggleLoginModal}>Login</button>
      </li>
      {showLoginModal && (
        <LoginModal onClose={toggleLoginModal} onLogin={handleLogin} onSignup={toggleSignupModal} />
      )}
      {showSignupModal && (
        <SignupModal onClose={toggleSignupModal} onSignup={handleSignup} />
      )}
        </ul>
      </nav>
      <div className="masthead">
        <img src={masthead} alt="masthead" />
      </div>
    </>
  );
};

export default Navbar;
