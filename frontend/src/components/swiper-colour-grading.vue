<script setup lang="ts">
import { ref, onMounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import ImageCompare from "primevue/imagecompare";

const slides = ref([
  {
    original: "20240308_SLAVIC-MEDIA0204",
    edited: "20240308_SLAVIC-MEDIA0204-2",
    flag: "fi",
  },
  {
    original: "20240312_SLAVIC-MEDIA0583",
    edited: "20240312_SLAVIC-MEDIA0583-2",
    flag: "fi",
  },
  {
    original: "20240314_SLAVIC-MEDIA0714",
    edited: "20240314_SLAVIC-MEDIA0714-2",
    flag: "fi",
  },
  {
    original: "20240314_SLAVIC-MEDIA0719",
    edited: "20240314_SLAVIC-MEDIA0719-2",
    flag: "fi",
  },
  {
    original: "20240511_SLAVIC-MEDIA1149",
    edited: "20240511_SLAVIC-MEDIA1149-2",
    flag: "no",
  },
  {
    original: "20240512_SLAVIC-MEDIA1233",
    edited: "20240512_SLAVIC-MEDIA1233-2",
    flag: "no",
  },
  {
    original: "DJI_0032",
    edited: "DJI_0032-2",
    flag: "no",
  },
  {
    original: "DJI_20240513134142_0052_D_SLAVICM",
    edited: "DJI_20240513134142_0052_D_SLAVICM-2",
    flag: "no",
  },
  {
    original: "DJI_20240515173653_0002_D_SLAVICM",
    edited: "DJI_20240515173653_0002_D_SLAVICM-2",
    flag: "no",
  },
]);
onMounted(async () => {
  new Swiper(".swiper-colour-grading", {
    loop: true,
    speed: 600,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: { delay: 1000, pauseOnMouseEnter: true },
    preloadImages: false,
    lazy: true,
    observer: true,
    observeParents: true,
    direction: "vertical",
  });
});
</script>

<template>
  <section
    class="swiper swiper-colour-grading reveal"
    aria-labelledby="image-compare-heading"
  >
    <h2 id="image-compare-heading" class="visually-hidden">
      Image Comparison Carousel
    </h2>
    <div class="swiper-wrapper">
      <!-- Slide -->
      <div
        class="swiper-slide card"
        v-for="(slide, index) in slides"
        :key="index"
      >
        <country-flag :country="slide.flag" class="note" size="small" />
        <ImageCompare aria-label="Compare Images">
          <template #left>
            <img
              :src="`https://cdn.slavic.media/images/${slide.original}/fit=contain,width=1280,sharpen=100`"
              alt="Original stills"
              title="Original"
            />
          </template>
          <template #right>
            <img
              :src="`https://cdn.slavic.media/images/${slide.edited}/fit=contain,width=1280,sharpen=100`"
              alt="Colour Graded still"
              title="Colour Graded"
            />
          </template>
        </ImageCompare>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </section>
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
