<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { provideAuth } from "./modules/logIn-logOut";

provideAuth();

// CONTENT REVEAL START
function reveal() {
  const reveals = document.querySelectorAll<HTMLElement>(".reveal");
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
    const reveals = document.querySelectorAll<HTMLElement>(
      ".reveal:not(.observed)"
    );
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
// CONTENT REVEAL END

// DYNAMIC PAGE TITLE START
const route = useRoute();
const pageTitle = ref(route.meta.pageTitle || "");
watch(
  () => route.meta.pageTitle,
  (newTitle) => {
    pageTitle.value = newTitle || "";
  }
);
// DYNAMIC PAGE TITLE END
</script>

<template>
  <div>
    <!-- HEADER START -->
    <NavBar :pageTitle="pageTitle" />
    <aside><Cookies></Cookies></aside>
    <!-- HEADER END -->
    <main>
      <RouterView />
    </main>
    <hr class="semi bodyxfooter" role="separator" />
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
