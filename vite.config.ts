import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    base: "/",
    plugins: [react()],
    publicDir: "public",
    server: {
      host: true,
      port: 5173,
      open: false,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      modules: {
        // Делает имена классов в DOM удобными для чтения при разработке (напр. Home_container__H3aK1)
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:color";`,
        },
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      target: "es2022",
    },
  };
});
