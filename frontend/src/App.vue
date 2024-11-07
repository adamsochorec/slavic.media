<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import { provideAuth } from "./modules/users";

provideAuth();

// COMPONENTS
import Footer from "@/components/Footer.vue";
import navBar from "@/components/nav-bar.vue";

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
    <!-- HEADER START -->
    <header
      style="
        display: flex;
        justify-content: space-between;
        padding: 0 var(--homepage-padding) 0 var(--homepage-padding);
        background-color: var(--dark-grey-color-full);
        backdrop-filter: var(--blur-1);
      "
    >
      <RouterLink to="/">
        <div class="logo-container">
          <img
            class="logo"
            src="/Primary-1.png"
            alt=""
            title=""
            style="padding: 8px 0; width: 91px; height: 100%"
          />
        </div>
      </RouterLink>
      <navBar />

      <div style="display: flex; align-items: center">
        <Button
          class="rounded border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900"
          severity="secondary"
          outlined
          aria-label="Toggle Dark mode"
          @click="toggleDarkMode"
          :icon="['pi', darkMode ? 'pi-sun' : 'pi-moon']"
        ></Button>
      </div>
    </header>
    <!-- HEADER END -->
    <main>
      <RouterView />
    </main>
    <hr class="semi bodyxfooter" role="separator" />

    <Footer></Footer>
  </div>
</template>
<style scoped></style>
