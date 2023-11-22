import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes,  } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AllVenues from './Pages/AllVenues';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import UserBookingDetails from './Pages/UserBookingDetails';
import BookableDetails from './Pages/BookableDetails';
import { AuthProvider } from './contexts/AuthContext';
import ConfirmBooking from './Pages/ConfirmBooking';
import PrivateRoute from './utils/PrivateRoute';
import Confirmation from './Pages/Confirmation';
import ErrorBoundary from './ErrorBoundary';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allvenues" element={<AllVenues />} />
            <Route path="/booking-details/:id" element={<UserBookingDetails />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/bookable/:id" element={<BookableDetails />} />
            <Route
            path="/confirm-booking"
            element={
            <PrivateRoute>
              <ConfirmBooking />
              </PrivateRoute> } 
          />
           <Route 
            path="/profile"
            element={ 
             <PrivateRoute>
              <Profile />
               </PrivateRoute> } 
           />
          </Routes>
          <Footer />
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
