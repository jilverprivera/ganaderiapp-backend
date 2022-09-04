import { Request, Response } from 'express';
import dotenv from 'dotenv';

import pool from '../db';

import { User } from '../types/User';

dotenv.config();

export const userController = {
  getUsers: async (_req: Request, res: Response) => {
    return pool.query('SELECT * FROM person;', (err: any, result) => {
      const { rows } = result;
      console.log(rows);
      if (err) throw err;
      if (rows.length === 0) {
        return res.status(200).json({ message: 'Not Content. User table does not have any values yet.', users: [] });
      }
      return res.status(200).json(rows);
    });
  },

  getClients: async (_req: Request, res: Response) => {
    return pool.query('SELECT * FROM person WHERE role = 0;', (err: any, { rows }) => {
      if (err) throw err;
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Not Content. User table does not have any clients yet.' });
      }
      return res.status(200).json(rows);
    });
  },

  getSingleUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Bad Request. user ID is required' });
    }
    return pool.query('SELECT * FROM person WHERE id = ?;', [id], (err: any, { rows }) => {
      if (err) throw err;
      if (rows.length === 0) {
        return res.status(400).json({ message: 'User' });
      }
      return res.status(200).json(rows[0]);
    });
  },

  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Bad Request. user ID is required' });
    }
    const { email, name }: User = req.body;
    const query = `
                  SET @id = ?;
                  SET @name = ?;
                  SET @email = ?;
                  CALL AddUser(@name, @email);
                  `;
    return pool.query(query, [id, name, email], (err) => {
      if (err) throw err;
      return res.status(201).json({ message: 'User Updated Successfully.' });
    });
  },

  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Bad Request. user ID is required' });
    }
    return pool.query('DELETE FROM person WHERE id = ?', [id], (err) => {
      if (err) throw err;
      return res.status(201).json({ message: 'User Deleted Successfully.' });
    });
  },

  updatePersonImage: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { image_url, image_public_id }: User = req.body;
    if (!image_public_id || !image_url) {
      return res
        .status(400)
        .json({ statusCode: 'Bad Request.', message: 'No image url and image id found in the request.' });
    }
    return pool.query(
      'UPDATE person SET(image_url = $1, image_public_id = $2) WHERE id = $3',
      [image_url, image_public_id, id],
      (err) => {
        if (err) throw new Error(err.message);
        return res.status(200).json({ statusCode: 'OK', message: `Image has been updated on person with ID ${id}` });
      }
    );
  },
};
