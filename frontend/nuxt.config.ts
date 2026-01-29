import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-07",
  runtimeConfig: {
    public: {
      FORM: process.env.FORM,
      CHATWAY: process.env.CHATWAY,
      GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
      API_URL: process.env.API_URL,
      MAPY_API_KEY: process.env.MAPY_API_KEY,
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
  },
  css: ["/assets/css/main.css", "primeicons/primeicons.css"],
  postcss: {
    plugins: {
      "postcss-nested": {},
      autoprefixer: {},
    },
  },
  devtools: {
    enabled: process.env.NODE_ENV === "development",
    timeline: {
      enabled: process.env.NODE_ENV === "development",
    },
  },
  ssr: true,
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
  },
  features: {
    inlineStyles: false,
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            photoswipe: ["photoswipe/lightbox", "photoswipe/style.css"],
            swiper: ["swiper"],
          },
        },
      },
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ["/sitemap.xml", "/robots.txt"],
    },
    output: {
      serverDir: ".output/server",
    },
    routeRules: {
      "/**": {
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
            "worker-src blob:",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.youtube.com *.google.com *.googleapis.com *.gstatic.com *.googletagmanager.com *.chatway.app cdn.chatway.app vercel.live static.cloudflareinsights.com",
            "style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com cdn.jsdelivr.net *.chatway.app",
            "img-src 'self' data: blob: *.slavic.media *.youtube.com *.google.com *.googleapis.com *.gstatic.com *.googleusercontent.com cdn.jsdelivr.net *.ytimg.com *.mapy.cz *.mapy.com",
            "font-src 'self' data: *.googleapis.com *.gstatic.com cdn.jsdelivr.net",
            "connect-src 'self' ws: wss: *.slavic.media *.youtube.com *.youtube-nocookie.com *.google.com *.googleapis.com *.googletagmanager.com *.chatway.app api.iconify.design *.cloudflare.com localhost:* *.mapy.cz *.mapy.com",
            "frame-src 'self' *.youtube.com *.youtube-nocookie.com *.google.com *.mapy.cz sketchfab.com *.chatway.app open.spotify.com dronezoner.eu dronemap.gov.cz about: *.mapy.com",
            "media-src 'self' *.slavic.media *.youtube.com *.mapy.cz",
            "frame-ancestors 'none'",
          ].join("; "),
          "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
        },
      },
    },
  },
  primevue: {
    autoImport: false,
    components: {
      prefix: "Prime",
      include: ["Tooltip", "Skeleton"],
    },
    options: {
      ripple: false,
      theme: {
        preset: Aura,
      },
    },
    treeshake: true,
  },
});
