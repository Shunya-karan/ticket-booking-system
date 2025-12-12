import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://busbuddy-backend-687e.onrender.com",
        changeOrigin: true,
        secure: false
      }
    }
  }
});

