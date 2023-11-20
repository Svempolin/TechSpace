import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.tsx/ProtectedRoute'; // Update the path as per your file structure

interface UserData {
  firstName: string;
  // Add other user data properties as needed
}

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  // Add other props needed by the ProtectedRoute component
  // ...
}

// Define the ProfileContent component type
type ProfileContentType = React.FC;

const ProfileContent: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:7777/api/users/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.data.user);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
   
          <div className="profile-wrapper">
            {userData && (
              <div>
                <h1>Hello {userData.firstName}!</h1>
                {/* <p>Email: {userData.email}</p> */}
              </div>
            )}
            <div className="profile-content-container">
              <div className="current-bookings">
                <h1 className='heading2 section-headline'>Current Bookings</h1>
                {/* Render reservations */}
              </div>
              <div className="liked-bookables">
                <h1 className='heading2 section-headline'>Liked Venues</h1>
                {/* Render liked venues */}
              </div>
              <div className="previous-booking">
                <h1 className='heading2 section-headline'>Previous Bookings</h1>
                {/* Render previous bookings */}
              </div>
            </div>
          </div>
        );
};

// Define the Profile component
const Profile: React.FC = () => {
  const navigate = useNavigate();

  // Logic to determine if the user is logged in or not
  const isLoggedIn = true; // Replace this with your logic to determine if the user is logged in

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const ProfileWithAuth = ProtectedRoute(ProfileContent);

  return isLoggedIn ? <ProfileWithAuth isAuthenticated={true} /> : null;
};

export default Profile;










