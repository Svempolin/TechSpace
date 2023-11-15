import React, { useEffect, useState, useRef } from 'react';
import BookableCard from '../ConferenceCard/ConferenceCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Testimonials: React.FC = () => {
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const carouselRef = useRef<HTMLUListElement>(null);

  const handleArrowClick = (direction: string) => {
    const carousel = carouselRef.current;
    const firstCardWidth = document.querySelector('.testi-item')?.scrollWidth || 0;

    if (carousel) {
      if (direction === 'left') {
        carousel.scrollLeft -= firstCardWidth;
      } else if (direction === 'right') {
        carousel.scrollLeft += firstCardWidth;
      }
      setScrollLeft(carousel.scrollLeft);
    }
  };

  const [bookables, setBookables] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:7777/api/bookables/all')
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
      <FontAwesomeIcon id='left' className='testi-arrow' icon={faChevronLeft} onClick={() => handleArrowClick('left')} />
      <ul ref={carouselRef} className='testi-carousel'>
        {bookables.map((bookable, index) => (
          <li className='testi-item' key={index}>
            <div className='testi-img' draggable='false'>
              <BookableCard bookable={bookable} />
            </div>
            <h3>John Doe</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
          </li>
        ))}
      </ul>
      <FontAwesomeIcon id='right' className='testi-arrow' icon={faChevronRight} onClick={() => handleArrowClick('right')} />
    </div>
  );
};

export default Testimonials;
