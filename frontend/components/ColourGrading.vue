<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import slide from "@/composables/modules/slide";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";

interface Slide {
  _id: string;
  log: string;
}

const isDataLoaded = ref(false);
const slides = ref<Slide[]>([]);
const { state, getAllSlides } = slide();

const updateImageSrc = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = target.dataset.src!;
};

let removeArrowNavigation: () => void;

onMounted(async () => {
  await getAllSlides();
  slides.value = state.value.slides;
  isDataLoaded.value = true;

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
    v-if="isDataLoaded"
    aria-labelledby="image-compare-heading"
  >
    <h2 id="image-compare-heading" class="visually-hidden">
      Colour Grading Image Comparison Carousel
    </h2>
    <div class="swiper-wrapper" v-if="isDataLoaded" aria-busy="false">
      <!-- Slide -->
      <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
        <ImageCompare aria-label="Compare Images">
          <template #left>
            <Label icon="pi pi-video" :label="slide.log" class="note"></Label>
            <Label
              label="Colour Graded"
              class="note"
              style="left: var(--grid-gap-1)"
            ></Label>

            <img
              :src="`https://cdn.slavic.media/img/${slide._id}-2/thumbnail`"
              :data-src="`https://cdn.slavic.media/img/${slide._id}-2/public`"
              :alt="`S-Log still ${slide._id}`"
              :title="`S-Log still ${slide._id}`"
              @load="updateImageSrc"
            />
          </template>
          <template #right>
            <img
              :src="`https://cdn.slavic.media/img/${slide._id}/thumbnail`"
              :data-src="`https://cdn.slavic.media/img/${slide._id}/public`"
              :alt="`Colour Graded still ${slide._id}`"
              :title="`Colour Graded still ${slide._id}`"
              @load="updateImageSrc"
            />
          </template>
        </ImageCompare>
      </div>
    </div>
    <div class="swiper-pagination" v-if="isDataLoaded" aria-busy="false"></div>
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
