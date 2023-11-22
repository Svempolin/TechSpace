import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


interface BookingDetails {
  attendees: string;
  date: string;
  time: string;
  addCatering: boolean;
  bookable: {
    _id: string;
    address: string;
    // Add other bookable details as needed
  };
  calculateTotalPrice: number;
}

const getUserFromStorage = (): any => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const ConfirmBooking: React.FC = () => {

  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const user = getUserFromStorage();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();


  useEffect(() => {
    const storedBookingDetails = localStorage.getItem('bookingDetails');
    if (storedBookingDetails) {
      setBookingDetails(JSON.parse(storedBookingDetails));
      localStorage.removeItem('bookingDetails');
    }
  }, []);

  const handleConfirmBooking = async () => {
    try {
      if (!bookingDetails || !bookingDetails.bookable || !bookingDetails.bookable._id) {
        console.error('Booking details or bookable information is missing.');
        return;
      }

      const token = localStorage.getItem('token');
      console.log('Token:', token); // Add console log to check token value

      if (!token) {
        console.error('Token not found.'); // Log an error if token is missing
        return;
      }

      const reservation = {
        bookable_id: bookingDetails.bookable._id,
        user_id: user?._id,
        date: bookingDetails.date,
        time: bookingDetails.time,
        attendees: bookingDetails.attendees,
        created_at: new Date(bookingDetails.date),
        catering: bookingDetails.addCatering,
        total_price: bookingDetails.calculateTotalPrice,
        status: 'pending',
      };

      const response = await fetch('http://localhost:7777/createReservation', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token || ''}`,
  } ,
  body: JSON.stringify(reservation),
   });

      if (!response.ok) {
        console.error('Error creating reservation:', response.status, response.statusText);
        return;
      }

      const responseData = await response.json();

      if (responseData.status === 'success' && responseData.data && responseData.data.reservation) {
        console.log('Reservation created:', responseData.data.reservation);
        navigate('/confirmation'); // Redirect to the confirmation page if logged in
      } else {
        console.error('Error creating reservation:', responseData);
      }
    } catch (error: any) {
      console.error('Error creating reservation:', error.message);
    }
  };

  if (!bookingDetails) {
    return <div>Loading...</div>;
  }

  const { attendees, date, time, addCatering, bookable } = bookingDetails;
  const formattedDate = date ? new Date(date).toDateString() : '';

  return (
    <div className='confirm-booking-wrapper'>
      <h2 className='confirm-booking-h2'>Confirm Booking</h2>
      <div className='confirm-booking-details'>
        <p>Attendees: {attendees}</p>
        <p>Date: {formattedDate}</p>
        <p>Time: {time}</p>
        <p>Add Catering: {addCatering ? 'Yes' : 'No'}</p>
      </div>
      {bookable && (
        <div>
          <h3>Bookable Details</h3>
          <p>Address: {bookable.address}</p>
          {/* Add other bookable details here */}
        </div>
      )}
      <div className='buttons'>
        <button>Cancel</button>
        <button className='confirm-button' onClick={handleConfirmBooking}>
        CONFIRM BOOKING
      </button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
