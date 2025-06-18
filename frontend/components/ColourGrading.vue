<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";

interface SlideData {
  _id: string;
  log?: string;
  leftImage?: string;
  rightImage?: string;
  leftAlt?: string;
  rightAlt?: string;
  leftTitle?: string;
  rightTitle?: string;
}

interface Props {
  apiEndpoint?: string;
  customSlides?: SlideData[];
  leftLabel?: string;
  rightLabel?: string;
  leftImageSuffix?: string;
  rightImageSuffix?: string;
  direction?: "horizontal" | "vertical";
  speed?: number;
}

const props = withDefaults(defineProps<Props>(), {
  apiEndpoint: "https://api.slavic.media/slide",
  leftLabel: "Before",
  rightLabel: "Colour Graded",
  leftImageSuffix: "-2",
  rightImageSuffix: "",
  direction: "vertical",
  speed: 600,
});

// Fetch documents only if no custom slides provided and API endpoint is given
const {
  data: apiSlides,
  pending,
  error,
} = props.customSlides
  ? { data: ref(null), pending: ref(false), error: ref(null) }
  : await useFetch<SlideData[]>(props.apiEndpoint);

// Use custom slides or API slides
const slides = computed(() => props.customSlides || apiSlides.value || []);

const updateImageSrc = (event: Event) => {
  const target = event.target as HTMLImageElement;
  if (target.src !== target.dataset.src) {
    target.src = target.dataset.src!;
  }
};

// Helper to handle cached images
const checkIfAlreadyLoaded = (imgRef: HTMLImageElement | null) => {
  if (imgRef && imgRef.complete && imgRef.src !== imgRef.dataset.src) {
    imgRef.src = imgRef.dataset.src!;
  }
};

// Generate image URLs
const getImageUrl = (
  slide: SlideData,
  type: "left" | "right",
  quality: "thumbnail" | "fullHD"
) => {
  if (type === "left" && slide.leftImage) {
    return slide.leftImage;
  }
  if (type === "right" && slide.rightImage) {
    return slide.rightImage;
  }

  // Fallback to default CDN pattern
  const suffix =
    type === "left" ? props.leftImageSuffix : props.rightImageSuffix;
  return `https://cdn.slavic.media/img/${slide._id}${suffix}/${quality}`;
};

// Generate alt and title text
const getAltText = (slide: SlideData, type: "left" | "right") => {
  if (type === "left" && slide.leftAlt) return slide.leftAlt;
  if (type === "right" && slide.rightAlt) return slide.rightAlt;

  const label = type === "left" ? props.leftLabel : props.rightLabel;
  return `${label} ${slide._id}`;
};

const getTitleText = (slide: SlideData, type: "left" | "right") => {
  if (type === "left" && slide.leftTitle) return slide.leftTitle;
  if (type === "right" && slide.rightTitle) return slide.rightTitle;

  return getAltText(slide, type);
};

let removeArrowNavigation: () => void;

onMounted(() => {
  nextTick(() => {
    const swiper = new Swiper(".swiper-colour-grading", {
      loop: true,
      speed: props.speed,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      lazyPreloadPrevNext: 1,
      observer: true,
      observeParents: true,
      direction: props.direction,
    });

    removeArrowNavigation = useArrowNavigation(swiper);

    // Check all images for cached state after mount
    document
      .querySelectorAll<HTMLImageElement>(".swiper-colour-grading img")
      .forEach((img) => {
        checkIfAlreadyLoaded(img);
      });
  });
});

onUnmounted(() => {
  if (removeArrowNavigation) {
    removeArrowNavigation();
  }
});
</script>

<template>
  <section
    class="swiper swiper-colour-grading reveal"
    v-if="!pending && !error && slides.length > 0"
    aria-labelledby="image-compare-heading"
  >
    <h2 id="image-compare-heading" class="visually-hidden">
      Image Comparison Carousel
    </h2>
    <div class="swiper-wrapper" aria-busy="false">
      <!-- Slide -->
      <figure
        class="swiper-slide"
        v-for="(slide, index) in slides"
        :key="index"
      >
        <ImageCompare aria-label="Compare Images">
          <template #left>
            <Label :label="slide.log || leftLabel" class="note" />
            <Label
              :label="rightLabel"
              class="note"
              style="left: var(--grid-gap-1)"
            />

            <img
              :src="getImageUrl(slide, 'left', 'thumbnail')"
              :data-src="getImageUrl(slide, 'left', 'fullHD')"
              :alt="getAltText(slide, 'left')"
              :title="getTitleText(slide, 'left')"
              @load="updateImageSrc"
            />
          </template>
          <template #right>
            <img
              :src="getImageUrl(slide, 'right', 'thumbnail')"
              :data-src="getImageUrl(slide, 'right', 'fullHD')"
              :alt="getAltText(slide, 'right')"
              :title="getTitleText(slide, 'right')"
              @load="updateImageSrc"
            />
          </template>
        </ImageCompare>
      </figure>
    </div>
    <div class="swiper-pagination" aria-busy="false"></div>
  </section>
  <SkeletonServices v-else-if="pending" />
  <div v-else-if="error" class="error-message">
    Failed to load comparison images
  </div>
</template>

<style scoped>
.swiper {
  border-radius: var(--border-radius-1);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  aspect-ratio: 16/9;
}
img {
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center center;
  object-position: center center;
}
.p-imagecompare {
  height: 100%;
}
.error-message {
  padding: var(--grid-gap-2);
  text-align: center;
  color: var(--color-text-secondary);
}
</style>
