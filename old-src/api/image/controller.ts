import { Request, Response } from 'express';
import { File, ImageType } from '../../types/Image';
import { removeTmpFiles } from './service';

export const imageController = {
  uploadPersonImage: async (req: Request, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ statusCode: 'Bad Request', message: 'No user image selected.' });
    }
    try {
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
    } catch (err) {
      throw err;
    }
  },
};
