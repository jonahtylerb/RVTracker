import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import AstroPWA from "@vite-pwa/astro";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    UnoCSS(),
    AstroPWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{ts,tsx,astro,ico,png,svg,jpg,jpeg,gif,webp}"],
      },
      manifest: {
        name: "RVTracker",
        short_name: "RVTracker",
        description: "Return Visit Tracker",
        theme_color: "#ffffff",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  experimental: {
    assets: true,
  },
});
