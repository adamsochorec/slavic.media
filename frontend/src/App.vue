<script setup>
import { RouterView } from "vue-router";
import { provideAuth } from "./modules/users";
provideAuth();

// COMPONENTS
import FooterView from "./components/FooterView.vue";
import NavigationView from "./components/NavigationView.vue";
</script>

<template>
  <div>
    <header>
      <RouterLink to="/">
        <div class="logo-container">
          <img
            class="logo"
            alt="Logo Slavic Media"
            title="Logo Slavic Media"
            src=""
          /></div
      ></RouterLink>
      <NavigationView />
    </header>
    <RouterView />

    <footer>
      <hr class="semi bodyxfooter" role="separator" />

      <FooterView />
    </footer>
  </div>
</template>

<style scoped></style>
