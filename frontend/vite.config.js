import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Psycortex Online Education",
        short_name: "Psycortex Online Education",
        description:
          "Online Psycortex Education empowers individuals globally with meticulously curated mental health, well-being, and psychology courses. Founded to make the best education accessible to all, our platform offers personalized learning experiences to foster growth and resilience.",
        theme_color: "white",
        icons: [
          {
            src: "assets/logo/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/logo/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "assets/logo/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "assets/logo/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "assets/logo/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "assets/logo/favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin === self.location.origin &&
              url.pathname.startsWith("/assets/"),
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
