import express, { Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import dotenv from 'dotenv';

import authRoute from './routes/auth';
import userRoute from './routes/user';
import animalRoute from './routes/animal';
import categoryRoute from './routes/category';

dotenv.config();

const app = express();
const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get('/', (_req, res: Response) => {
  return res.status(200).send('Backend for GanaderiApp using Express and MySQL Database.');
});

app.use('/auth', authRoute);
app.use('/api', userRoute);
app.use('/api', animalRoute);
app.use('/api', categoryRoute);

export default app;
