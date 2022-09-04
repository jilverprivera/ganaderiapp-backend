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
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.connect((err) => {
  if (err) throw new Error(err.message);
  console.log('Database: Connected.');
});

export default pool;
