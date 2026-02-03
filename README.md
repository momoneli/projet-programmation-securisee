```markdown
# Application d’authentification sécurisée  
Projet ESAIP – Programmation sécurisée

## 1. Contexte

Projet réalisé dans le cadre du module de **Programmation sécurisée** à l’**ESAIP**.

Objectifs :

- Mettre en place une API d’authentification (inscription, connexion, déconnexion, espace protégé).
- Appliquer des bonnes pratiques de sécurité côté backend (mots de passe, SQLi, sessions, rôles).
- Préparer l’intégration avec un futur frontend React.

---

## 2. Technologies

**Backend**

- Node.js, Express (ES Modules)
- MySQL
- `mysql2/promise`
- `bcrypt`
- `express-session`, `express-mysql-session`
- `express-validator`
- `cors`

**Frontend (prévu)**

- HTML/CSS
- Appels HTTP vers l’API, avec gestion du cookie de session.

---

## 3. Structure du projet (backend)

```text
backend/
  app.js               # App Express (CORS, sessions, routes)
  server.js            # Point d’entrée serveur
  package.json
  .env                 # Variables d’environnement

  config/
    db.js              # Connexion MySQL
    sessionStore.js    # Store MySQL pour les sessions

  routes/
    auth.routes.js     # Routes d’authentification

  middlewares/
    auth.middleware.js # requireAuth, requireRole
```



    * checklist livrable (4) : Rapport de tests sécurité : test injection sql, xss, crsf ; Preuves techniques (captures, requêtes) : Postman; Recommandations de correction ;  Rapport de re-tests

    *

```

