import React from 'react';
import BookableList from '../components/ConferenceList/ConferenceList';
import Slogan from '../components/Slogan/Slogan';
import CTABox from '../components/CTABox/CTABox';
import Testimonials from '../components/Testimonials/Testimonials';
import About from '../components/About/About';

const Home: React.FC = () => {
  return (
    <div>
      <CTABox />
      <Slogan />
      <h1 className='heading2 section-headline'>Popular Venues</h1>
      <BookableList />
      <div className='section-btn-wrapper'>
        <button className='button section-btn'>View All Venues</button>
      </div>
      <h1 className='heading2 section-headline m-t'>Testimonials</h1>
      <Testimonials />
      <About />
    </div>
  );
};

export default Home;
