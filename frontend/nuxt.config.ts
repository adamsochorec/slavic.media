import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  runtimeConfig: {
    public: {
      GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
      CHATWAY: process.env.CHATWAY,
    },
  },
  css: ["/assets/css/main.css", "primeicons/primeicons.css"],
  devtools: { enabled: true },
  debug: true,
  modules: [
    "nuxt-swiper",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/content",
    "@nuxthq/studio",
  ],
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "https://cdn.slavic.media/img/Favicon-2/height=100",
        },
      ],
      title: "Slavic Media",
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      htmlAttrs: {
        lang: "en",
      },
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  nitro: {
    output: {
      publicDir: "dist",
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
      ripple: true,
    },
  },
});