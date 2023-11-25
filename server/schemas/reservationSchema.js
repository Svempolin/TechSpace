import  mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    bookable_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    attendees: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    catering: {
        type: Boolean,
        default: false
    },
    total_price: {
        type: Number,
        required: true
    },
    booking_nr: {
        type: Number,
       
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
});


export default mongoose.model("reservations", reservationSchema);