import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@/*": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 3000,
    host: true,
    strictPort: true,
    cors: true,
    hmr: {
      overlay: true,
    },
  },

  preview: {
    port: 3000,
    host: true,
    strictPort: true,
    cors: true,
  },

  /* build: {
    outDir: "dist",
    sourcemap: false,
    minify: "oxc",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            )
              return "vendor";
            if (id.includes("@mui") || id.includes("@emotion")) return "mui";
            if (id.includes("@tanstack/react-query")) return "query";
            if (id.includes("zustand") || id.includes("immer")) return "state";
          }
        },
      },
    },
  }, */
});
