

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserGroup, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import './ConfrenceCard.css';


interface Bookable {
  _id: string;
  name: string;
  images: string | string[]; // images can be a string or an array of strings
  address: string;
  attendees: number;
  price: number;
  rating: number;
}

interface ConferenceCardProps {
  bookable?: Bookable;
}

const ConferenceCard: React.FC<ConferenceCardProps> = ({ bookable }) => {
  if (!bookable) {
    console.error("No bookable found");
    return <div>No bookable found</div>;
  }

  console.log("Bookable object:", bookable);

  if (!bookable._id || !bookable.images || !bookable.address || !bookable.attendees || !bookable.price || !bookable.rating) {
    console.error("Invalid bookable structure:", bookable);
    return <div>Invalid bookable structure</div>;
  }

  return (
    <Link to={`/bookable/${bookable._id}`} className="bookable-card">
      <div className="bookable-card">
        <div className="bookable-heart">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className="bookable-image-container">
          <div className="image-wrapper">
            <div className="bookable-image-container">
            <img
            className="bookable-image"
            src={Array.isArray(bookable.images) ? bookable.images[0] : bookable.images}
            alt={bookable.name}
            width={289}
            height={190}
/>
            </div>
          </div>
        </div>
        <div className="bookable-details">
          <div className="bookable-info">
            <div className="bookable-info-left">
              <p className="bookable-address">{bookable.address}</p>
              <p className="bookable-capacity">
                <FontAwesomeIcon icon={faUserGroup} /> {bookable.attendees}
              </p>
              <p className="bookable-price">{bookable.price} SEK/h</p>
            </div>
            <div className="bookable-info-right">
              <p className="bookable-rating">
                {bookable.rating} <FontAwesomeIcon icon={faStar} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConferenceCard;






// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faUserGroup, faHeart } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

// const BookableCard = ({ bookable }) => {
//     if (!bookable) {
//         return <div>No bookable found</div>;
//     }

//     return (
//         <Link to={`/bookable/${bookable._id}`} className="bookable-card">
//         <div className="bookable-card">
//             <div className="bookable-heart"><FontAwesomeIcon icon={faHeart} /></div>
//             <div className="bookable-image-container">
//                 <div className="image-wrapper">
//                     <div className="bookable-image-container">
//                         <img
//                             className="bookable-image"
//                             src={bookable.images[0]}
//                             alt={bookable.name}
//                             width="289"
//                             height="190" // Adjust this value as needed
//                         />
//                     </div>
//                 </div>
//             </div>
//             <div className="bookable-details">
//                 <div className="bookable-info">
//                     <div className="bookable-info-left">
//                         <p className="bookable-address">{bookable.address}</p>
//                         <p className="bookable-capacity"><FontAwesomeIcon icon={faUserGroup} /> {bookable.attendees}</p>
//                         <p className="bookable-price">{bookable.price} SEK/h</p>
//                     </div>
//                     <div className="bookable-info-right">
//                         <p className="bookable-rating">{bookable.rating} <FontAwesomeIcon icon={faStar} /></p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </Link>
//     );
// };

