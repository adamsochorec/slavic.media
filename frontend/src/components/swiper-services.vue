<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import services from "@/modules/services";
import { useArrowNavigation } from "@/functions/arrow-navigation";
import { useSwiperAutoplay } from "@/functions/swiper-autoplay";

const { state, getAllServices } = services();
const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllServices();
  isDataLoaded.value = true;

  nextTick(() => {
    const swiper = new Swiper(".swiper-services", {
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
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 2,
        },
      },
      direction: "horizontal",
    });

    const removeArrowNavigation = useArrowNavigation(swiper);
    const removeSwiperAutoplay = useSwiperAutoplay(swiper, ".swiper-services");

    onUnmounted(() => {
      removeArrowNavigation();
      removeSwiperAutoplay();
    });
  });
});
</script>

<template>
  <section
    class="swiper swiper-services reveal"
    aria-labelledby="services-heading"
    role="region"
  >
    <h2 id="services-heading" class="visually-hidden">Our Services</h2>
    <div class="swiper-wrapper" v-if="isDataLoaded" aria-busy="false">
      <div
        v-for="service in state.services"
        :key="service._id"
        class="swiper-slide"
        role="group"
        :aria-labelledby="`service-${service._id}`"
      >
        <galleryItem
          :img="service._id"
          :opacity="0.5"
          :url="`/services/${service._id}`"
          :title="`${service._id}`"
          :alt="`${service._id} services cover`"
          :desc="service.desc"
          :icon="service.icon"
        />
      </div>
    </div>
    <div class="swiper-pagination" v-if="isDataLoaded" aria-busy="false"></div>

    <skeletonSwiper v-else aria-busy="true"></skeletonSwiper>
  </section>
</template>

<style scoped>
.swiper-services {
  padding-bottom: calc(var(--grid-gap-2) * 2);
}

@media only screen and (max-width: 400px) {
  .gallery-item {
    aspect-ratio: 1/1;
  }
}
</style>
