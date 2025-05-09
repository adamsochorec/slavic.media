<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import { useSwiperAutoplay } from "@/composables/useSwiperAutoplay";

interface Video {
  src: string;
  title: string;
}
interface VideoSwiper {
  videos: Video[];
}
const props = defineProps<VideoSwiper>();

onMounted(() => {
  nextTick(() => {
    const swiper = new Swiper(".swiper-video", {
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
        <figure
          v-for="video in videos"
          :key="video.url"
          class="swiper-slide"
          role="group"
        >
          <iframe
            :src="`https://${video.src}`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            :title="`${video.title} | Slavic Media`"
          ></iframe>
        </figure>
      </div>
      <div class="swiper-pagination" aria-busy="false"></div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.swiper-video {
  padding-bottom: calc(var(--grid-gap-2) * 2);
  border-radius: 10px;
}
</style>
