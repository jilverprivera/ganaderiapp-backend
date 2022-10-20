import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { ACCESS_TOKEN_SECRET_SEED, JWT_EXPIRE_TIME } = process.env;

export const generateJWT = (id: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, String(ACCESS_TOKEN_SECRET_SEED), { expiresIn: JWT_EXPIRE_TIME }, (err, token) => {
      if (err) {
        reject('The token could not be created correctly');
      } else {
        resolve(token);
      }
    });
  });
};
