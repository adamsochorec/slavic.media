<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted, watch } from "vue";
const isDataLoaded = ref(true);

const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blog").path(`/blog/${slug}`).first();
});
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section
      class="wrapper-wide"
      role="region"
      aria-label="Main Article Content"
    >
      <ContentRenderer :value="post" class="article-content" />
    </section>
    <!-- LIGHTROOM PRESETS BANNER CTA -->
    <bannerLightroomPresets
      v-if="isDataLoaded"
      aria-busy="false"
    ></bannerLightroomPresets>
  </article>
</template>
<style lang="scss" scoped>
h1 {
  font-size: var(--font-size-2);
}
.avatar {
  height: 60px;
  width: auto;
  object-fit: cover;

  aspect-ratio: 1/1;
}
.article-metadata {
  margin: var(--grid-gap-2) 0;
  color: rgb(var(--white-color));
  border-radius: var(--border-radius-1);
}
.pi-angle-right {
  font-size: var(--font-size-4);
  vertical-align: middle;
}
.grid-container {
  grid-template-columns: repeat(1, 1fr);
  display: grid;
  grid-gap: var(--grid-gap-3);
  height: auto;
  border-radius: var(--border-radius-1);
  color: white;
}
.grid-container .grid-item:nth-child(odd) {
  margin-right: var(--grid-gap-2);
}
.gallery {
  grid-template-columns: repeat(3, 1fr);
}
.swiper-videos {
  padding-bottom: calc(var(--grid-gap-2) * 2);
}
.swiper-videos .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 550px) {
  .gallery-item {
    height: 120px;
  }
}
@media only screen and (max-width: 667px) {
  .gallery {
    grid-template-columns: repeat(1, 1fr);
  }
  .avatar {
    height: 40px;
  }
}
@media only screen and (min-width: 400px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .article-metadata {
    background: rgb(var(--dark-grey-color));
    padding: var(--grid-gap-1);
  }
}
</style>
