import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Exam-1/",  // ← critical for GitHub Pages
  plugins: [react()],
});