import express, { Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import dotenv from 'dotenv';

import authRoute from './routes/auth';
import userRoute from './routes/user';
import animalRoute from './routes/animal';
import categoryRoute from './routes/category';

import { swaggerOptions } from './swaggerOptions';

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
  return res.status(200).redirect('/api-doc');
});

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

app.use('/auth', authRoute);
app.use('/api', userRoute);
app.use('/api', animalRoute);
app.use('/api', categoryRoute);

export default app;
