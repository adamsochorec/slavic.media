<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import eventBus from "@/composables/useEventBus";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Slavic Media` : "Slavic Media";
  },
});

// Reactive state for loader visibility
const isLoading = ref(true);
const router = useRouter();

// Show loader until NuxtPage is ready
onMounted(() => {
  isLoading.value = false; // Hide loader once the page is mounted
});

// Handle page transitions
router.beforeEach((to, from, next) => {
  isLoading.value = true; // Show loader during navigation
  next();
});
router.afterEach(() => {
  isLoading.value = false; // Hide loader after navigation
});

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
</script>

<template>
  <div>
    <NavBar />
    <Loader v-if="isLoading" />
    <!-- Main Content -->
    <div v-else>
      <aside><Cookies /><RequestProposal /></aside>
      <NuxtPage />
      <hr class="semi bodyxfooter" role="separator" />
      <Footer />
    </div>
  </div>
</template>
<style scoped></style>
