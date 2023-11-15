import React, { useState, useEffect } from 'react';
import BookableCard from '../ConferenceCard/ConferenceCard';

interface Location {
  address: string;
  parkingDistance: string;
  subwayDistance: string;
  busDistance: string;
}

interface ContactPerson {
  name: string;
  email: string;
  phone: string;
}

interface Bookable {
  _id: string;
  name: string;
  description: string;
  images: string[];
  address: string;
  area: string;
  longitude: number;
  latitude: number;
  rating: number;
  price: number;
  tags: string[];
  attendees: number;
  amenities: string[];
  location: Location;
  size: number;
  contact_person: ContactPerson;
  breakoutRooms: boolean;
}


const BookableList: React.FC = () => {
    const [bookables, setBookables] = useState<Bookable[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('http://localhost:7777/api/bookables/all')
            .then(response => response.json())
            .then(data => {
                if (data && data.data.bookables.length > 0) {
                    setBookables(data.data.bookables.slice(0, 4) as Bookable[]); // Take the first 4 bookables
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bookable-list">
            {bookables.map((bookable: Bookable) => (
                <BookableCard key={bookable._id} bookable={bookable} />
            ))}
        </div>
    );
};

export default BookableList;
