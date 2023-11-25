import mongoose from 'mongoose';

const { Schema } = mongoose;

const likedBookableSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        bookable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bookable', // Reference to the Bookable model
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const LikedBookable = mongoose.model('LikedBookable', likedBookableSchema);

export default LikedBookable;
