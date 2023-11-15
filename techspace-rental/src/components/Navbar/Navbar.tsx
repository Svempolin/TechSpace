import { Link } from 'react-router-dom';
import  { useState } from 'react';
import logo from '../../assets/techspace-logo.png';
import masthead from '../../assets/masthead_2880.jpg';
import LoginModal from '../LoginModal/LoginModal'; // Import the LoginModal component
import SignupModal from '../SignupModal/SignupModal'; // Import the SignupModal component

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };

  const handleLogin = async (formData: any) => {
    try {
      const response = await fetch('http://localhost:7777/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('accessToken', data.data.token);
        
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  const handleSignup = async (formData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/users/signup', {
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
      // Handle errors (e.g., display error message)
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
