import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuration de Vite pour le projet React
export default defineConfig({
  plugins: [react()],

  server: {
    // Proxy pour relier le front React au backend Express
    proxy: {
      "/api": {
        target: "http://localhost:4000", // 👈 BON PORT
        changeOrigin: true,
      },
    },
  },
});
