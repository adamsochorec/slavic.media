<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

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
    const revealpoint = 0; // Trigger as soon as the element is in the viewport

    if (revealtop < windowHeight - revealpoint) {
      reveal.classList.add("active");
    }
  });
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.01, // Trigger as soon as a small part of the element is visible
    }
  );

  const applyObservers = () => {
    const reveals = document.querySelectorAll<HTMLElement>(
      ".reveal:not(.observed)"
    );
    reveals.forEach((reveal) => {
      observer.observe(reveal);
      reveal.classList.add("observed");
    });
  };

  // Apply observers and reveal elements immediately on page load
  applyObservers();
  reveal(); // Ensure elements are revealed immediately on load

  window.addEventListener("scroll", reveal);

  const mutationObserver = new MutationObserver(() => {
    applyObservers();
    reveal(); // Re-check visibility when DOM changes
  });
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
// CONTENT REVEAL END
</script>

<template>
  <NavBar />
  <!-- Main Content -->
  <aside><Cookies /><RequestProposal /></aside>
  <NuxtPage />
  <hr class="semi bodyxfooter" role="separator" />
  <Footer />
</template>
<style lang="postcss">
.page-enter-active,
.page-leave-active {
  transition: var(--transition-1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: var(--blur-1);
}
</style>
