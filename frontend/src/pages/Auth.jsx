import { useEffect, useState } from "react";
import { login, register, getMe } from "../api";  
import "../style/Auth.css";

// Page Auth : login + register + test API
function Auth() {
  // Mode actuel : "login" ou "register"
  const [mode, setMode] = useState("login");

  // Champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Message de retour utilisateur (succès ou erreur)
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fonction utilitaire pour afficher un message
  const show = (type, text) => setMessage({ type, text });

  // Soumission du formulaire (connexion ou inscription)
  const handleSubmit = async (e) => {
    e.preventDefault();
    show("", "");

    // Appel API selon le mode sélectionné
    const r =
      mode === "login"
        ? await login(email.trim(), password)
        : await register(email.trim(), password);

    // Gestion des erreurs serveur ou validation    
    if (!r.ok) {
      show("error", r.data?.message || "Erreur serveur");
      return;
    }

    // Récupération du token retourné par l’API (si utilisé)
    const token = r.data?.token || r.data?.accessToken;

    // Stockage du token côté client
    if (token) localStorage.setItem("auth_token", token);

    show("ok", r.data?.message || "Succès");
  };

  // Test de la route protégée /me
  const handleMe = async () => {
    // Récupération du token stocké
    const token = localStorage.getItem("auth_token");

    // Appel API pour récupérer les informations utilisateur
    const r = await getMe(token);

    if (!r.ok) {
      show("error", "Accès refusé");
      return;
    }

    // Affichage des données utilisateur retournées par l’API
    show("ok", JSON.stringify(r.data));
  };

  return (
    <section className="auth">
      <h1>Application d'authentification sécurisée</h1>

      {/* Onglets de sélection du mode */}
      <div className="auth-tabs">
        <button
          className={mode === "login" ? "active" : ""}
          onClick={() => setMode("login")}
        >
          Connexion
        </button>
        <button
          className={mode === "register" ? "active" : ""}
          onClick={() => setMode("register")}
        >
          Inscription
        </button>
      </div>

      
      {/* Message de retour utilisateur */}
      {message.text && (
        <div className={`auth-message ${message.type}`}>{message.text}</div>
      )}

      {/* Formulaire d’authentification */}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">
          {mode === "login" ? "Se connecter" : "Créer un compte"}
        </button>
      </form>
      
      {/* Bouton de test d’une route protégée */}
      <button type="button" className="auth-btn secondary" onClick={handleMe}>
        Tester /me
      </button>
    </section>
  );
}

export default Auth;
