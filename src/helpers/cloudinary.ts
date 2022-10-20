import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const { CLOUDINARY_CLOUD_API_KEY, CLOUDINARY_CLOUD_API_SECRET, CLOUDINARY_CLOUD_NAME } = process.env;

export const cloudinaryConfig = {
  cloud_name: String(CLOUDINARY_CLOUD_NAME),
  api_key: String(CLOUDINARY_CLOUD_API_KEY),
  api_secret: String(CLOUDINARY_CLOUD_API_SECRET),
  secure: true,
};

export const removeTmpFiles = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
