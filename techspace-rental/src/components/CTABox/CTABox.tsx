import React, { useState, useEffect } from 'react';
import BookableCard from '../ConferenceCard/ConferenceCard.js';

interface Bookable {
  _id: string;
  attendees: number;
  area: string;
  name: string;
  images: string | string[]; 
  address: string;
  price: number;
  rating: number;
  // Add other properties as needed
}

const CTABox: React.FC = () => {
  const [bookables, setBookables] = useState<Bookable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [attendees, setAttendees] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [filteredBookables, setFilteredBookables] = useState<Bookable[]>([]);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const response = await fetch('http://localhost:7777/api/bookables/all');
      const data = await response.json();

      console.log('Data received:', data);

      if (data && data.data && Array.isArray(data.data.bookables)) {
        let newBookables: Bookable[] = data.data.bookables;

        // Filter based on attendees
        if (attendees !== '') {
          const attendeesArray = attendees.split('-').map(value => parseInt(value, 10));
          const [min, max] = attendeesArray;
          newBookables = newBookables.filter(bookable =>
            isNaN(min) || isNaN(max) || (bookable.attendees >= min && bookable.attendees <= max)
          );
        }

        // Filter based on location
        if (location !== '') {
          newBookables = newBookables.filter(bookable => bookable.area === location);
        }

        setFilteredBookables(newBookables.slice(0, 16));
        setBookables(newBookables.slice(0, 16));
      } else {
        console.error('Unexpected response format:', data);
        // Handle error state, set bookables to an empty array
        setFilteredBookables([]);
        setBookables([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state, set bookables to an empty array
      setFilteredBookables([]);
      setBookables([]);
    } finally {
      // Set loading to false after the try-catch block
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [attendees, location]);

  const handleSubmit = () => {
    setLoading(true);
    console.log('Submitting form...');
    fetchData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="cta-box">
        <h2 className="cta-heading">Book Your Next Tech Event Here!</h2>
        <div className="dropdowns">
          <div className="dropdown-group">
            <label htmlFor="option1" className="dropdown-label heading2">
              Location:
            </label>
            <select
              className="dropdown"
              id="option1"
              name="option1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select location</option>
              <option value="Center">Center</option>
              <option value="Kungsholmen">Kungsholmen</option>
              <option value="Solna">Solna</option>
              <option value="Södermalm">Södermalm</option>
            </select>
          </div>
          <div className="dropdown-group">
            <label htmlFor="option2" className="dropdown-label heading2">
              Attendees:
            </label>
            <select
              className="dropdown"
              id="option2"
              name="option2"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
            >
              <option value="">Select quantity</option>
              <option value="5-10">5-10</option>
              <option value="10-30">10-30</option>
              <option value="30-60">30-60</option>
              <option value="60-100">60-100 +</option>
            </select>
          </div>
        </div>
        <div className="cta-button-container">
          <button className="cta-button button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      {(location !== '' || attendees !== '') && (
        <div className="all-venues-wrapper">
          <div className="all-venues">
            <div className="all-bookable-list">
              {filteredBookables.map((bookable) => (
                <BookableCard key={bookable._id} bookable={bookable} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CTABox;
