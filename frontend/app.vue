<script setup lang="ts">
import { onMounted } from "vue";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Slavic Media` : "Slavic Media";
  },
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
    <aside>
      <Cookies><RequestProposal /></Cookies>
    </aside>
    <NuxtPage />
    <hr class="semi bodyxfooter" role="separator" />
    <Footer />
  </div>
</template>
<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
