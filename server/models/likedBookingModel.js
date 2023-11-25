import LikedBookable from '../schemas/likedBookingSchema.js';


const getAllLikedBookables = async (req, res, next) => {
    try {
        const likedBookables = await LikedBookable.find();
        res.status(200).json({
            status: 'success',
            results: likedBookables.length,
            data: {
                likedBookables,
            },
        });
    } catch (err) {
        next(err);
    }
};

const getLikedBookablesByUser = async (req, res, next) => {
    try {
        const likedBookables = await LikedBookable.find({ user: req.params.userId }).populate('bookable');

        res.status(200).json({
            status: 'success',
            results: likedBookables.length,
            data: {
                likedBookables,
            },
        });
    } catch (err) {
        next(err);
    }
};

const likeBookable = async (req, res, next) => {
    try {
        const { user, bookable } = req.body;

        const newLikedBookable = await LikedBookable.create({
            user,
            bookable,
        });

        res.status(201).json({
            status: 'success',
            data: {
                likedBookable: newLikedBookable,
            },
        });
    } catch (err) {
        next(err);
    }
};

const unlikeBookable = async (req, res, next) => {
    try {
        const deletedLikedBookable = await LikedBookable.findOneAndDelete({
            user: req.params.userId,
            bookable: req.params.bookableId,
        });

        if (!deletedLikedBookable) {
            return res.status(404).json({
                status: 'fail',
                message: 'Liked Bookable not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Liked Bookable removed successfully',
        });
    } catch (err) {
        next(err);
    }
};

export {
    getAllLikedBookables,
    getLikedBookablesByUser,
    likeBookable,
    unlikeBookable,
};
