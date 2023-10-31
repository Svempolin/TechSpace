import bcrypt from 'bcrypt';
import { generateToken } from './auth.js';
import User from "../schemas/userSchema.js"



export const addUser = async (req, res) => {
  const { firstNamn, lastNamn, email, password } = req.body;
  if (!firstNamn || !lastNamn || !email || !password) {
    return res.status(400).json({ 
      message: 'Please fill all the fields' 
    });
  }

  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with the same email already exists' 
      });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      firstNamn,
      lastNamn,
      email,
      password: passwordHash,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ 
      message: 'Please fill all the fields' 
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'The user is not found' 
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(400).json({ 
        message: 'The email or password is incorrect' 
      });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
