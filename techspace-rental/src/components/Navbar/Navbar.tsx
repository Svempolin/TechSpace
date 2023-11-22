

 import { Link } from 'react-router-dom';
import  { useState } from 'react';
import logo from '../../assets/techspace-logo.png';
import masthead from '../../assets/masthead_2880.jpg';
import LoginModal from '../LoginModal/LoginModal'; // Import the LoginModal component
import SignupModal from '../SignupModal/SignupModal'; // Import the SignupModal component
import { useAuth } from '../../contexts/AuthContext';


const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { isLoggedIn, login, signup, logout } = useAuth();

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
  
      // Use the login function from the useAuth hook to update authentication status
      await login(formData); // Assuming login handles setting the authentication status
  
      localStorage.setItem('accessToken', data.data.token);
      setShowLoginModal(false); // Close the login modal upon successful login
      console.log('Login successful:', data); // Log successful login data
    } catch (error: any) {
      console.error('Error during login:', error.message);
    }
  };
  const handleLogout = () => {
    // Clear authentication status and perform any other necessary logout operations
    logout();
  };
 
  
  
  const handleSignup = async (formData: { /* signup form fields */ }) => {
    try {
      // Call the signup function from the useAuth hook
      await signup(formData);
      // Additional logic after successful signup if needed
    } catch (error: any) {
      console.error('Error during signup:', error.message);
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
          {isLoggedIn && <Link to={`/profile`}>Profile</Link>}

          <li>
          {isLoggedIn ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <button onClick={toggleLoginModal}>Login</button>
            )}
      </li>
      {showLoginModal && (
        <LoginModal onClose={toggleLoginModal} onLogin={handleLogin} onSignup={handleSignup} />
      )}
      {showSignupModal && ( <SignupModal onClose={toggleSignupModal} onSignup={handleSignup} />
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