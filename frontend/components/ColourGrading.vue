<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";

// Fetch documents
const {
  data: slides,
  pending,
  error,
} = await useFetch("https://api.slavic.media/slide");

const updateImageSrc = (event: Event) => {
  const target = event.target as HTMLImageElement;
  if (target.src !== target.dataset.src) {
    target.src = target.dataset.src!;
  }
};

// Helper to handle cached images
const checkIfAlreadyLoaded = (imgRef: HTMLImageElement | null) => {
  if (imgRef && imgRef.complete && imgRef.src !== imgRef.dataset.src) {
    imgRef.src = imgRef.dataset.src!;
  }
};

let removeArrowNavigation: () => void;

onMounted(() => {
  nextTick(() => {
    const swiper = new Swiper(".swiper-colour-grading", {
      loop: true,
      speed: 600,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      lazyPreloadPrevNext: 1,
      observer: true,
      observeParents: true,
      direction: "vertical",
    });

    removeArrowNavigation = useArrowNavigation(swiper);

    // Check all images for cached state after mount
    document
      .querySelectorAll<HTMLImageElement>(".swiper-colour-grading img")
      .forEach((img) => {
        checkIfAlreadyLoaded(img);
      });
  });
});

onUnmounted(() => {
  if (removeArrowNavigation) {
    removeArrowNavigation();
  }
});
</script>

<template>
  <section
    class="swiper swiper-colour-grading reveal"
    v-if="!pending && !error"
    aria-labelledby="image-compare-heading"
  >
    <h2 id="image-compare-heading" class="visually-hidden">
      Colour Grading Image Comparison Carousel
    </h2>
    <div class="swiper-wrapper" aria-busy="false">
      <!-- Slide -->
      <figure
        class="swiper-slide"
        v-for="(slide, index) in slides"
        :key="index"
      >
        <ImageCompare aria-label="Compare Images">
          <template #left>
            <Label :label="slide.log" class="note"></Label>
            <Label
              label="Colour Graded"
              class="note"
              style="left: var(--grid-gap-1)"
            ></Label>

            <img
              :src="`https://cdn.slavic.media/img/${slide._id}-2/thumbnail`"
              :data-src="`https://cdn.slavic.media/img/${slide._id}-2/fullHD`"
              :alt="`S-Log still ${slide._id}`"
              :title="`S-Log still ${slide._id}`"
              @load="updateImageSrc"
            />
          </template>
          <template #right>
            <img
              :src="`https://cdn.slavic.media/img/${slide._id}/thumbnail`"
              :data-src="`https://cdn.slavic.media/img/${slide._id}/fullHD`"
              :alt="`Colour Graded still ${slide._id}`"
              :title="`Colour Graded still ${slide._id}`"
              @load="updateImageSrc"
            />
          </template>
        </ImageCompare>
      </figure>
    </div>
    <div class="swiper-pagination" aria-busy="false"></div>
  </section>
  <SkeletonServices v-else />
</template>

<style scoped>
.swiper {
  border-radius: var(--border-radius-1);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  aspect-ratio: 16/9;
}
img {
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center center;
  object-position: center center;
}
.p-imagecompare {
  height: 100%;
}
</style>
