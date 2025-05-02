<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted, PropType } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/functions/arrow-navigation";
import { useSwiperAutoplay } from "@/functions/swiper-autoplay";

// Define the type for reel objects
interface Service {
  id: string;
  title: string;
  description?: string;
}

const props = defineProps<{
  services: Service[];
  swiperClass: String;
}>();

onMounted(() => {
  const swiper = new Swiper(".swiper-further-services", {
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
  const removeSwiperAutoplay = useSwiperAutoplay(
    swiper,
    ".swiper-further-services"
  );

  onUnmounted(() => {
    removeArrowNavigation();
    removeSwiperAutoplay();
  });
});
</script>

<template>
  <section
    class="swiper swiper-further-services reveal"
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
          :url="`/services/${swiperClass}#${service.id}`"
          :title="`${service.title}`"
          :alt="`${service.id} services cover`"
          :description="service.description"
          icon="camera"
        />
      </div>
    </div>
    <div :class="swiperPaginationClass" aria-busy="false"></div>
  </section>
</template>

<style scoped>
.swiper {
  padding-bottom: calc(var(--grid-gap-2) * 2);
}
.gallery-item {
  aspect-ratio: 16/9;
}

@media only screen and (max-width: 400px) {
  .gallery-item {
    aspect-ratio: 1/1;
  }
}
</style>
