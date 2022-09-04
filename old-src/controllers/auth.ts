import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import pool from '../db';

import { User } from '../types/User';

dotenv.config();

const { JWT_ACCESS_TOKEN_SECRET_SEED, JWT_EXPIRE_TIME } = process.env;
export const authController = {
  sign_in: async (req: Request, res: Response) => {
    const { email, password }: User = req.body;
    if (email === undefined || password === undefined) {
      return res.status(400).json({ message: 'Bad Request. Please fill all the fields.' });
    }
    try {
      pool.query('SELECT * FROM person WHERE email = ?', [email], async (err, { rows }) => {
        if (err) throw new Error(err.message);
        if (rows.length === 0) {
          return res.status(404).json({ message: 'Not found. User is not at the database.' });
        }
        const currentUser = rows[0];
        const passwordMatch = await bcrypt.compare(password, currentUser.password);
        if (!passwordMatch) {
          return res.status(400).json({ message: 'Bad Request. Email or Password are wrong.' });
        }
        const id = currentUser.id;
        const token = jwt.sign({ id }, String(JWT_ACCESS_TOKEN_SECRET_SEED), { expiresIn: JWT_EXPIRE_TIME });

        return res.status(200).json({ token, user: currentUser });
      });
      return;
    } catch (err) {
      throw err;
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const { email, name, password }: User = req.body;
      if (email === undefined || name === undefined || password === undefined) {
        return res.status(400).json({ message: 'Bad Request. Please fill all the fields' });
      }
      const passwordEncrypted = await bcrypt.hash(password, 10);
      const newUser = { name: name, email: email, password: passwordEncrypted, role: 0 };
      pool.query('INSERT INTO person(name) SET', [newUser], (err: any) => {
        if (err) {
          throw err;
        }
        return res.status(201).json({ message: 'User Created Successfully.', user: newUser });
      });
      return;
    } catch (err) {
      throw err;
    }
  },
};
