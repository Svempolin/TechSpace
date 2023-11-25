import Bookable  from '../schemas/bookingSchema.js';
// import { Request, Response, NextFunction } from 'express';

const getAllBookables = async (req, res, next) => {
    try {
        const bookables = await Bookable.find();
        res.status(200).json({
            status: 'success',
            results: bookables.length,
            data: {
                bookables,
            },
        });
    } catch (err) {
        next(err);
    }
};

const getBookable = async (req, res, next) => {
    try {
        const bookable = await Bookable.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                bookable,
            },
        });
    } catch (err) {
        next(err);
    }
};

const createBookable = async (req, res, next) => {
    try {
        const newBookable = await Bookable.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                bookable: newBookable,
            },
        });
    } catch (err) {
        next(err);
    }
};

const deleteBookable = async (req, res, next) => {
    try {
        const deletedBookable = await Bookable.findByIdAndDelete(req.params.id);

        if (!deletedBookable) {
            return res.status(404).json({
                status: 'fail',
                message: 'Bookable not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Bookable deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};

const updateBookable = async (req, res, next) => {
    try {
        const updatedBookable = await Bookable.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Use $set to update only the fields provided in the request body
            { new: true, runValidators: true }
        );

        if (!updatedBookable) {
            return res.status(404).json({
                status: 'fail',
                message: 'Bookable not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                bookable: updatedBookable,
            },
        });
    } catch (err) {
        next(err);
    }
};

export {
    getAllBookables,
    getBookable,
    createBookable,
    deleteBookable,
    updateBookable,
};






