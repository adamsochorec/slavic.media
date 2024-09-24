<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import { provideAuth } from "./modules/users";
provideAuth();

// COMPONENTS
import Footer from "./components/Footer.vue";
import MenuBar from "./components/MenuBar.vue";

// Dark Mode State
const darkMode = ref(false);
function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  document.documentElement.classList.toggle("dark-mode", darkMode.value);
  console.log("dark mode", darkMode.value);
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
      <MenuBar />
      <div style="display: flex; align-items: center">
        <Button
          severity="secondary"
          rounded
          outlined
          aria-label="Toggle Dark mode"
          @click="toggleDarkMode"
          :icon="['pi', darkMode ? 'pi-sun' : 'pi-moon']"
        ></Button>
      </div>
    </header>
    <div class="main">
      <RouterView />
    </div>
    <hr class="semi bodyxfooter" role="separator" />
    <Footer />
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
header img.logo {
  padding: 8px 0;
  width: 91px;
  height: 100%;
}
</style>
