import React, { useState, useEffect } from 'react';
import BookableCard from '../components/ConferenceCard/ConferenceCard';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const AllVenues: React.FC = () => {
  const [bookables, setBookables] = useState<any[]>([]);
  const [filteredBookables, setFilteredBookables] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(false);

  const [attendees, setAttendees] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [location, setLocation] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const response = await fetch('http://localhost:7777/api/bookables/all');
      const data = await response.json();
  
      console.log('Data received:', data);
  
      if (data && data.data && Array.isArray(data.data.bookables)) {
        const newFilteredBookables = data.data.bookables.filter((bookable: any) => {
          const attendeesArray = attendees.split('-').map((value: string) => parseInt(value, 10));
          
          const [min, max] = attendeesArray;
          const attendeesValid = !isNaN(min) && !isNaN(max);
  
          const locationValid = location !== "";
  
          if (attendeesValid && locationValid) {
            return bookable.attendees >= min && bookable.attendees <= max && bookable.area === location;
          } else if (attendeesValid) {
            return bookable.attendees >= min && bookable.attendees <= max;
          } else if (locationValid) {
            return bookable.area === location;
          } else {
            return true; // No filters, include all bookables
          }
        });
  
        console.log('Filtered bookables:', newFilteredBookables);
  
        setFilteredBookables(newFilteredBookables);
        setBookables(newFilteredBookables.slice(0, 16));
        setShowLoadMore(newFilteredBookables.length > 16);
      } else {
        console.error('Unexpected response format:', data);
        // Handle error state, set bookables to an empty array
        setFilteredBookables([]);
        setBookables([]);
        setShowLoadMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state, set bookables to an empty array
      setFilteredBookables([]);
      setBookables([]);
      setShowLoadMore(false);
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

  const handleLoadMore = () => {
    const nextBookables = bookables.length + 16;
    const remainingBookables = filteredBookables.slice(nextBookables, nextBookables + 16);
  
    setBookables((prevBookables) => [...prevBookables, ...remainingBookables]);
    setShowLoadMore(remainingBookables.length > 0);
  };

  const handleReset = () => {
    setAttendees("");
    setStartDate(new Date());
    setLocation("");
    setPrice("");
    setLoading(true);
    console.log('Resetting filters...');
    fetchData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="all-venues-filter">
        <div className="dropdowns">
          <div className="dropdown-group">
            <label htmlFor="date" className="dropdown-label heading2">
              Date:
            </label>
            <DatePicker
               selected={startDate}
               onChange={(date: Date) => setStartDate(date as Date)}
               className="date-picker allvenues-dropdown"
            />
          </div>

          <div className="dropdown-group">
            <label htmlFor="location" className="dropdown-label heading2">
              Location:
            </label>
            <select
              className="dropdown allvenues-dropdown"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled>
                Select location
              </option>
              <option value="Center">Center</option>
              <option value="Kungsholmen">Kungsholmen</option>
              <option value="Solna">Solna</option>
              <option value="Södermalm">Södermalm</option>
            </select>
          </div>

          {/* Other dropdown groups here */}

          <div className="button-container">
            <button className="allvenues-button" onClick={handleSubmit}>
              Submit
            </button>
            <button className="allvenues-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className='all-venues-wrapper'>
        <div className="all-venues">
          <div className="all-bookable-list">
            {bookables.map((bookable: any) => (
              <BookableCard key={bookable._id} bookable={bookable} />
            ))}
          </div>
          {showLoadMore && <button onClick={handleLoadMore}>Load More</button>}
        </div>
      </div>
    </>
  );
};

export default AllVenues;
