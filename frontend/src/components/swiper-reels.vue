<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

// GRID GAP
const gridGap2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-2"
);
const gridGap3 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-3"
);

// Define the type for reel objects
interface Reel {
  id: string;
}

// Define the reels data in an array
const reels = ref<Reel[]>([
  { id: "DBN-8ImodUi" },
  { id: "DBwOfdoKXXH" },
  { id: "DBqXwkhI8nH" },
  { id: "DAVWho7Ifci" },
  { id: "DA8aZ6tIKQt" },
  { id: "DBbHNhHq5nb" },
  { id: "DAqc0r6IQg_" },
  { id: "C1Oo-5rI1qw" },
  { id: "C_IFQXKp4sN" },
  { id: "C_feeHLPhBh" },
  { id: "C_zvEetv0OY" },
  { id: "C_qM6tLu603" },
  { id: "DCFBcKaIp3Z" },
  { id: "DCG1-h3oOqB" },
  { id: "DBvjlmBoAV4" },
  { id: "DCgfmD6IQ4x" },
]);

// Compute the reversed reels array
const reversedReels = computed(() => {
  return [...reels.value].reverse();
});

// Initialize Swiper for the reels section
onMounted(() => {
  new Swiper(".swiper-reels", {
    loop: true,
    speed: 600,
    spaceBetween: parseFloat(gridGap2),
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    preloadImages: false,
    lazyLoading: true,
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
});
</script>

<template>
  <section
    class="swiper swiper-reels reveal"
    aria-labelledby="instagram-reels-heading"
    role="region"
  >
    <h2 id="instagram-reels-heading" class="visually-hidden">
      Instagram Reels
    </h2>
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slide -->
      <div
        v-for="(reel, index) in reversedReels"
        :key="index"
        class="swiper-slide"
      >
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          :href="`https://instagram.com/reel/${reel.id}`"
          class="pi pi-instagram bubble"
        >
          <span class="visually-hidden"
            >View reel {{ index + 1 }} on Instagram</span
          >
        </a>
        <video
          class="video-offload"
          loop
          autoplay
          muted
          preload="auto"
          playsinline
          role="region"
          :aria-label="`Instagram reel ${index + 1}`"
          :src="`https://slavic.media/videos/${reel.id}.mp4`"
        >
          <track kind="captions" srclang="en" label="English captions" />
        </video>
      </div>
    </div>
  </section>
</template>

<style scoped>
.swiper-reels video {
  height: auto;
  width: var(--dimension-2);
  border-radius: var(--border-radius-1);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  -webkit-animation: skeleton-loading 1s linear infinite alternate;
  animation: skeleton-loading 1s linear infinite alternate;
}
.swiper-pagination {
  margin-top: 40px;
}
.pi-instagram {
  position: absolute;
  top: var(--grid-gap-2);
  left: var(--grid-gap-2);
  z-index: 8;
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
