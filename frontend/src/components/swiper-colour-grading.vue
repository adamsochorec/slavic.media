<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import ImageCompare from "primevue/imagecompare";

const slides = ref([
  {
    original: "2024-09-25-135153",
    edited: "showreel",
  },
  {
    original: "2024-09-25-135154",
    edited: "showreel",
  },
  {
    original: "2024-09-25-135155",
    edited: "showreel",
  },
  {
    original: "2024-09-25-135156",
    edited: "showreel",
  },
  {
    original: "2024-09-25-141317",
    edited: "showreel",
  },
  {
    original: "2024-10-05-150545",
    edited: "showreel",
  },
  {
    original: "2024-11-04-203547",
    edited: "showreel",
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
    <Swiper v-bind="swiperOptions">
      <template v-for="(slide, index) in slides" :key="index">
        <SwiperSlide>
          <ImageCompare aria-label="Compare Images">
            <template #left>
              <img
                :src="`https://cdn.slavic.media/images/${slide.original}/public`"
              />
            </template>
            <template #right>
              <img
                :src="`https://cdn.slavic.media/images/${slide.edited}/public`"
              />
            </template>
          </ImageCompare>
        </SwiperSlide>
      </template>
      <div class="swiper-pagination"></div>
    </Swiper>
  </section>
</template>

<style scoped>
.swiper {
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  aspect-ratio: 2.39/1;
}
img {
  object-fit: cover;
  object-position: center center;
}
</style>
