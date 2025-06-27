<script setup lang="ts">
import { onMounted, nextTick } from "vue";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Slavic Media` : "Slavic Media";
  },
});

let intersectionObserver: IntersectionObserver | null = null;
let mutationObserver: MutationObserver | null = null;

onMounted(async () => {
  await nextTick();

  // Single intersection observer with better performance
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      // Use requestAnimationFrame to batch DOM updates
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("active");

            // Unobserve to prevent repeated triggers
            intersectionObserver?.unobserve(target);
          }
        });
      });
    },
    {
      threshold: 0.01,
      rootMargin: "50px 0px", // Start animation slightly before element is visible
    }
  );

  // Debounced mutation observer
  let mutationTimeout: NodeJS.Timeout;
  mutationObserver = new MutationObserver(() => {
    clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(() => {
      applyObservers();
    }, 100); // Debounce by 100ms
  });

  const applyObservers = () => {
    const reveals = document.querySelectorAll<HTMLElement>(
      ".reveal:not(.observed)"
    );

    // Batch DOM operations
    const fragment = document.createDocumentFragment();
    reveals.forEach((reveal) => {
      intersectionObserver?.observe(reveal);
      reveal.classList.add("observed");
    });
  };

  applyObservers();

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

// Cleanup on unmount
onBeforeUnmount(() => {
  intersectionObserver?.disconnect();
  mutationObserver?.disconnect();
});
// OPTIMIZED CONTENT REVEAL END
</script>

<template>
  <div>
    <NavBar />
    <aside>
      <Cookies />
      <RequestProposal />
    </aside>
    <NuxtPage />
    <hr class="semi bodyxfooter" role="separator" />
    <Footer />
  </div>
</template>
