import { Request, Response } from 'express';
import pool from '../db';
import { Sale } from '../types/Sale';

export const saleController = {
  getSales: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Bad Request. user id is necessary.' });
    }
    return pool.query('SELECT * FROM sale WHERE id = ?', [id], (err: any, sales: Sale[]) => {
      if (err) throw err;
      return res.status(200).json(sales);
    });
  },

  create_sale: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { concept } = req.body;
    if (!id) {
      return res.status(400).json({ message: 'Bad Request. user id is necessary to create a sale.' });
    }
    if (!concept) {
      return res.status(400).json({ message: 'Bad Request. concept is necessary to create a sale.' });
    }

    const newSale = { concept, created_by: id };
    return pool.query('INSERT INTO sale SET ?', [newSale], (err) => {
      if (err) throw err;
      return res.status(201).json({ message: 'Created. Sale created successfully.', sale: newSale });
    });

    // updateSale = async();
  },
};
