// src/main.ts
import "./assets/style.css";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Nora from "@primevue/themes/nora";
import { definePreset } from "@primevue/themes";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import "primeicons/primeicons.css";
import VueLazyload from "vue-lazyload";
import CountryFlag from "vue-country-flag-next";
import { registerGlobalComponents } from "./components"; // Corrected import path

const app = createApp(App);

const slavicmedia = definePreset(Nora, {
  semantic: {
    primary: {
      50: "{gray.50}",
      100: "{gray.100}",
      200: "{gray.200}",
      300: "{gray.300}",
      400: "{gray.400}",
      500: "{gray.500}",
      600: "{gray.600}",
      700: "{gray.700}",
      800: "{gray.800}",
      900: "{gray.900}",
      950: "{gray.950}",
    },
  },
});

app.use(PrimeVue, {
  theme: {
    preset: slavicmedia,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});

app.use(router);


// Configure vue-lazyload
app.use(VueLazyload, {
  preLoad: 1.3,
  error: "./assets/error.png",
  loading: "./assets/loading.gif",
  attempt: 1,
});

app.component("CountryFlag", CountryFlag);

// Register global components
registerGlobalComponents(app);

// Mount the app to the element with the id 'app'
app.mount("#app");
