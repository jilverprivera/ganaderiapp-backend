import { Request, Response } from 'express';
import pool from '../db';
import { Animal } from '../types/Animal';

export const animalController = {
  getAllAnimals: async (_req: Request, res: Response) => {
    pool.query('SELECT * FROM animal', (err: any, animals: Animal[]) => {
      if (err) throw err;
      return res.status(200).json(animals);
    });
  },

  getAnimals: async (req: Request, res: Response) => {
    const { id } = req.params;
    pool.query('SELECT * FROM animal WHERE created_by = ?', [id], (err: any, animals: Animal[]) => {
      if (err) throw err;
      return res.status(200).json(animals);
    });
  },

  getAnimalsByCategory: async (req: Request, res: Response) => {
    const { id, category_id } = req.params;
    pool.query(
      'SELECT * FROM animal WHERE category_id = ? AND created_by = ? ',
      [category_id, id],
      (err: any, animals: Animal[]) => {
        if (err) throw err;
        return res.status(200).json(animals);
      }
    );
  },

  getSingleAnimal: async (req: Request, res: Response) => {
    const { id } = req.params;

    pool.query('SELECT * FROM animal WHERE id = ? and created_by = ?', [id], (err, animals: Animal[]) => {
      if (err) throw err;
      return res.status(200).json(animals);
    });
  },

  createAnimal: async (req: Request, res: Response) => {
    const { id } = req.body;
    const { category_id, name, serial, image_public_id, image_url, purchased, born, sold }: Animal = req.body;

    const newAnimal = {
      name: name ? name : '',
      serial: serial ? serial : '',
      image_public_id: image_public_id ? image_public_id : '',
      image_url: image_url ? image_url : '',
      category_id: category_id,
      purchased,
      born,
      sold,
      created_by: id,
      created_at: new Date(Date.now()),
    };
    return pool.query('INSERT INTO animal SET ? ', [newAnimal], (err: any) => {
      if (err) throw err;
      return res.status(201).json({ message: 'Created. Animal Created Successfully.', animal: newAnimal });
    });
  },
};
