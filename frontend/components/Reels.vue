<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import { useSwiperAutoplay } from "@/composables/useSwiperAutoplay";

interface reel {
  id: string;
  platform: string;
  url: string;
  flag?: string;
}
const reels = ref<reel[]>([
  {
    id: "DHqq19cqgjv",
    platform: "instagram",
    url: "instagram.com/reel/DHqq19cqgjv",
  },
  {
    id: "DHF7hoXKfiP",
    platform: "instagram",
    url: "instagram.com/reel/DHF7hoXKfiP",
    flag: "fi",
  },
  {
    id: "DFpNgRkqkNY",
    platform: "instagram",
    url: "instagram.com/reel/DFpNgRkqkNY",
    flag: "cz",
  },
  {
    id: "DBN-8ImodUi",
    platform: "instagram",
    url: "instagram.com/reel/DBN-8ImodUi",
    flag: "fi",
  },
  {
    id: "DBwOfdoKXXH",
    platform: "instagram",
    url: "instagram.com/reel/DBwOfdoKXXH",
    flag: "de",
  },
  {
    id: "DBqXwkhI8nH",
    platform: "instagram",
    url: "instagram.com/reel/DBqXwkhI8nH",
    flag: "no",
  },
  {
    id: "7447867670269070614",
    platform: "tiktok",
    url: "tiktok.com/@timetravelsclub/video/7447867670269070614",
    flag: "fi",
  },
  {
    id: "DAVWho7Ifci",
    platform: "instagram",
    url: "instagram.com/reel/DAVWho7Ifci",
    flag: "fi",
  },
  {
    id: "DA8aZ6tIKQt",
    platform: "instagram",
    url: "instagram.com/reel/DA8aZ6tIKQt",
    flag: "no",
  },
  {
    id: "DBbHNhHq5nb",
    platform: "instagram",
    url: "instagram.com/reel/DBbHNhHq5nb",
    flag: "no",
  },
  {
    id: "7444927612696136982",
    platform: "tiktok",
    url: "tiktok.com/@timetravelsclub/video/7444927612696136982",
    flag: "se",
  },
  {
    id: "C1Oo-5rI1qw",
    platform: "instagram",
    url: "instagram.com/reel/C1Oo-5rI1qw",
    flag: "se",
  },
  {
    id: "C_IFQXKp4sN",
    platform: "instagram",
    url: "instagram.com/reel/C_IFQXKp4sN",
    flag: "no",
  },
  {
    id: "C_feeHLPhBh",
    platform: "instagram",
    url: "instagram.com/reel/C_feeHLPhBh",
    flag: "fi",
  },
  {
    id: "C_zvEetv0OY",
    platform: "instagram",
    url: "instagram.com/reel/C_zvEetv0OY",
    flag: "no",
  },
  {
    id: "7441514567575948577",
    platform: "tiktok",
    url: "tiktok.com/@timetravelsclub/video/7441514567575948577",
    flag: "fi",
  },
  {
    id: "DCFBcKaIp3Z",
    platform: "instagram",
    url: "instagram.com/reel/DCFBcKaIp3Z",
    flag: "se",
  },
  {
    id: "7438579976082918688",
    platform: "tiktok",
    url: "tiktok.com/@timetravelsclub/video/7438579976082918688",
    flag: "fi",
  },
  {
    id: "DBvjlmBoAV4",
    platform: "instagram",
    url: "instagram.com/reel/DBvjlmBoAV4",
    flag: "fi",
  },
  {
    id: "DCgfmD6IQ4x",
    platform: "instagram",
    url: "instagram.com/reel/DCgfmD6IQ4x",
    flag: "fi",
  },
  {
    id: "DDhGm_Fo5eg",
    platform: "instagram",
    url: "instagram.com/reel/DDhGm_Fo5eg",
    flag: "fi",
  },
]);

// Initialize Swiper
onMounted(() => {
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
  const removeArrowNavigation = useArrowNavigation(swiper);
  const removeSwiperAutoplay = useSwiperAutoplay(swiper, ".swiper-reels");

  onUnmounted(() => {
    removeArrowNavigation();
    removeSwiperAutoplay();
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
      <div v-for="(reel, index) in reels" :key="index" class="swiper-slide">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          :href="`https://${reel.url}`"
          :class="`pi pi-${reel.platform} bubble`"
        >
          <span class="visually-hidden"
            >View reel {{ index + 1 }} on Instagram</span
          >
        </a>
        <Icon v-if="reel.flag" :name="`cif:${reel.flag}`" class="note flag" />
        <video
          class="video-offload"
          loop
          autoplay
          muted
          preload="auto"
          playsinline
          role="region"
          :src="`https://assets.slavic.media/video/${reel.id}.mp4`"
        >
          <track kind="captions" srclang="en" label="English captions" />
        </video>
      </div>
    </div>
    <div class="swiper-pagination" aria-busy="false"></div>
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
