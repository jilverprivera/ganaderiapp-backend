import { createConnection } from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, NODE_ENV } = process.env;

const sqlConnection = createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  insecureAuth: true,
  multipleStatements: true,
});

sqlConnection.connect((err) => {
  if (err) {
    sqlConnection.end();
    throw err;
  }
  if (NODE_ENV === 'development') {
    console.log('Database: Connected');
  }
});

export default sqlConnection;
