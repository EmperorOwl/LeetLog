import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// https://vite.dev/config/#using-environment-variables-in-config
// https://vite.dev/guide/env-and-mode.html
// https://vite.dev/config/server-options
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    base: "/leetlog/",
    preview: {
      port: 3000,
    },
    server: {
      host: true,
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL + ":8080",
          changeOrigin: true,
        },
      },
      watch: {
        usePolling: true,
      },
    },
  };
});
