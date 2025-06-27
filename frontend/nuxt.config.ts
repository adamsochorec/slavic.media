import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-07",
  runtimeConfig: {
    public: {
      FORM: process.env.FORM,
      CHATWAY: process.env.CHATWAY,
      GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
    },
  },
  sourcemap: {
    server: true,
    client: true,
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
    },
  },
  devtools: {
    enabled: process.env.NODE_ENV === "development",
    timeline: {
      enabled: process.env.NODE_ENV === "development",
    },
  },
  ssr: true,
  experimental: {
    payloadExtraction: false,
    wasm: false,
    writeEarlyHints: false,
  },
  debug: process.env.NODE_ENV === "development",
  modules: [
    "nuxt-swiper",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/content",
    "@nuxt/devtools",
    "@nuxtjs/mdc",
    "@nuxt/image",
  ],
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    keepalive: false,
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
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
    routeRules: {
      "/**": {
        prerender: false,
        headers: {
          "Strict-Transport-Security":
            "max-age=31536000; includeSubDomains; preload",
          // Additional security headers
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          // Fixed Content Security Policy
          "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.youtube.com *.vimeo.com *.google.com *.googleapis.com *.gstatic.com *.googletagmanager.com *.chatway.app cdn.chatway.app *.vimeocdn.com",
            "style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com cdn.jsdelivr.net",
            "img-src 'self' data: blob: *.slavic.media *.youtube.com *.vimeo.com *.google.com *.googleapis.com *.gstatic.com *.googleusercontent.com cdn.jsdelivr.net *.vimeocdn.com *.ytimg.com",
            "font-src 'self' data: *.googleapis.com *.gstatic.com cdn.jsdelivr.net",
            "connect-src 'self' ws: wss: *.slavic.media *.youtube.com *.vimeo.com *.google.com *.googleapis.com *.googletagmanager.com *.chatway.app *.vimeocdn.com api.iconify.design localhost:*",
            "frame-src 'self' *.youtube.com *.youtube-nocookie.com *.vimeo.com *.google.com sketchfab.com *.chatway.app open.spotify.com dronezoner.eu dronview.rlp.cz about:",
            "media-src 'self' *.slavic.media *.youtube.com *.vimeo.com *.vimeocdn.com",
          ].join("; "),
          "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
        },
      },
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
