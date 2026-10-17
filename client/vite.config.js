import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Development me /api ki requests server (port 5000) ko bhej deta hai
export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/api": "http://localhost:5000" } },
});