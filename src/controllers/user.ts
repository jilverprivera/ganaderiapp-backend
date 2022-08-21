import { Request, Response } from 'express';

import sqlConnection from '../db';

import { User } from '../types/User';

export const userController = {
  getUsers: async (_req: Request, res: Response) => {
    sqlConnection.query('SELECT * FROM user;', (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      return res.status(200).json(response);
    });
  },

  getUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    sqlConnection.query('SELECT * FROM user WHERE id = ?;', [id], (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      return res.status(200).json(response);
    });
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
    sqlConnection.query(query, [id, name, email], (err) => {
      if (err) {
        console.error(err);
        return;
      }
      return res.status(201).json({ message: 'User Updated Successfully.' });
    });
  },

  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    sqlConnection.query('DELETE FROM user WHERE id = ?', [id], (err) => {
      if (err) {
        console.error(err);
        return;
      }
      return res.status(201).json({ message: 'User Deleted Successfully.' });
    });
  },
};
