import React, { useState } from 'react';
// import './HomeDropdown.css';

const HomeDropdown: React.FC = () => {
  const [location, setLocation] = useState<string>('Select Location');
  const [quantity, setQuantity] = useState<string>('Select Quantity');

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(event.target.value);
  };

  const handleDoneClick = () => {
    // Implement logic for Done button here
    console.log('Done button clicked!');
  };

  return (
    <div className="main-box">
      <h2>Your Next Tech Event</h2>
      <div className="dropdowns">
        <div className="dropdown">
          <label htmlFor="location">Location</label>
          <select id="location" value={location} onChange={handleLocationChange}>
            <option value="Select Location">Select Location</option>
            <option value="Kungsholmen">Kungsholmen</option>
            <option value="Östermalm">Östermalm</option>
            <option value="Kungsholmen">Södermalm</option>
            <option value="Östermalm">Norrmalm</option>
            <option value="Kungsholmen">Birkastan</option>
            <option value="Östermalm">Gamlastan</option>
            {/* Add more options */}
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="quantity">Attendees</label>
          <select id="quantity" value={quantity} onChange={handleQuantityChange}>
            <option value="Select Quantity">Select Quantity</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            {/* Add more options */}
          </select>
        </div>
      </div>
      <button className="submit-button" onClick={handleDoneClick}>
        SEARCH
      </button>
    </div>
  );
};

export default HomeDropdown;
