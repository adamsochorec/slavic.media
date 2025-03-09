<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/functions/arrow-navigation";
import { useSwiperAutoplay } from "@/functions/swiper-autoplay";

// Define the type for reel objects
interface Service {
  id: string;
  desc: string;
}

const services = ref<Service[]>([
  {
    id: "commercial",
    desc: "",
  },
  {
    id: "colour-grading",
    desc: "",
  },
  {
    id: "content",
    desc: "",
  },
  {
    id: "sound-edit",
    desc: "",
  },
]);

onMounted(() => {
  const swiper = new Swiper(".swiper-video", {
    loop: false,
    speed: 600,
    autoplay: { delay: 2000, pauseOnMouseEnter: true },
    spaceBetween: 15,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    preloadImages: false,
    lazyLoading: true,
    observer: true,
    observeParents: true,
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      550: {
        slidesPerView: 2.7,
      },
      1000: {
        slidesPerView: 4,
      },
    },
    direction: "horizontal",
  });

  const removeArrowNavigation = useArrowNavigation(swiper);
  const removeSwiperAutoplay = useSwiperAutoplay(swiper, ".swiper-photo");

  onUnmounted(() => {
    removeArrowNavigation();
    removeSwiperAutoplay();
  });
});
</script>

<template>
  <section
    class="swiper swiper-video reveal"
    aria-labelledby="services-heading"
    role="region"
  >
    <h2 id="services-heading" class="visually-hidden">Our Services</h2>
    <div class="swiper-wrapper" aria-busy="false">
      <div
        v-for="service in services"
        :key="service.id"
        class="swiper-slide"
        role="group"
        :aria-labelledby="`service-${service.id}`"
      >
        <galleryItem
          :img="service.id"
          :opacity="0.5"
          :url="`/services/video#${service.id}`"
          :title="`${service.id}`"
          :alt="`${service.id} services cover`"
          :desc="service.desc"
          icon="camera"
        />
      </div>
    </div>
    <div class="swiper-pagination" aria-busy="false"></div>
  </section>
</template>

<style scoped>
.swiper {
  padding-bottom: calc(var(--grid-gap-2) * 2);
}
.gallery-item {
  aspect-ratio: 4/3;
}
</style>
