<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import reel from "@/composables/modules/reel";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import { useSwiperAutoplay } from "@/composables/useSwiperAutoplay";

interface Reel {
  _id: string;
  platform: string;
  url: string;
  flag?: string;
}

const isDataLoaded = ref(false);
const { state, getAllReels } = reel();

let removeArrowNavigation: () => void;
let removeSwiperAutoplay: () => void;

onMounted(async () => {
  await getAllReels();
  isDataLoaded.value = true;

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
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper" v-if="isDataLoaded" aria-busy="false">
      <!-- Slide -->
      <div
        v-for="(reel, index) in state.reels"
        :key="index"
        class="swiper-slide"
      >
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          :href="`https://${reel.url}`"
          :class="`pi pi-${reel.platform} bubble`"
        >
          <span class="visually-hidden"
            >View reel {{ index + 1 }} on {{ reel.platform }}</span
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
          role="region"
          :src="`https://assets.slavic.media/video/${reel._id}.mp4`"
        >
          <track kind="captions" srclang="en" label="English captions" />
        </video>
      </div>
    </div>
    <div class="swiper-pagination" v-if="isDataLoaded" aria-busy="false"></div>

    <SkeletonSwiper v-else aria-busy="true" />
  </section>
</template>

<style scoped lang="scss">
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
