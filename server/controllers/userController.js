import express from 'express';
import { signup, login, getUser   } from '../models/userModel.js';
import authenticateToken from '../middleware/authMiddleware.js';



const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/user',authenticateToken, getUser );

export default router;

