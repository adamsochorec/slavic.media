<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import { useSwiperAutoplay } from "@/composables/useSwiperAutoplay";

interface BlogSwiperProps {
  media: string[];
}

const props = defineProps<BlogSwiperProps>();

onMounted(() => {
  nextTick(() => {
    const swiper = new Swiper(".swiper-video", {
      loop: false,
      speed: 600,
      autoplay: { delay: 2000, pauseOnMouseEnter: true },
      spaceBetween: 15,
      observer: true,
      observeParents: true,
      breakpoints: {
        0: {
          slidesPerView: 1.1,
        },
        550: {
          slidesPerView: 2.1,
        },
        1000: {
          slidesPerView: 2.1,
        },
      },
      direction: "horizontal",
    });

    const removeArrowNavigation = useArrowNavigation(swiper);
    const removeSwiperAutoplay = useSwiperAutoplay(swiper, ".swiper-video");

    onUnmounted(() => {
      removeArrowNavigation();
      removeSwiperAutoplay();
    });
  });
});
</script>

<template>
  <div>
    <section
      class="swiper swiper-video reveal"
      aria-labelledby="services-heading"
      role="region"
    >
      <div class="swiper-wrapper" aria-busy="false">
        <div
          v-for="(item, idx) in media"
          :key="idx"
          class="swiper-slide"
          role="group"
        >
          <div v-html="item"></div>
        </div>
      </div>
    </section>
  </div>
</template>
