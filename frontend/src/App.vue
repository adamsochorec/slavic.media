<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { provideAuth } from "./modules/logIn-logOut";
import chat from "@/components/chat.vue";
provideAuth();

// COMPONENTS
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/nav-bar.vue";
import Cookies from "@/components/cookies.vue";

// Dark Mode State

// CONTENT REVEAL START
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach((reveal) => {
    const revealtop = reveal.getBoundingClientRect().top;
    const revealpoint = 0; // Trigger as soon as it enters the viewport

    if (revealtop < windowHeight - revealpoint) {
      reveal.classList.add("active");
    }
  });
}

onMounted(() => {
  // Observer for reveal animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.1, // Adjust as needed
    }
  );

  // Apply observer to initial reveals
  const applyObservers = () => {
    const reveals = document.querySelectorAll(".reveal:not(.observed)");
    reveals.forEach((reveal) => {
      observer.observe(reveal);
      reveal.classList.add("observed"); // Mark as observed to avoid duplicate observing
    });
  };

  applyObservers(); // Initial check

  // Fallback for browsers without IntersectionObserver
  window.addEventListener("scroll", reveal);
  reveal();

  // Mutation Observer to watch for new elements
  const mutationObserver = new MutationObserver(() => {
    applyObservers();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
</script>

<template>
  <div>
    <!-- HEADER START -->
    <NavBar></NavBar>
    <aside><Cookies></Cookies><chat></chat></aside>

    <!-- HEADER END -->
    <main>
      <RouterView />
    </main>
    <hr class="semi bodyxfooter" role="separator" />

    <Footer></Footer>
  </div>
</template>

<style scoped></style>
