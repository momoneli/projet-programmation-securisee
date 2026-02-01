import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuration de Vite pour le projet React
export default defineConfig({
  // Plugin nécessaire pour utiliser React (JSX, hot reload, etc.)
  plugins: [react()],

  server: {
    // Proxy pour relier le front React au backend Express
    proxy: {
      // Toutes les requêtes qui commencent par /api
      // seront automatiquement envoyées vers le backend
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
