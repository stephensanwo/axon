/// <reference types="vitest" />
/// <reference types="vite/client" />
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import MillionLint from "@million/lint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 4514,
    host: "0.0.0.0",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "test/setup.ts",
    css: true,
  },
  define: {
    global: {
      // https://vitejs.dev/config/env-and-mode.html#env-variables
      __DEV__: true,
    },
  },
  worker: {
    format: "es",
  },
});
