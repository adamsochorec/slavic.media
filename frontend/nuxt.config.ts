import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  css: ["/assets/css/main.css", "primeicons/primeicons.css"],
  devtools: { enabled: true },
  modules: [
    "nuxt-swiper",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@nuxt/icon",
  ],
  app: {
    head: {
      title: "Slavic Media", // default fallback title
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "https://cdn.slavic.media/img/Favicon-2/height=100",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
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
