import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import sqlConnection from '../db';

import { User } from '../types/User';

export const authController = {
  sign_in: async (req: Request, res: Response) => {
    const { email, password }: User = req.body;
    try {
      sqlConnection.query('SELECT * FROM user WHERE email = ?', [email], async (err: any, user: User[]) => {
        if (err) {
          console.error(err);
          return;
        }
        if (user.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        const currentUser = user[0];
        const passwordMatch = await bcrypt.compare(password, currentUser.password);
        if (!passwordMatch) {
          return res.status(400).json({ message: 'Bad Request. Email or Password are wrong.' });
        }
        return res.status(200).json(currentUser);
      });
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
      const newUser = { name: name, email: email, password: passwordEncrypted };
      sqlConnection.query('INSERT INTO user SET ?', [newUser], (err) => {
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
