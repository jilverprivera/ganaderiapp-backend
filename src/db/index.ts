import { createPool } from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

import { databaseKeys } from './keys';

const { NODE_ENV } = process.env;

const pool = createPool(databaseKeys);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) {
    if (NODE_ENV === 'development') {
      console.log('Database: Connected');
    }
    connection.release();
  }
  return;
});

export default pool;
