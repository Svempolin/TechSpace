import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    attendees: {
        type: Number,
     
    },
    amenities: {
        type: [String],
       
    },
    location: {
        type: {
            address: String,
            parkingDistance: String,
            subwayDistance: String,
            busDistance: String
        },
    
    },
    size: {
        type: Number,
       
    },
    contact_person: {
        type: {
            name: String,
            email: String,
            phone: String
        },
       
    },
    breakoutRooms: {
        type: Boolean,
       
    }
});

const Bookable = model('Booking', bookingSchema);

export default Bookable;





// import mongoose from 'mongoose';

// const bookingSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   room: { type: mongoose.Schema.Types.ObjectId, ref: 'ConferenceRoom' },
//   bookingDate: Date,
//   duration: Number, // Add duration field
//   status: String, // Add status field (e.g., 'confirmed', 'pending', 'canceled')
//   participants: Number,
  
//   // Add more fields like duration, status, etc.
// });

// export default mongoose.model('Booking', bookingSchema);
