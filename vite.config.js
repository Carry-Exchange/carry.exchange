import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    {
      name: "serve-public-static",
      enforce: "pre",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split("?")[0];
          const staticFiles = ["/llms.txt", "/robots.txt", "/sitemap.xml"];
          if (staticFiles.includes(url)) {
            const filePath = path.join(process.cwd(), "public", url);
            if (fs.existsSync(filePath)) {
              const contentType = url.endsWith(".xml") ? "application/xml" : "text/plain";
              res.setHeader("Content-Type", contentType);
              res.end(fs.readFileSync(filePath, "utf-8"));
              return;
            }
          }
          next();
        });
      },
    },
    react(),
    createHtmlPlugin({ minify: true }),
  ],
  server: {
    allowedHosts: ["carry.exchange", "localhost", "127.0.0.1"],
  },
  build: {
    minify: "esbuild",
    target: "es2015",
    cssMinify: true,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom")) return "vendor-react-dom";
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-router")) return "vendor-router";
          if (id.includes("node_modules/react-helmet-async")) return "vendor-helmet";
          if (id.includes("node_modules/react-icons")) return "vendor-icons";
        },
      },
    },
  },
});
