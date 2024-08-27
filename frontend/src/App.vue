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
            src="../Primary-1.png"
          /></div
      ></RouterLink>
      <NavigationView />
    </header>
    <div class="main">
      <RouterView />
    </div>
    <hr class="semi bodyxfooter" role="separator" />

    <footer>
      <FooterView />
    </footer>
  </div>
</template>

<style scoped>
.main {
  font-family: var(--content-font);
  color: #1a1a1a;
  margin-top: 118.4px;
  padding: 0 var(--homepage-padding) 0 var(--homepage-padding);
}
</style>
