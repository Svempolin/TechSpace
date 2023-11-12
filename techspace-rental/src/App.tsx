import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllVenues from './Pages/AllVenues';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import UserBookingDetails from './Pages/UserBookingDetails';
import BookableDetails from './Pages/BookableDetails';

interface Props {
  isAuthenticated: boolean;
}

const App: React.FC<Props> = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allvenues" element={<AllVenues />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking-details:id" element={<UserBookingDetails />} />
        <Route path="/bookable-details" element={<BookableDetails />} />

        
      </Routes>
    </Router>
  );
};

export default App;
