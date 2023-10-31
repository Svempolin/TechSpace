import express from 'express';


const app = express();
import cors from 'cors';
import helmet from 'helmet';
import userController from "./controllers/userController.js";

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));


app.use('/api/users', userController);


export default app;