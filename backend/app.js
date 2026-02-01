// Dépendances principales
import express from 'express'; // Framework API
import session from 'express-session'; // Gestion des sessions côté serveur
import dotenv from 'dotenv'; // Variables d’environnement
import cors from 'cors'; // Contrôle des accès frontend → backend
import sessionStore from './config/sessionStore.js';

// Routes d’authentification
import authRoutes from './routes/auth.routes.js';

// Chargement des variables .env
dotenv.config();

// Initialisation de l’application Express
const app = express();

// Permet de lire les requêtes JSON (req.body)
app.use(express.json());

// Autorise uniquement le frontend React local à appeler l’API
// Les cookies sont nécessaires pour les sessions
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Sessions stockées côté serveur (MySQL)
app.use(session({
name: 'secure_session',
secret: process.envss.SESSION_SECRET,
resave: false,
saveUninitialized: false,
store: sessionStore,
cookie: {
  httpOnly: true,
  secure: false,       // true en HTTPS (prod)
  sameSite: 'lax',
  maxAge: 30 * 60 * 1000 // 30 min
}

}));

// Routes liées à l’authentification
app.use('/api/auth', authRoutes);

export default app;