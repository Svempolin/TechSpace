
import jwt from 'jsonwebtoken';
import jwtSecret from '../config.js';

const authenticateToken = (req, res, next) => {
  // Extract the token from the request header
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).send('Access denied. No token provided.');

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.log("Token verify error", err);
      return res.status(403).send('Invalid token.');
    }

    // Attach the user info to the request for further use
    req.user = user;
    next();
  });
};

export default authenticateToken;






