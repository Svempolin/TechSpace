
import crypto from 'crypto';

const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const jwtSecret = generateJWTSecret();

export default jwtSecret;

