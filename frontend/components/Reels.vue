<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import { useSwiperAutoplay } from "@/composables/useSwiperAutoplay";

// Fetch documents
const {
  data: reels,
  pending,
  error,
} = await useFetch("https://api.slavic.media/reel/");

let removeArrowNavigation: () => void;
let removeSwiperAutoplay: () => void;

onMounted(() => {
  nextTick(() => {
    const swiper = new Swiper(".swiper-reels", {
      loop: true,
      speed: 600,
      spaceBetween: 15,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
      },
      lazyPreloadPrevNext: 1,
      observer: true,
      observeParents: true,
      direction: "horizontal",
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        250: {
          slidesPerView: 1.5,
        },
        300: {
          slidesPerView: 2.25,
        },
        350: {
          slidesPerView: 2.75,
        },
        400: {
          slidesPerView: 3,
        },
        450: {
          slidesPerView: 3.5,
        },
        550: {
          slidesPerView: 4,
        },
        750: {
          slidesPerView: 3.5,
        },
        850: {
          slidesPerView: 4.5,
        },
      },
    });

    // Initialize custom navigation and autoplay logic
    removeArrowNavigation = useArrowNavigation(swiper);
    removeSwiperAutoplay = useSwiperAutoplay(swiper, ".swiper-reels");
  });
});

onUnmounted(() => {
  if (removeArrowNavigation) {
    removeArrowNavigation();
  }
  if (removeSwiperAutoplay) {
    removeSwiperAutoplay();
  }
});
</script>

<template>
  <section
    class="swiper swiper-reels reveal"
    aria-labelledby="instagram-reels-heading"
    role="region"
  >
    <h2 id="instagram-reels-heading" class="visually-hidden">Reels</h2>
    <div v-if="!pending && !error" class="swiper-wrapper" aria-busy="false">
      <figure v-for="(reel, index) in reels" :key="index" class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          :href="`https://${reel.url}`"
          :class="`pi pi-${reel.platform} bubble`"
          :aria-label="`Video on ${reel.platform}`"
        >
        </a>
        <Icon
          v-if="reel.flag"
          :name="`flag:${reel.flag}-4x3`"
          class="note flag"
        />
        <video
          class="video-offload"
          loop
          autoplay
          muted
          preload="auto"
          playsinline
          :src="`https://assets.slavic.media/video/${reel._id}.mp4`"
        >
          <track kind="captions" srclang="en" label="English captions" />
        </video>
        <figcaption class="visually-hidden">
          Reel {{ index + 1 }} on {{ reel.platform }}. Click to view the reel.
        </figcaption>
      </figure>
    </div>
    <div
      v-if="!pending && !error"
      class="swiper-pagination"
      aria-busy="false"
    ></div>

    <div v-else aria-busy="true">
      <SkeletonSwiper />
    </div>
  </section>
</template>

<style scoped lang="postcss">
.swiper-reels {
  padding-bottom: calc(var(--grid-gap-2) * 2);

  video {
    height: auto;
    width: var(--dimension-2);
    border-radius: var(--border-radius-1);
    box-shadow: var(--box-shadow-1);
    animation: skeleton-loading 1s linear infinite alternate;
  }
}
.swiper-pagination {
  margin-top: 40px;
}
.pi-instagram,
.pi-tiktok {
  position: absolute;
  top: var(--grid-gap-1);
  left: var(--grid-gap-1);
  z-index: 8;
}
</style>
