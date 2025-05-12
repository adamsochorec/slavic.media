<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import { useSwiperAutoplay } from "@/composables/useSwiperAutoplay";

interface Service {
  id: string;
  title: string;
  icon: string;
  description?: string;
}
interface FurtherServices {
  services: Service[];
  swiperClass: string;
}
const props = defineProps<FurtherServices>();

onMounted(() => {
  const swiper = new Swiper(".swiper-further-services", {
    loop: false,
    speed: 600,
    autoplay: { delay: 2000, pauseOnMouseEnter: true },
    spaceBetween: 15,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: false,
    },
    observer: true,
    observeParents: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      550: {
        slidesPerView: 2.25,
      },
      1000: {
        slidesPerView: 2.75,
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
      <figure
        v-for="service in services"
        :key="service.id"
        role="group"
        class="swiper-slide"
        :aria-labelledby="`service-${service.id}`"
      >
        <LinkCard
          :url="`/${swiperClass}`"
          :title="service.title"
          :icon="service.icon"
          :description="service.description"
        />
      </figure>
    </div>
    <div class="swiper-pagination" aria-busy="false"></div>
  </section>
</template>
<style scoped lang="postcss">
.swiper {
  padding-bottom: calc(var(--grid-gap-2) * 3);
}
</style>
