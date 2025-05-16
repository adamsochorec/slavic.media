import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-07",
  runtimeConfig: {
    public: {
      FORMSPREE: process.env.FORMSPREE,
      CHATWAY: process.env.CHATWAY,
      GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
    },
  },
  content: {
    renderer: {
      anchorLinks: { h2: false, h3: false, h4: false, h5: false, h6: false },
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
  postcss: {
    plugins: {
      "postcss-nested": {},
      "postcss-custom-media": {},
    },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
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
          href: "/favicon.ico",
        },
      ],
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
      serverDir: ".output/server",
    },
    prerender: {
      crawlLinks: true,
      ignore: [
        "/dominik-tószegi-07872a248/",
        "/gabrielasochorcova",
        "/adamsochorec",
        "/marcelhajik",
      ],
    },
  },
  primevue: {
    options: {
      ripple: false,
      theme: {
        preset: Aura,
      },
    },
    treeshake: true,
  },
});
