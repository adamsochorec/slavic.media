import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

// STYLING START
import PrimeVue from "primevue/config";
import Lara from "./presets/lara";
import "./assets/style.css";
import MegaMenu from "primevue/megamenu";
import "primeicons/primeicons.css";
// STYLING END

const app = createApp(App);

// PrimeVue components
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
// Global components
app.component("MegaMenu", MegaMenu);

// Use the router
app.use(router);

// Mount the app to the element with the id 'app'
app.mount("#app");
