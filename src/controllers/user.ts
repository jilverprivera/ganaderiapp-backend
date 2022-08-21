import { Request, Response } from 'express';
import dotenv from 'dotenv';

import pool from '../db';

import { User } from '../types/User';

dotenv.config();

export const userController = {
  getUsers: async (_req: Request, res: Response) => {
    pool.query('SELECT * FROM user WHERE role = 0;', (err: any, response: User[]) => {
      if (err) {
        console.error(err);
        return;
      }
      return res.status(200).json(response);
    });
    return;
  },

  getUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    pool.query('SELECT * FROM user WHERE id = ?;', [id], (err: any, user: User) => {
      if (err) {
        throw err;
      }
      return res.status(200).json(user);
    });
    return;
  },

  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, name }: User = req.body;
    const query = `
                  SET @id = ?;
                  SET @name = ?;
                  SET @email = ?;
                  CALL AddUser(@name, @email);
                  `;
    pool.query(query, [id, name, email], (err) => {
      if (err) {
        console.error(err);
        return;
      }
      return res.status(201).json({ message: 'User Updated Successfully.' });
    });
  },

  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    pool.query('DELETE FROM user WHERE id = ?', [id], (err) => {
      if (err) {
        console.error(err);
        return;
      }
      return res.status(201).json({ message: 'User Deleted Successfully.' });
    });
  },
};
