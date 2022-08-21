import express, { Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import dotenv from 'dotenv';

import userRoute from './routes/user';
import authRoute from './routes/auth';

dotenv.config();

const app = express();

app.use(morgan('dev'));
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

app.use('/api', userRoute);
app.use('/auth', authRoute);

export default app;
