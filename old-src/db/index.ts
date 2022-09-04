import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const { LOCAL_PG_HOST, LOCAL_PG_PORT, LOCAL_PG_USER, LOCAL_PG_PASSWORD, LOCAL_PG_DATABASE } = process.env;

const pool = new Pool({
  host: LOCAL_PG_HOST,
  port: Number(LOCAL_PG_PORT),
  user: LOCAL_PG_USER,
  password: LOCAL_PG_PASSWORD,
  database: LOCAL_PG_DATABASE,
});

pool.connect((err) => {
  if (err) throw new Error(err.message);
  console.log('Database: Connected.');
});

// pool.getConnection((err, connection) => {
//   if (err) {
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       console.error('Database connection was closed.');
//     }
//     if (err.code === 'ER_CON_COUNT_ERROR') {
//       console.error('Database has too many connections.');
//     }
//     if (err.code === 'ECONNREFUSED') {
//       console.error('Database connection was refused.');
//     }
//   }
//   if (connection) {
//     if (NODE_ENV === 'development') {
//       console.log('Database: Connected');
//     }
//     connection.release();
//   }
//   return;
// });

export default pool;
