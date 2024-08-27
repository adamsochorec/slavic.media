import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

// STYLING START
import PrimeVue from "primevue/config";
import Lara from "./presets/lara";
import "./assets/style.css";
import "primeicons/primeicons.css";

// STYLING END

const app = createApp(App);

// PrimeVue components
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
// Global components
import MegaMenu from "primevue/megamenu";
import Skeleton from "primevue/skeleton";
app.component("MegaMenu", MegaMenu);
app.component("SkeleTon", Skeleton);

// Use the router
app.use(router);

// Mount the app to the element with the id 'app'
app.mount("#app");
