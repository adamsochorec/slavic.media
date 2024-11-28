<script setup lang="ts">
import { ref, onMounted } from "vue";
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
]);

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
      667: {
        slidesPerView: 3,
      },
      750: {
        slidesPerView: 3.5,
      },
      850: {
        slidesPerView: 4,
      },
    },
  });
});
</script>

<template>
  <section class="swiper swiper-reels reveal">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slide -->
      <div v-for="(reel, index) in reels" :key="index" class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          :href="`https://instagram.com/reel/${reel.id}`"
          class="pi pi-instagram bubble"
        ></a>
        <video
          class="video-offload"
          loop="true"
          autoplay="autoplay"
          muted
          preload="auto"
          aria-label="Instagram Reel"
          playsinline
          role="video"
          aria-describedby="Instagram Reel"
          :src="`https://slavic.media/img/${reel.id}.mp4`"
        ></video>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </section>
</template>

<style scoped>
.swiper-reels video {
  height: auto;
  width: var(--dimension-2);
  border-radius: var(--border-radius-1);
  background-color: rgb(var(--dark-grey-color));
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  -webkit-animation: skeleton-loading 1s linear infinite alternate;
  animation: skeleton-loading 1s linear infinite alternate;
}
.swiper-reels {
  height: 400px;
}
.pi-instagram {
  position: absolute;
  top: var(--grid-gap-2);
  left: var(--grid-gap-2);
}
@media only screen and (max-width: 667px) {
  .swiper-reels video {
    height: var(--dimension-2);
    width: auto;
  }
  .swiper-reels {
    height: 240px;
  }
}
@media only screen and (min-width: 667px) {
  .swiper-reels video {
    height: 356px;
  }
}
</style>
