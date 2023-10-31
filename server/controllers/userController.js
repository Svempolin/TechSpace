import express from 'express';
import { addUser } from '../models/usersModels.js';
; // Adjust the path as necessary


const router = express.Router();

router.post('/addUser', addUser);

export default router;

