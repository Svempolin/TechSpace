import User from '../schemas/usersScheman.js';
import bcrypt from 'bcryptjs';
import jwtSecret from '../config.js';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
        expiresIn: '1h',
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  };
  

  export const login = async (req, res, next) => {

    try {
      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
      
      }

      // Check if user exists in the database
      const user = await User.findOne({ email }).select('+password');
  
      if (!user) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('isPasswordValid:', isPasswordValid);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }
  
      // If the user exists and the password is correct, proceed with generating the token
      const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, { expiresIn: '1h' });
  
      res.status(200).json({
        status: 'success',
        data: {
          user,
          token,
        },
      });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

export const getUser = async (req, res, next) => {
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId);
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};
