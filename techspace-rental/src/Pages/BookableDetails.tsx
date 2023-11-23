import React, { useState, useEffect } from 'react';
import LoginModal from '../components/LoginModal/LoginModal';
import { useAuth } from '../contexts/AuthContext';
import BookableList from '../components/ConferenceList/ConferenceList';
import { useNavigate, useParams } from 'react-router-dom';
import GMapsPlaceholder from '../assets/GMapsPlaceholder.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

  faMaximize,
  faWifi,
  faWheelchair,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import boardroom from '../assets/icon-boardroom.png';
import classroom from '../assets/icon-classroom.png';
import standing from '../assets/icon-standing.png';
import theatre from '../assets/icon-theatre.png';

const BookableDetails = () => {
  const { signup } = useAuth(); // Get the signup function from the authentication context
  const { isLoggedIn, login } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { id } = useParams<{ id: string }>(); // Ensure to set the correct type for id
  const [bookable, setBookable] = useState<any>(null); // Replace 'any' with your bookable type
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);

  const [attendees, setAttendees] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("option1");
  const [addCatering, setAddCatering] = useState(false);

  const [pricePerHour, setPricePerHour] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(399);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    const hours = calculateHours();
    return pricePerHour * hours + cleaningFee;
  };

  const calculateHours = () => {
    switch (time) {
      case "08-12PM":
        return 4;
      case "12-04PM":
        return 4;
      case "04-08PM":
        return 4;
      case "08AM-08PM":
        return 12;
      default:
        return 0;
    }
  };

  const navigate = useNavigate();
 
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  console.log('handleSubmit');
    const bookingDetails = {
      bookable,
      attendees,
      date: startDate,
      time: time,
      addCatering,
      calculateTotalPrice: totalPrice,
    };
    const user = JSON.parse(localStorage.getItem("user") || "");
    console.log("token", localStorage.getItem("token"));
    fetch('http://localhost:7777/api/reservations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        bookable_id: bookable._id,
        user_id: user?._id,
        date: startDate,
        time,
        attendees,
        total_price: 1000,
      }),
      }).then((response) => {
        response.json().then((data) => {
          console.log(
            'Successful created reservation',
            JSON.stringify(data, null, 2)
          );
          navigate(`/booking-details/${data.reservation._id}`, { state: { token: localStorage.getItem('token') } });
        });
      }).catch((error) => {
        console.error('Error during reservation creation:', error)
      });
    
     console.log('bookingDetails', bookingDetails);

    // If user is not logged in, show the login modal
    if (!isLoggedIn) {
      setShowLoginModal(true);
      console.log('hej ej ');
      return;
    }

    // If user is logged in, navigate to confirmBooking
//    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
//    console.log('hej nu ska du bli navigerad  ');
//    navigate(`/booking-details/${id}`, { state: { token: localStorage.getItem('token') } });
  };


  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [time, pricePerHour, cleaningFee]);

  useEffect(() => {
    fetch(`http://localhost:7777/api/bookables/${id}`)
      .then(response => response.json())
      .then(data => {
        setBookable(data.data.bookable);
        setPricePerHour(data.data.bookable.price);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bookable) {
    return <div>No bookable found</div>;
  }

  return (
    <>
<div className="bookable-details-wrapper" >
<h2 className="heading2">{bookable.name}</h2>
<div className="big-image">
    {bookable.images && bookable.images.length > 0 && (
      <img src={bookable.images[selectedImage]} alt={`Image ${selectedImage}`} />
      )}
      <img className='GMaps-placeholder' src={GMapsPlaceholder} alt="Google Maps Placeholder" />
</div>
<div className="small-images">
  {bookable.images && bookable.images.length > 0 && (
    bookable.images.map((image: string, index: number) => (
      <div key={index} onClick={() => handleImageClick(index)}>
        <img src={image} alt={`Image ${index}`} />
      </div>
    ))
  )}
</div>
</div>
<div className='bookable-details-grid'>
<div className="bookable-details-left">
    <div className="description">
    <h1 className='heading2 section-headline'>Information</h1>
      <p>{bookable.description}</p>

      <h1 className='heading2 section-headline'>Amenities</h1>
      <div className='amenities-icons-wrapper'>
      <div className='amenities-icon'>
      <FontAwesomeIcon icon={faMaximize} />
      <p>{bookable.size}m^2</p>
      </div>
      <div className='amenities-icon'>
      <FontAwesomeIcon icon={faWifi} />
      <p>Wi-Fi</p>
      </div>
      <div className='amenities-icon'>
      <FontAwesomeIcon icon={faWheelchair} />
      <p>Accessible</p>
      </div>
      <div className='amenities-icon'>
      <FontAwesomeIcon icon={faUtensils} />
      <p>Catering</p>
      </div>
      </div>
      <p>Our venue is located so that it is accessible to all. We offer catering and many different type of aid so that your tech event will run smoothly. There is always coffee, tea and water available.</p>
      <h1 className='heading2 section-headline'>Arrangements</h1>
      <div className='arrangements'>

          <img src={boardroom} alt="boardroom" />
          <img src={standing} alt="standing" />
          <img src={classroom} alt="classroom" />
          <img src={theatre} alt="classroom" />
      </div>
      <h1 className='heading2 section-headline'>Venue contact</h1>
      <p>Do you have questions about this locale or its equipment? Please contact the venue directly.</p>
    </div>
  </div>

<div className="bookable-details-right">
<div className='bookable-details-container'>
<div className="booking-details">
  <div className="dropdowns-bookable-details">
    <h2>Book this venue</h2>
    <h3>From SEK {bookable.price}/hour</h3>
  <div className="dropdown-group">
      <label htmlFor="attendees" className="dropdown-label heading2">
        Attendees:
      </label>
      <select className="dropdown confirm-booking-dropdown" id="attendees" name="attendees" value={attendees} onChange={(e) => setAttendees(e.target.value)}>
        <option value="" disabled>Select quantity</option>
        <option value="5-10">5-10</option>
        <option value="10-30">10-30</option>
        <option value="30-60">30-60</option>
        <option value="60-100">60-100 +</option>
      </select>
    </div>
    
    <div className="dropdown-group">
      <label htmlFor="date" className="dropdown-label heading2">
        Date:
      </label>
      <DatePicker
  selected={startDate}
  onChange={(date) => setStartDate(date || new Date())}
  className="date-picker confirm-booking-dropdown"
/>
    </div>
    <div className="dropdown-group">
      <label htmlFor="time" className="dropdown-label heading2">
        Time:
      </label>
      <select className="dropdown confirm-booking-dropdown" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="" disabled>Select time</option>
        <option value="08-12PM">Morning 08 - 12 AM</option>
        <option value="12-04PM">Afternoon 12 - 04 PM</option>
        <option value="04-08PM">Evening 04 - 08 PM</option>
        <option value="08AM-08PM">Whole Day 08 AM - 08 PM</option>
      </select>

    </div>

  </div>
  <div className="checkbox-group">
    <input 
      type="checkbox" 
      id="confirmation" 
      name="confirmation" 
      
    />
    <label htmlFor="confirmation" className="checkbox-label">
      Add catering to your booking
    </label>
    <span 
      className="info-icon" 
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      ?
    </span>
    {showTooltip && (
      <div className="tooltip">
        If you want to add catering to your booking, you will be contacted by the catering company to discuss your requirements via your email.
      </div>
    )}
  </div>
  <div className="price-details">
      <p>{`SEK ${pricePerHour} x ${calculateHours()} hours`}</p>
      <p>{`Cleaning Fee: SEK ${cleaningFee}`}</p>
      <p>{`Total Price: SEK ${calculateTotalPrice()}`}</p>
    </div>
  <div className="button-container">
    <button className="confirm-booking-button" onClick={handleSubmit}>BOOK NOW</button>
  </div>
  {showLoginModal && (
        <LoginModal
          onLogin={() => {}}
          onSignup={async (formData) => {
            try {
              // Call the signup function from your authentication context
              await signup(formData);
              setShowLoginModal(false); // Close the modal after successful signup
            } catch (error) {
              console.error('Error during signup:', error);
              // Handle signup error, if needed
            }
          }}
          onClose={() => setShowLoginModal(false)}
        />
      )}
  <div className='terms-p'>
    <p>Confirmation and Payment Options to follow.</p>
    <p><span>Terms & Conditions</span> apply.</p>
  </div>
</div>
</div>
<div className="bookable-contact">
  <div className="bookable-contact-left">
    <h3>{bookable.name}</h3>
    <p>{bookable.address}</p>
  </div>
  <div className="bookable-contact-right">
    <h3>Contact Person</h3>
    </div>
</div>
</div>
</div>
<h2 className='heading2 section-headline'>Other venues you might like</h2>
<BookableList />
</>

);
};

export default BookableDetails;
