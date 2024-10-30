import "./assets/style.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Nora from "@primevue/themes/nora";
import { definePreset } from "@primevue/themes";
import App from "./App.vue";
import router from "./router";
import "primeicons/primeicons.css";

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

// Use the router
app.use(router);

// Mount the app to the element with the id 'app'
app.mount("#app");
