// Charger .env avant d'utiliser process.env
import 'dotenv/config';

import mysql from 'mysql2/promise';

const poolConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 8889,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Pool Promises (routes + express-mysql-session utilisent l’API promise)
export const db = mysql.createPool(poolConfig);
