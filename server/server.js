import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express'; // Använd import här

dotenv.config();

import  UserRoutes from "./routes/userRoutes.js";
import  VenuesRoutes from "./routes/VenuesRoutes.js";

const expressApp = express();
const PORT = process.env.PORT || 6001;

expressApp.use('/users', UserRoutes);
expressApp.use('/venues', VenuesRoutes);

expressApp.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful!"))
  .catch(err => {
    console.log(err.message);
  });
