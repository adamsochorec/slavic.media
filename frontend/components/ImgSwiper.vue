<script setup lang="ts">
import { computed, onMounted, onUnmounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import { useSwiperAutoplay } from "@/composables/useSwiperAutoplay";

interface ImgSwiperProps {
  media: string[];
}

const props = defineProps<ImgSwiperProps>();

const parsedMedia = computed(() =>
  props.media.map((item) => {
    const match = item.match(/^(\S+)\s+"([^"]+)"$/);
    if (match) {
      return { _id: match[1], alt: match[2] };
    }
    return { _id: item.trim(), alt: "" };
  }),
);

let removeArrowNavigation: () => void;
let removeSwiperAutoplay: () => void;

onMounted(() => {
  nextTick(() => {
    const swiper = new Swiper(".swiper-blog-img", {
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

    removeArrowNavigation = useArrowNavigation(swiper);
    removeSwiperAutoplay = useSwiperAutoplay(swiper, ".swiper-blog-img");
  });
});

onUnmounted(() => {
  if (removeArrowNavigation) removeArrowNavigation();
  if (removeSwiperAutoplay) removeSwiperAutoplay();
});
</script>

<template>
  <section class="swiper swiper-blog-img reveal" role="region">
    <div class="swiper-wrapper">
      <div
        v-for="(item, idx) in parsedMedia"
        :key="idx"
        class="swiper-slide"
        role="group"
      >
        <Img :_id="item._id" :alt="item.alt" :title="item.alt" />
      </div>
    </div>
  </section>
</template>
