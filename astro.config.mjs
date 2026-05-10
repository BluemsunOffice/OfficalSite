// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import shikiToolbar from './src/plugins/shiki-toolbar.mjs';

// https://astro.build/config
export default defineConfig({
  site: "https://blogs.bluemsun.com.cn",
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "material-theme-lighter",
        dark: "material-theme-darker",
      },
      transformers: [shikiToolbar()]
    },
  },
});
