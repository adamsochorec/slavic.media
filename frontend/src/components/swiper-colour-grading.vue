<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ImageCompare from "primevue/imagecompare";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/functions/arrow-navigation";

interface Slide {
  _id: string;
  log: string;
}
const slides = ref<Slide[]>([
  { _id: "20240308_SLAVIC-MEDIA0204", log: "S-Log" },
  { _id: "20240312_SLAVIC-MEDIA0583", log: "S-Log" },
  { _id: "20240314_SLAVIC-MEDIA0714", log: "S-Log" },
  { _id: "20241024_SLAVIC-MEDIA2061", log: "S-Log" },
  { _id: "20240314_SLAVIC-MEDIA0719", log: "S-Log" },
  { _id: "20240511_SLAVIC-MEDIA1149", log: "S-Log" },
  { _id: "20240512_SLAVIC-MEDIA1233", log: "S-Log" },
  { _id: "DJI_0032", log: "D-Log" },
  { _id: "DJI_20240513134142_0052_D_SLAVICM", log: "D-Log M" },
  { _id: "DJI_20240515173653_0002_D_SLAVICM", log: "D-Log M" },
]);
onMounted(() => {
  const swiper = new Swiper(".swiper-colour-grading", {
    loop: true,
    speed: 600,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    lazyPreloadPrevNext: 1,
    lazy: true,
    lazyLoading: true,
    observer: true,
    observeParents: true,
    direction: "vertical",
  });

  const removeArrowNavigation = useArrowNavigation(swiper);

  onUnmounted(() => {
    removeArrowNavigation();
  });
});
</script>

<template>
  <section
    class="swiper swiper-colour-grading reveal"
    aria-labelledby="image-compare-heading"
  >
    <h2 id="image-compare-heading" class="visually-hidden">
      Colour Grading Image Comparison Carousel
    </h2>
    <div class="swiper-wrapper">
      <!-- Slide -->
      <div
        class="swiper-slide card"
        v-for="(slide, index) in slides"
        :key="index"
      >
        <ImageCompare aria-label="Compare Images">
          <template #left>
            <span class="note">{{ slide.log }}</span>

            <span class="note edited">Colour Graded</span>

            <img
              :src="`https://cdn.slavic.media/images/${slide._id}/fit=contain,width=1280,sharpen=100`"
              :alt="`S-Log still ${slide._id}`"
              :title="`S-Log still ${slide._id}`"
            />
          </template>
          <template #right>
            <img
              :src="`https://cdn.slavic.media/images/${slide._id}-2/fit=contain,width=1280,sharpen=100`"
              :alt="`Colour Graded still ${slide._id}`"
              :title="`Colour Graded still ${slide._id}`"
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
.note.edited {
  left: var(--grid-gap-1);
}
.note.original {
  right: var(--grid-gap-1) !important;
}
.note {
  background-color: rgba(var(--dark-grey-color), 0.3);
  -webkit-backdrop-filter: var(--blur-1);
  backdrop-filter: var(--blur-1);
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 0 var(--grid-gap-1);
  text-align: center;
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
