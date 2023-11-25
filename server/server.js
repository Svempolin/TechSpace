import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();




const PORT = process.env.PORT || 6001;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful!"))
  .catch(err => {
    console.log(err.message);
  });
