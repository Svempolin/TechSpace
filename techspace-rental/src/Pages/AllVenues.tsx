
import React, { useState, useEffect } from 'react';
import ConferenceCard from '../components/ConferenceCard/ConferenceCard';

interface Bookable {
  _id: string;
  name: string;
  images: string | string[]; // images can be a string or an array of strings
  address: string;
  attendees: number;
  price: number;
  rating: number;
}

const AllVenues: React.FC = () => {
  const [bookables, setBookables] = useState<Bookable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:7777/api/conferenceRooms/list')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        if (Array.isArray(data) && data.length > 0) {
          setBookables(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='all-venues-wrapper'>
      <div className='all-venues'>
        <div className='all-bookable-list'>
          {bookables.map((bookable) => (
            <ConferenceCard key={bookable._id} bookable={bookable} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllVenues;









