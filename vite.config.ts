import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/github-repos-explorer/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});