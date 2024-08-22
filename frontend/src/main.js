import { createApp } from "vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Lara from "./presets/lara";
import "./assets/style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
// Mount the app to the element with the id 'app'
app.mount("#app");
