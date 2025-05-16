<script setup lang="ts">
import { onMounted, onBeforeUnmount, watchEffect } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

// Content hydration
const slug = useRoute().params.slug;
const { data: document } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blog").path(`/blog/${slug}`).first();
});

// SEO META (reactive)
watchEffect(() => {
  useServerSeoMeta({
    title: document.value?.title,
    description: document.value?.description,
    ogTitle: document.value?.title,
    ogDescription: document.value?.description,
    ogImage: `https://cdn.slavic.media/img/${document.value?.thumbnail}/sd`,
    ogUrl: `https://slavic.media/blog/${document.value?.slug}`,
    twitterTitle: document.value?.title,
    twitterDescription: document.value?.description,
    twitterImage: `https://cdn.slavic.media/img/${document.value?.thumbnail}/sd`,
    twitterCard: "summary",
  });
});

// PhotoSwipe
let lightbox: PhotoSwipeLightbox | null = null;
// Custom SVGs for arrows
const leftArrowSVGString = `
   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="pswp__button--arrow--left">
	<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 12H4m0 0l6-6m-6 6l6 6" />
</svg>`;
const rightArrowSVGString = `
   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="pswp__button--arrow--right">
	<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
</svg>`;

onMounted(() => {
  lightbox = new PhotoSwipeLightbox({
    gallery: ".article-content",
    children: "a.lightbox",
    errorMsg: "The photo cannot be loaded",
    secondaryZoomLevel: 1.5,
    pswpModule: () => import("photoswipe"),
    wheelToZoom: true,
    padding: {
      top: 0,
      bottom: 40,
      left: 0,
      right: 0,
    },
    preload: [1, 4],
    loop: false,
    arrowPrevSVG: leftArrowSVGString,
    arrowNextSVG: rightArrowSVGString,
    mainClass: "pswp--custom-icon-colors",
  });

  lightbox.init();
});

onBeforeUnmount(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});
</script>

<template>
  <main style="margin-top: 120px">
    <section
      class="wrapper-wide content reveal"
      role="region"
      aria-label="Main Article Content"
    >
      <h1>{{ document.title }}</h1>
      <ArticleMetadata
        :slug="document.slug"
        :author="{
          id: document.author.id,
          name: document.author.name,
          department: document.author.department,
          linkedin: document?.author.linkedin,
        }"
        :metadata="{
          date: document.date,
          length: document.length,
          linkedin: document?.linkedin,
        }"
      />
      <ContentRenderer :value="document" class="rendered-content reveal" />
    </section>
    <!-- LIGHTROOM PRESETS -->
    <LightroomPresets aria-busy="false"></LightroomPresets
    ><FurtherReading :excludeSlug="document.slug" />
  </main>
</template>
<style lang="postcss" scoped>
.swiper-videos {
  padding-bottom: calc(var(--grid-gap-2) * 2);

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
