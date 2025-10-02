<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

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
    const revealpoint = 0;

    if (revealtop < windowHeight - revealpoint) {
      reveal.classList.add("active");
    }
  });
}

onMounted(async () => {
  // Wait for hydration to be complete
  await nextTick();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.01,
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

  // Apply observers after hydration
  applyObservers();
  reveal();

  window.addEventListener("scroll", reveal);

  const mutationObserver = new MutationObserver(() => {
    applyObservers();
    reveal();
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
      <ClientOnly>
        <Cookies />
        <RequestProposal />
      </ClientOnly>
    </aside>
    <NuxtPage />
    <hr class="semi bodyxfooter" role="separator" />
    <Footer />
    <SpeedInsights />
  </div>
</template>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
  transition: var(--transition-2);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: var(--blur-1);
}
</style>
