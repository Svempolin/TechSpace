import express from 'express';
import {
    getAllReservations,
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservationsByUser,
   
} from '../models/reservationModel.js';
import authenticateToken from '../middleware/authMiddleware.js';

const reservationRoutes = express.Router();

// reservationRoutes.use(authenticateToken);

reservationRoutes.get('/all', getAllReservations);
reservationRoutes.get('/:id', getReservation);
reservationRoutes.get('/user/:id', getReservationsByUser);
reservationRoutes.post('/', createReservation);
reservationRoutes.patch('/:id', updateReservation);
reservationRoutes.delete('/:id', deleteReservation);

export default reservationRoutes;

