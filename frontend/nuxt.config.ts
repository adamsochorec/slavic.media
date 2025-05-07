import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  runtimeConfig: {
    public: {
      GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
      CHATWAY: process.env.CHATWAY,
    },
  },
  content: {
    markdown: {
      markdown: {
        tags: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
        },
      },
    },
    preview: {
      api: "https://api.nuxt.studio",
      gitInfo: {
        name: "slavic.media",
        owner: "adamsochorec",
        url: "https://github.com/adamsochorec/slavic.media",
      },
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
    "@nuxt/devtools",
    "@nuxtjs/mdc",
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
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  nitro: {
    output: {
      serverDir: ".output/server",
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
});
