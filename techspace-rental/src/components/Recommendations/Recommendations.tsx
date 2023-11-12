import React, { useEffect, useState } from 'react';
import ConferenceCard from '../ConferenceCard/ConferenceCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Recommendations: React.FC = () => {
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleArrowClick = (direction: 'left' | 'right') => {
    const carousel = document.querySelector('.testi-carousel') as HTMLElement;
    const firstCardWidth = (document.querySelector('.testi-item') as HTMLElement)?.offsetWidth || 0;

    if (direction === 'left') {
      carousel.scrollLeft -= firstCardWidth;
    } else if (direction === 'right') {
      carousel.scrollLeft += firstCardWidth;
    }
  };

  const [bookables, setBookables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:7777/api/bookings/list')
      .then(response => response.json())
      .then(data => {
        if (data && data.data.bookables.length > 0) {
          setBookables(data.data.bookables.slice(0, 4)); // Take the first 4 bookables
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
    <div className='testi-wrapper'>
      <FontAwesomeIcon id="left" className='testi-arrow' icon={faChevronLeft} onClick={() => handleArrowClick('left')} />
      <ul className='testi-carousel' style={{ scrollLeft: `${scrollLeft}px` } as React.CSSProperties}>
        {bookables.map((bookable, index) => (
          <li className='testi-item' key={index}>
            <div className='testi-img' draggable={false}>
              <ConferenceCard bookable={bookable} />
            </div>
            <h3>John Doe</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
          </li>
        ))}
      </ul>
      <FontAwesomeIcon id="right" className='testi-arrow' icon={faChevronRight} onClick={() => handleArrowClick('right')} />
    </div>
  );
};

export default Recommendations;
