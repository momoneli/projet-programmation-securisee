// Base API : grâce au proxy Vite, /api pointe vers le backend
const API = "/api";

// Fonction générique pour appeler l'API
async function apiFetch(path, options = {}) {
  const res = await fetch(API + path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // utile si sessions/cookies
    ...options,
  });

  const data = await res.json().catch(() => null);

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
}

// --- Routes auth ---

export const login = (email, password) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const register = (email, password) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const getMe = (token) =>
  apiFetch("/auth/me", {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

