import { v2 } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { File, ImageType } from '../types/Image';

dotenv.config();

const { CLOUDINARY_CLOUD_API_KEY, CLOUDINARY_CLOUD_API_SECRET, CLOUDINARY_CLOUD_NAME } = process.env;

v2.config({
  cloud_name: String(CLOUDINARY_CLOUD_NAME),
  api_key: String(CLOUDINARY_CLOUD_API_KEY),
  api_secret: String(CLOUDINARY_CLOUD_API_SECRET),
  secure: true,
});

export const imageController = {
  uploadPersonImage: async (req: Request, res: Response) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ statusCode: 'Bad Request', message: 'No user image selected.' });
      }
      const { file }: any = req.files;
      const { tempFilePath, size, mimetype }: File = file;
      if (size > 1024 * 1024) {
        removeTmpFiles(tempFilePath);
        return res.status(400).json({ message: 'Bad Request. Image size is too large.' });
      }
      if (
        mimetype !== ImageType.JPEG &&
        mimetype !== ImageType.JPG &&
        mimetype !== ImageType.PNG &&
        mimetype !== ImageType.WEBP
      ) {
        removeTmpFiles(tempFilePath);
        return res.status(400).json({ message: 'Bad Request. Incorrect image format' });
      }
      return v2.uploader.upload(tempFilePath, { folder: 'ganaderiapp-person' }, (err, result) => {
        if (err) throw err;
        removeTmpFiles(tempFilePath);
        res.status(200).json({
          result,
        });
      });
    } catch (err) {
      throw err;
      return;
    }
  },

  uploadAnimalImage: async (req: Request, res: Response) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'Bad Request. No image selected.' });
      }
      const { file }: any = req.files;
      const { tempFilePath, size, mimetype }: File = file;

      if (size > 1024 * 1024) {
        removeTmpFiles(tempFilePath);
        return res.status(400).json({ message: 'Bad Request. Image size is too large.' });
      }
      if (
        mimetype !== ImageType.JPEG &&
        mimetype !== ImageType.JPG &&
        mimetype !== ImageType.PNG &&
        mimetype !== ImageType.WEBP
      ) {
        removeTmpFiles(tempFilePath);
        return res.status(400).json({ message: 'Bad Request. Incorrect image format' });
      }
      return v2.uploader.upload(tempFilePath, { folder: 'ganaderiapp-animals' }, (err, result) => {
        if (err) throw err;
        removeTmpFiles(tempFilePath);
        res.status(200).json({
          result,
        });
      });
    } catch (err) {
      throw err;
    }
  },
};

const removeTmpFiles = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
