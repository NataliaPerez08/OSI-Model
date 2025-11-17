import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Cambia esto si tu repo NO se llama 'osi-osi-animation'
  base: "/osi-osi-animation/",
});
