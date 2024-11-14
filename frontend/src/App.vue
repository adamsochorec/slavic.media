<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { provideAuth } from "./modules/logIn-logOut";

provideAuth();

// COMPONENTS
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/nav-bar.vue";

// Dark Mode State

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
onMounted(() => {
  window.addEventListener("scroll", reveal);
  reveal();
});
</script>

<template>
  <div>
    <!-- HEADER START -->
    <header>
      <NavBar></NavBar>
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
