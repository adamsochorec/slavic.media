<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import { useSwiperAutoplay } from "@/composables/useSwiperAutoplay";
import $ from "jquery";
import "magnific-popup";

const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
});

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
        dynamicBullets: true,
      },
      preloadImages: false,
      lazyLoading: true,
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

    // Initialize Magnific Popup
    $(".swiper-video").magnificPopup({
      delegate: "a",
      type: "iframe",
      gallery: {
        enabled: true,
        navigateByImgClick: false,
        fixedContentPos: false,
        overflowY: "scroll",
        preload: [0, 1],
      },
      zoom: {
        enabled: true,
        duration: 300,
      },
    });

    onUnmounted(() => {
      removeArrowNavigation();
      removeSwiperAutoplay();
    });
  });
});
</script>

<template>
  <div v-if="videos && videos.length > 0">
    <hr class="reveal" />
    <h2 class="visually-hidden" id="video-gallery-title">Video Gallery</h2>

    <section
      class="swiper swiper-video reveal"
      aria-labelledby="services-heading"
      role="region"
    >
      <h2 id="services-heading" class="visually-hidden">Our Services</h2>
      <div class="swiper-wrapper" aria-busy="false">
        <div
          v-for="video in videos"
          :key="video._id"
          class="swiper-slide"
          role="group"
          :aria-labelledby="`service-${video._id}`"
        >
          <galleryItem
            :flag="video.flag"
            :img="`${video._id}`"
            icon="video"
            :url="`https://vimeo.com/${video.url}`"
            :title="video.title"
            :opacity="video.opacity"
            :desc="`${video.desc} ⋅ ${video.year}`"
            :alt="video.title"
          />
        </div>
      </div>
      <div class="swiper-pagination" aria-busy="false"></div>
    </section>
  </div>
</template>

<style scoped>
.swiper-video {
  padding-bottom: calc(var(--grid-gap-2) * 2);
}
</style>
