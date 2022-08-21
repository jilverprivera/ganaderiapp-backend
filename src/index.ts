import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const { PORT, NODE_ENV } = process.env;
const APP_PORT = PORT || 5000;

app.listen(APP_PORT, () => {
  if (NODE_ENV === 'development') {
    console.log(`Port: ${APP_PORT}`);
  }
});
