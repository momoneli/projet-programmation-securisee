# 🔐 Application d’authentification sécurisée  
**Projet scolaire – ESAIP | Programmation sécurisée**
AGAMAKA MONELI IRA5 & Mandengue NJIME AKWA
---

## 1. Contexte

Projet réalisé dans le cadre du module de **Programmation sécurisée** à l’**ESAIP**.

### Objectifs
- Mettre en place une API d’authentification (inscription, connexion, déconnexion, espace protégé).
- Appliquer les bonnes pratiques de sécurité côté backend (gestion des mots de passe, protections SQLi, XSS, CSRF, sessions).
- Préparer l’intégration avec un frontend React.

---

## 2. Technologies utilisées

### Backend
- Node.js / Express (ES Modules)
- MySQL
- `mysql2/promise`
- `bcrypt`
- `express-session` / `express-mysql-session`
- `express-validator`
- `cors`

### Frontend
- ReactJS (Vite)
- Appels HTTP vers l’API avec gestion du cookie de session

---

## 3. Structure du projet

```text
├── backend/
│   ├── config/
│   │   ├── db.js                   # Connexion MySQL
│   │   └── sessionStore.js         # Store MySQL pour les sessions
│   ├── middlewares/
│   │   └── auth.middleware.js      # Vérification de l’authentification utilisateur
│   ├── routes/
│   │   └── auth.routes.js          # Routes d’authentification
│   ├── sql/
│   ├── .env                        # Variables d’environnement
│   ├── app.js                      # Configuration Express (CORS, sessions, routes)
│   ├── server.js                   # Point d’entrée du serveur
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   └── vite.svg                # Ressources publiques
│   ├── src/
│   │   ├── assets/                 # Assets statiques
│   │   ├── pages/                  # Pages de l’application
│   │   ├── style/                  # Fichiers CSS
│   │   ├── api.js                  # Appels API vers le backend
│   │   ├── App.jsx                 # Composant principal React
│   │   └── main.jsx                # Point d’entrée React
│   ├── index.html                  # Fichier HTML principal
│   ├── vite.config.js              # Configuration Vite
│   ├── package.json
│   └── package-lock.json
```


## ✅ Checklist des livrables – Analyse de sécurité

- **Rapport de tests de sécurité**
  - Tests d’injection SQL
  - Tests XSS
  - Tests CSRF

- **Preuves techniques**
  - Captures d’écran
  - Requêtes réalisées via Postman

- **Recommandations de correction**
  - Analyse des vulnérabilités identifiées
  - Propositions de corrections adaptées

- **Rapport de re-tests**
  - Vérification de la correction des failles après mise à jour
