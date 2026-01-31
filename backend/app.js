import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import MySQLStore from 'express-mysql-session';

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const sessionStore = new MySQLStore({}, db);

app.use(session({
  name: 'secure_session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    sameSite: 'strict'
  }
}));

export default app;
