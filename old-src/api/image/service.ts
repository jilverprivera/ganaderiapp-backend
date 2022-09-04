import fs from 'fs';
import { v2 } from 'cloudinary';
import dotenv from 'dotenv';
import { File } from '../../types/Image';

dotenv.config();

const { CLOUDINARY_CLOUD_API_KEY, CLOUDINARY_CLOUD_API_SECRET, CLOUDINARY_CLOUD_NAME } = process.env;

v2.config({
  cloud_name: String(CLOUDINARY_CLOUD_NAME),
  api_key: String(CLOUDINARY_CLOUD_API_KEY),
  api_secret: String(CLOUDINARY_CLOUD_API_SECRET),
  secure: true,
});

export const imageController = {
  uploadPersonImage: ({ tempFilePath }: File) => {
    v2.uploader.upload(tempFilePath, { folder: 'ganaderiapp-person' }, (err, result) => {
      if (err) throw err;
      removeTmpFiles(tempFilePath);
      return result;
    });
  },
};

export const removeTmpFiles = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
