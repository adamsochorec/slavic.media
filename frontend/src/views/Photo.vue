<script setup>
import { ref } from "vue";
import SimpleGallery from "@/components/GalleryPortrait.vue";

const images = ref([
  {
    largeURL:
      "https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg",
    thumbnailURL:
      "https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg",
    width: 1875,
    height: 2500,
  },
  {
    largeURL:
      "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
    thumbnailURL:
      "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg",
    width: 1669,
    height: 2500,
  },
  {
    largeURL:
      "https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg",
    thumbnailURL:
      "https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg",
    width: 2500,
    height: 1666,
  },
]);
</script>

<template>
  <article class="wrapper-wide">
    <Fluid>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h1 style="font-size: var(--font-size-1)">
            <span class="highlited tuscher">Photo</span> Services
          </h1>
        </div>
        <div>
          <p class="mb-5">
            Whether it’s a dynamic performance, a powerful portrait, or the vast
            outdoors, our photography captures authentic moments, rich in detail
            and emotion, that tell your story.
          </p>
          <ContactDialog />
        </div>
      </div>
      <hr />
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h1 style="font-size: var(--font-size-2)">
            <span class="highlited tuscher">Colorful</span> Portrait
          </h1>
        </div>
        <div>
          <p class="mb-5">
            Through bold colors and deep eye contact, each portrait captures the
            true essence of who you are—moments that feel real and connect on a
            personal level.
          </p>
        </div>
      </div>
    </Fluid>
    <hr class="semi" />
    <div :id="galleryID">
      <a
        v-for="(image, key) in images"
        :key="key"
        :href="image.largeURL"
        :data-pswp-width="image.width"
        :data-pswp-height="image.height"
        target="_blank"
        rel="noreferrer"
      >
        <img :src="image.thumbnailURL" alt="" />
      </a>
    </div>
  </article>
</template>

<style lang="scss" scoped></style>
