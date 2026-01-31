// Création du routeur Express pour gérer les routes d'authentification
import express from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { db } from '../config/db.js';

const router = express.Router();


// POST /api/auth/register
router.post('/register',
  // Validation minimale des champs email et password
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    // Vérifie les erreurs de validation et renvoie au frontend si besoin
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Hashage sécurisé du mot de passe avec bcrypt
      const hashedPassword = await bcrypt.hash(password, 12);

      // Insertion dans la base de données avec requête préparée
      await db.execute(
        'INSERT INTO users (email, password_hash) VALUES (?, ?)',
        [email, hashedPassword]
      );

      // Réponse de succès au frontend
      res.status(201).json({ message: 'Utilisateur créé' });
    } catch (err) {
      // Log serveur et réponse générique pour ne pas révéler d’infos sensibles
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
);
    

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur dans la base de données
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    // Si utilisateur non trouvé, renvoie erreur générique
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const user = rows[0];

    // Comparaison du mot de passe fourni avec le hash en base
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Création de la session côté serveur pour garder l'utilisateur connecté
    req.session.user = {
      id: user.id,
      role: user.role
    };

    // Réponse de succès au frontend
    res.json({ message: 'Connexion réussie' });
  } catch (err) {
    // Log serveur et réponse générique
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
