import app from './app.js';

// Démarrage du serveur HTTP sur le port 4000
app.listen(4000, () => {
  console.log('Backend lancé sur http://localhost:4000');
});
