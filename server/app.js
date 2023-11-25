
import express from 'express';
import cors from 'cors';
import bookableRoutes from './controllers/bookingController.js';
import reservationRoutes from './controllers/reservationController.js';
import userRoutes from './controllers/userController.js';
import likedBookingRoutes from './controllers/likedBookingControllers.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/bookables', bookableRoutes);
app.use('/api/reservations',reservationRoutes );
app.use('/api/users', userRoutes );
app.use('/api/likedBookables', likedBookingRoutes);

export default app;



