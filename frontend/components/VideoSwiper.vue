<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import { useSwiperAutoplay } from "@/composables/useSwiperAutoplay";

interface Video {
  src: string;
  title: string;
  muted?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
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
          v-for="video in props.videos"
          :key="video.src"
          class="swiper-slide"
          role="group"
        >
          <YoutubeVideo
            :id="video.src"
            :title="video.title"
            :muted="video.muted ?? true"
            :autoplay="video.autoplay ?? true"
            :loop="video.loop ?? true"
            :controls="video.controls ?? true"
          />
        </figure>
      </div>
      <div class="swiper-pagination" aria-busy="false"></div>
    </section>
  </div>
</template>

<style scoped lang="postcss">
.swiper-video {
  padding-bottom: calc(var(--grid-gap-2) * 2);
  border-radius: 10px;
}
</style>
