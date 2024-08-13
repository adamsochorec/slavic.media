<script setup>
import { RouterView } from "vue-router";
import NavigationView from "./components/NavigationView.vue";
import { provideAuth } from "./modules/users";
provideAuth();
</script>

<template>
  <header>
    <RouterLink to="/pizzas">
      <div class="logo-container">
        <span>Aba</span>
      </div></RouterLink
    >
    <div class="wrapper">
      <NavigationView />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  height: 50px;
  position: absolute;
  top: 0;
  display: flex;
  left: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    align-items: center;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
./components/NavigationView.vue
