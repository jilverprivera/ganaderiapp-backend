import { Request, Response } from 'express';

import pool from '../db';

import { Category } from '../types/Category';

export const categoryController = {
  getCategories: async (_req: Request, res: Response) => {
    pool.query('SELECT * FROM category;', (err: any, categories: Category[]) => {
      if (err) throw err;
      return res.status(200).json(categories);
    });
  },

  getSingleCategory: async (req: Request, res: Response) => {
    const { id } = req.params;
    pool.query('SELECT * FROM category WHERE id = ?;', [id], (err: any, category: Category) => {
      if (err) throw err;
      return res.status(200).json(category);
    });
  },

  createCategory: async (req: Request, res: Response) => {
    const { name } = req.body;
    pool.query('INSERT INTO category SET ?;', [{ name }], (err: any) => {
      if (err) throw err;
      return res.status(201).json({ message: 'Created. Category Created Succesfully.', category: req.body });
    });
  },

  updateCategory: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { category } = req.body;
    pool.query('UPDATE category INTO category SET ? WHERE id = ?;', [category, id], (err: any, response: Category) => {
      if (err) throw err;
      return res.status(201).json({ message: 'Created. Category Updated Succesfully.', response });
    });
  },
};
