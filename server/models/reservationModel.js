import Reservation from '../schemas/reservationSchema.js';


export const getAllReservations = async (req, res, next) => {
  try {
      const reservations = await Reservation.find();
      res.status(200).json({
          status: 'success',
          results: reservations.length,
          data: {
              reservations,
          },
      });
  } catch (err) {
      next(err);
  }
};

export const getReservation = async (req, res, next) => {
  try {
      const reservation = await Reservation.findById(req.params.id)
          .populate('bookable_id') 
          .populate('user_id'); 

      res.status(200).json({
          status: 'success',
          results: reservation ? 1 : 0, // Check if reservation exists
          data: {
              reservation,
          },
      });
  } catch (err) {
    console.log("failed to get reservation", err);
      next(err);
  }
};

export const createReservation = async (req, res, next) => {
  try {
      const newReservation = await Reservation.create(req.body);
      console.log("Going to create reservation", newReservation);
      res.status(201).json({
          status: 'success',
          data: {
              reservation: newReservation,
          },
      });
  } catch (err) {
    console.log("failed to create reservation", err);
      next(err);
  }
};

export const updateReservation = async (req, res, next) => {
  try {
      const reservation = await Reservation.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
              new: true,
              runValidators: true,
          }
      );
      res.status(200).json({
          status: 'success',
          data: {
              reservation,
          },
      });
  } catch (err) {
      next(err);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {
      await Reservation.findByIdAndDelete(req.params.id);
      res.status(204).json({
          status: 'success',
          data: null,
      });
  } catch (err) {
      next(err);
  }
};

export const getReservationsByUser = async (req, res, next) => {
  try {
      const reservations = await Reservation.find({ user_id: req.params.id })
          .populate('bookable_id') // Populating the bookable reference
          .populate('user_id'); // Populating the user reference

      res.status(200).json({
          status: 'success',
          results: reservations.length,
          data: {
              reservations,
          },
      });
  } catch (err) {
      next(err);
  }
};

export const getReservationsByBookable = async (req, res, next) => {
  try {
      const reservations = await Reservation.find({
          bookable_id: req.params.id,
      });
      res.status(200).json({
          status: 'success',
          results: reservations.length,
          data: {
              reservations,
          },
      });
  } catch (err) {
      next(err);
  }
};

export const getReservationsByUserAndBookable = async (req, res, next) => {
  try {
      const reservations = await Reservation.find({
          user_id: req.params.userId,
          bookable_id: req.params.bookableId,
      });
      res.status(200).json({
          status: 'success',
          results: reservations.length,
          data: {
              reservations,
          },
      });
  } catch (err) {
      next(err);
  }
};

