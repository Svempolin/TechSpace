// Import necessary dependencies and resources
import React from 'react';
import footerLogo from '../../assets/techspace-footer-Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Define a Footer component using functional syntax
const Footer = () => {
  return (
    // Footer section with different divisions for content
    <footer>
      {/* Division for the left part of the footer */}
      <div className="footer-left">
        {/* Displaying a logo */}
        <img src={footerLogo} alt="Logo" />
      </div>

      {/* Division for the middle part of the footer */}
      <div className="footer-middle">
        {/* Four links */}
        <a href="#">All venues</a>
        <a href="#">About us</a>
        <a href="#">Contact</a>
        <a href="#">Log in</a>

        {/* Division for social icons */}
        <div className="social-icons">
          {/* Placeholder for social icons (commented out) */}
          {/* <FontAwesomeIcon icon={} />
          <FontAwesomeIcon icon={faInstagram} /> */}
        </div>
      </div>

      {/* Horizontal line separator */}
      <hr />

      {/* Division for the bottom part of the footer */}
      <div className="footer-bottom">
        <p>All rights reserved. Copyright</p>
        
        {/* Division for payment icons */}
        <div className="payment-icons">
          {/* Placeholder for payment icons (commented out) */}
          {/* <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faTwitter} /> */}
        </div>
      </div>
    </footer>
  );
};

// Export the Footer component to be used in other parts of the application
export default Footer;

