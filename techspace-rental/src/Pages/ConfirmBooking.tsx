import { access } from 'fs';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Bookable {
  _id: string;
  address: string;
  // Add other bookable details as needed
}

interface BookingDetails {
  attendees: string;
  date: string;
  time: string;
  addCatering: boolean;
  bookable: Bookable;
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
      const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token value

      if (!bookingDetails || !bookingDetails.bookable || !bookingDetails.bookable._id) {
        console.error('Booking details or bookable information is missing.');
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
        booking_nr: Math.floor(Math.random() * 1000000000),
        status: 'pending',

      };

      const response = await fetch('http://localhost:7777/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reservation),
      });

      if (!response.ok) {
        console.error('Error creating reservation:', response.status, response.statusText);
        // Log the response body or additional details if available
        const responseData = await response.json();
        console.log('Response Data:', responseData);
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

  const { attendees, date, time, addCatering, bookable, calculateTotalPrice } = bookingDetails;
  const formattedDate = date ? new Date(date).toDateString() : '';

  return (
    <div className='confirm-booking-wrapper'>
      <h2 className='confirm-booking-h2'>Confirm Booking</h2>
      <div className='confirm-booking-details'>
      <div className="left-info-confirm-booking">
        <h3>Booking Details</h3>
        <p>Address: {bookable.address}</p>
        <p>Attendees: {attendees}</p>
        <p>Date: {formattedDate}</p>
        <p>Time: {time}</p>
        <p>Add Catering: {addCatering ? 'Yes' : 'No'}</p>
        <p>Total Price: {calculateTotalPrice}</p>
        <div className="left-catering-info-box">
          <h3>Catering Details</h3>
          <p>If you have chosen catering for this booking, you will be contacted by Catering Company within 2 days. If you are not contacted, let us know at catering@techspace.com.</p>
        </div>
      </div>
      <div className="right-info-confirm-booking">
        <div className="terms-confirm-booking">
          <h3>Terms and Conditions</h3>
          <p>When it comes to cancellations, notify us at least 24 hours to avoid charges. After your meeting,  leave the room in a tidy state and dispose of any trash properly.
              We expect responsible usage and reporting of any damage. Please aim to start and finish your session as scheduled to avoid overtime charges. Make sure to keep your valuables attended. The number of attendees should not exceed the room's capacity. Kindly inform us in advance if you have specific accessibility requirements so we can make necessary accommodations. There is always staff on scene should you need us. By clicking the "Confirm Booking" button, you agree to the Terms and Conditions of TechSpace.</p>
          <div className="textarea-confirm-booking">
            <h3>Anything we need to know? Write down below</h3>
          <textarea placeholder='Write here ..' name="" id="" cols={30} rows={10}></textarea>
          </div>
        </div>
      </div>

      
      
        
      </div>
      {bookable && (
        <div>
       
        </div>
      )}
      <button className='confirm-button' onClick={handleConfirmBooking}>
        CONFIRM BOOKING
      </button>
    </div>
  );
};

export default ConfirmBooking;
