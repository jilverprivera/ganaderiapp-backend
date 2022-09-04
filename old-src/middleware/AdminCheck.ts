import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pool from '../db';

dotenv.config({ path: __dirname + '/.env' });

const { JWT_ACCESS_TOKEN_SECRET_SEED } = process.env;

export const AdminCheck = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(404).json({ message: 'Not Found. Token is required' });
  }

  const { id }: any = jwt.verify(token, String(JWT_ACCESS_TOKEN_SECRET_SEED));
  pool.query('SELECT * FROM person;', (err, { rows }) => {
    if (err) throw new Error(err.message);
    console.log(rows);
  });
  // console.log(tokenCheck);
  if (id !== 1) {
    return res.status(403).json({ message: 'Unauthorized. Admin permissions is required.' });
  }

  return next();
};
