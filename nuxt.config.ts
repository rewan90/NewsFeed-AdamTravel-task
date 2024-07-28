import vuetify from "vite-plugin-vuetify";
import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },

  modules: [
    // ...
    "@pinia/nuxt",
  ],

  plugins: ["~/plugins/vuetify.js"],

  hooks: {
    "vite:extendConfig": (config) => {
      vuetify({
        styles: { configFile: resolve("./settings.scss") },
      });
    },
  },
  
});
