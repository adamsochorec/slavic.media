<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import ImageCompare from "primevue/imagecompare";

const slides = ref([
  {
    original: "2024-12-11-144344",
    edited: "2024-12-11-144345",
    flag: "no",
  },
  {
    original: "2024-12-11-144346",
    edited: "2024-12-11-145021",
    flag: "no",
  },
  {
    original: "2024-09-25-135155",
    edited: "showreel",
    flag: "no",
  },
  {
    original: "2024-09-25-135156",
    edited: "showreel",
  },
  {
    original: "2024-09-25-141317",
    edited: "showreel",
    flag: "fi",
  },
  {
    original: "2024-10-05-150545",
    edited: "showreel",
    flag: "fi",
  },
  {
    original: "2024-11-04-203547",
    edited: "showreel",
    flag: "de",
  },
]);

const swiperOptions = {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  speed: 600,

  autoplay: { delay: 2000, pauseOnMouseEnter: true },
  preloadImages: false,
  lazy: true,
  observer: true,
  observeParents: true,
  direction: "horizontal",
};
</script>

<template>
  <section class="swiper reveal">
    <Swiper v-bind="swiperOptions" aria-labelledby="image-compare-heading">
      <h2 id="image-compare-heading" class="visually-hidden">
        Image Comparison Carousel
      </h2>
      <template v-for="(slide, index) in slides" :key="index">
        <SwiperSlide>
          <country-flag :country="slide.flag" class="note" size="small" />
          <ImageCompare aria-label="Compare Images">
            <template #left>
              <img
                :src="`https://cdn.slavic.media/images/${slide.original}/public`"
                :alt="`Original version of ${slide.original}`"
              />
            </template>
            <template #right>
              <img
                :src="`https://cdn.slavic.media/images/${slide.edited}/public`"
                :alt="`Original version of ${slide.edited}`"
              />
            </template>
          </ImageCompare>
        </SwiperSlide>
      </template>
      <div class="swiper-pagination" aria-label="Carousel pagination"></div>
    </Swiper>
  </section>
</template>

<style scoped>
.swiper {
  border-radius: var(--border-radius-1);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  aspect-ratio: 2.39/1;
}
img {
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center center;
  object-position: center center;
}
</style>
