// Charger .env avant d'utiliser process.env
import 'dotenv/config';
import MySQLStore from 'express-mysql-session';
import { db } from './db.js';

// Configuration du store de sessions MySQL
const sessionStore = new MySQLStore({
    // Utiliser la même configuration que db.js
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 8889,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Table pour stocker les sessions (créée automatiquement si elle n'existe pas)
    schema: {
        tableName: 'sessions'
    }
}, db);

export default sessionStore;
