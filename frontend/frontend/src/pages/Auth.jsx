import { useEffect, useState } from "react";
import { login, register, getMe, health } from "../api";

// Page Auth : login + register + test API
function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [apiStatus, setApiStatus] = useState("…");

  const show = (type, text) => setMessage({ type, text });

  // Vérifie si l'API est joignable au chargement
  useEffect(() => {
    (async () => {
      const r = await health();
      setApiStatus(r.ok ? "OK" : "KO");
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    show("", "");

    const r =
      mode === "login"
        ? await login(email.trim(), password)
        : await register(email.trim(), password);

    if (!r.ok) {
      show("error", r.data?.message || "Erreur serveur");
      return;
    }

    const token = r.data?.token || r.data?.accessToken;
    if (token) localStorage.setItem("auth_token", token);

    show("ok", r.data?.message || "Succès");
  };

  const handleMe = async () => {
    const token = localStorage.getItem("auth_token");
    const r = await getMe(token);

    if (!r.ok) {
      show("error", "Accès refusé");
      return;
    }

    show("ok", JSON.stringify(r.data));
  };

  return (
    <section className="card">
      <h1>Secure Basket</h1>

      <div className="tabs">
        <button
          className={mode === "login" ? "tab active" : "tab"}
          onClick={() => setMode("login")}
        >
          Connexion
        </button>
        <button
          className={mode === "register" ? "tab active" : "tab"}
          onClick={() => setMode("register")}
        >
          Inscription
        </button>
      </div>

      <p className="api-status">API : {apiStatus}</p>

      {message.text && (
        <div className={`notice ${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit} className="form">
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

        <button type="submit">
          {mode === "login" ? "Se connecter" : "Créer un compte"}
        </button>
      </form>

      <button className="btn ghost" onClick={handleMe}>
        Tester /me
      </button>
    </section>
  );
}

export default Auth;
