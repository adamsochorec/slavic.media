<script setup>
import { onMounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

// GRID GAP
const gridGap2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-2"
);
const gridGap3 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-3"
);
// Initialize Swiper for the reviews section
const reelsSwiper = new Swiper(".swiper-reels", {
  loop: true,
  speed: 600,
  spaceBetween: gridGap2,
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
  // Optional parameters
  direction: "horizontal",
  loop: true,
});
</script>

<template>
  <section class="swiper swiper-reels reveal">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slide -->
      <div class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.instagram.com/reel/DAVWho7Ifci/"
        >
          <video
            loop="true"
            autoplay="autoplay"
            muted
            preload="auto"
            aria-label="Instagram Video Reel"
            playsinline
            role="video"
            aria-describedby="Instagram Video Description"
            src="https://slavic.media/img/DAVWho7Ifci.mp4"
          ></video>
        </a>
      </div>
      <!-- Slide -->
      <div class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.instagram.com/reel/DA8aZ6tIKQt/"
        >
          <video
            loop="true"
            autoplay="autoplay"
            muted
            preload="auto"
            aria-label="Instagram Video Reel"
            playsinline
            role="video"
            aria-describedby="Instagram Video Description"
            src="https://slavic.media/img/DA8aZ6tIKQt.mp4"
          ></video>
        </a>
      </div>
      <!-- Slide -->
      <div class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.instagram.com/reel/DAqc0r6IQg_/"
        >
          <video
            loop="true"
            autoplay="autoplay"
            muted
            preload="auto"
            aria-label="Instagram Video Reel"
            playsinline
            role="video"
            aria-describedby="Instagram Video Description"
            src="https://slavic.media/img/DAqc0r6IQg_.mp4"
          ></video>
        </a>
      </div>
      <!-- Slide -->
      <div class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.instagram.com/reel/C1Oo-5rI1qw/"
        >
          <video
            loop="true"
            autoplay="autoplay"
            muted
            preload="auto"
            aria-label="Instagram Video Reel"
            playsinline
            role="video"
            aria-describedby="Instagram Video Description"
            src="https://slavic.media/img/C1Oo-5rI1qw.mp4"
          ></video>
        </a>
      </div>
      <!-- Slide -->
      <div class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.instagram.com/reel/C_IFQXKp4sN/"
        >
          <video
            loop="true"
            autoplay="autoplay"
            muted
            preload="auto"
            aria-label="Instagram Video Reel"
            playsinline
            role="video"
            aria-describedby="Instagram Video Description"
            src="https://slavic.media/img/C_IFQXKp4sN.mp4"
          ></video>
        </a>
      </div>
      <!-- Slide -->
      <div class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.instagram.com/reel/C_feeHLPhBh/"
        >
          <video
            loop="true"
            autoplay="autoplay"
            muted
            preload="auto"
            aria-label="Instagram Video Reel"
            playsinline
            role="video"
            aria-describedby="Instagram Video Description"
            src="https://slavic.media/img/C_feeHLPhBh.mp4"
          ></video>
        </a>
      </div>
      <!-- Slide -->
      <div class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.instagram.com/reel/C_zvEetv0OY/"
        >
          <video
            loop="true"
            autoplay="autoplay"
            muted
            preload="auto"
            aria-label="Instagram Video Reel"
            playsinline
            role="video"
            aria-describedby="Instagram Video Description"
            src="https://slavic.media/img/C_zvEetv0OY.mp4"
          ></video>
        </a>
      </div>
      <!-- Slide -->
      <div class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.instagram.com/p/C_qM6tLu603/"
        >
          <video
            loop="true"
            autoplay="autoplay"
            preload="auto"
            muted
            aria-label="Instagram Video Reel"
            playsinline
            role="video"
            aria-describedby="Instagram Video Description"
            src="https://slavic.media/img/C_qM6tLu603.mp4"
          ></video>
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </section>
</template>

<style scoped>
.swiper-reviews .swiper-slide {
  padding: var(--grid-gap-2);
  height: auto !important;
  max-height: 256px;
  width: var(--dimension-2);
  border-radius: var(--border-radius-1);
  background-color: rgb(var(--dark-grey-color));
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
}
.swiper-reviews {
  border-radius: var(--border-radius-1);
  height: 300px;
}
.swiper-reviews p {
  padding: 0;
  font-size: var(--fontsize-note);
}
.swiper-reviews .quotes {
  font-size: 32px;
  color: white;
  padding: 0;
  margin: 0;
}
.swiper-reviews img {
  height: 55px;
  width: 55px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: var(--border-radius-2);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
}
.swiper-reviews .grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: var(--grid-gap-1);
}
.swiper-reviews .rewiews-message {
  margin: var(--grid-gap-1) 0;
}
.swiper-reviews .stars {
  display: inline-block;
  font-size: var(--fontsize-note);
  color: gold;
}
</style>
