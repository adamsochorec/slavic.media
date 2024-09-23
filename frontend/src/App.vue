<script setup>
import { RouterView } from "vue-router";
import { provideAuth } from "./modules/users";
provideAuth();

// COMPONENTS
import FooterView from "./components/FooterView.vue";
import NavigationView from "./components/NavigationView.vue";

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark-mode");
}

// CONTENT REVEAL START
// Function to reveal elements as the user scrolls
function reveal() {
  const reveals = document.querySelectorAll(".reveal"),
    windowHeight = window.innerHeight;

  reveals.forEach((reveal) => {
    const revealtop = reveal.getBoundingClientRect().top,
      revealpoint = 0;
    // Adds "active" class to elements in view
    if (revealtop < windowHeight - revealpoint) {
      reveal.classList.add("active");
    }
  });
}
window.addEventListener("scroll", reveal);
reveal();
// CONTENT REVEAL END
</script>

<template>
  <div>
    <header>
      <RouterLink to="/">
        <div class="logo-container">
          <img
            class="logo"
            src="https://slavic.media/img/Primary-1.png"
            alt="Logo Slavic Media"
            title="Logo Slavic Media"
          /></div
      ></RouterLink>
      <button
        label="Toggle Dark mode"
        @click="toggleDarkMode"
        class="pi pi-sun"
      ></button>
      <NavigationView />
    </header>
    <div class="main">
      <RouterView />
    </div>
    <hr class="semi bodyxfooter" role="separator" />

    <FooterView />
  </div>
</template>

<style scoped>
.main {
  font-family: var(--content-font);
  color: #1a1a1a;
  margin-top: 118.4px;
  padding: 0 var(--homepage-padding) 0 var(--homepage-padding);
}
header {
  display: flex;
  justify-content: space-between;
  padding: 0 var(--homepage-padding) 0 var(--homepage-padding);
  background-color: #c71e1ecc;
}
</style>
dakr grey 0000004d prima c71e1e sec 11457e
