import bcryt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config()
import User from '../models/usersModels.js';

const secretKey = process.env.SECRET_KEY 

exports.generateToken = (User) => {
  return jwt.sign({ _id: User._id }, secretKey, { expiresIn: "30d" });
}

exports.verifyToken = (reg, res, next) => {
  try{
      const token = req.headers.authorization.split('')[1]
      // det jag får till baka är ett id
      // req.userData = jwt.verify(token, secretKey);
      req.userId = jwd.verify(token, secretKey)._id
      next()
  } catch{
      res.status(401).json({
          message: " you need to login first "
      })
  }
} 


export const register = async (req, res) => {
try {
 const {
  firstNamn,
  lastNamn,
  email,
  password, 
  picture
}  = req.body;

 const salt = await bcryt.genSalt(10);
 const hashedPassword = await bcryt.hash(password, salt);

 const newUser = new User({
  firstNamn,
  lastNamn,
  email,
  password:hashedPassword,
  picture
});
const savedUser = await newUser.save();
res.status(201).json(savedUser);
} catch (error) {

res.status(500).json({error:error.message});

}
}