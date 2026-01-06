<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount, computed } from "vue";
import { useMouseTracking } from "@/composables/useMouseTracking";

const { containerRef } = useMouseTracking();
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { showRequestAProposal } from "@/composables/useRequestProposal";

// Meta SEO
const description =
  "Whether it’s a dynamic performance, a powerful portrait, or the vast outdoors, our photography captures authentic moments, rich in colour and emotion, that tell your story.";
const title = "Photo Services";

// SEO META
useSeoMeta(
  {
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    ogImage: "https://cdn.slavic.media/img/2021-05-28-01020-2/SD",
    ogUrl: "https://slavic.media",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: "https://cdn.slavic.media/img/2021-05-28-01020-2/SD",
    twitterCard: "summary",
  },
  { priority: 1 }
);

// Access runtime config
const config = useRuntimeConfig();

// Fetch documents
const {
  data: rawImgState,
  pending,
  error,
} = await useFetch(`${config.public.API_URL}/img`);

// Sort galleries by index
const imgState = computed(() => rawImgState?.value || []);

// Further services matrix
const services = [
  {
    id: "commercial",
    title: "Commercial",
    icon: "chart-line",
    description: "From inspiring stories to cinematic visuals.",
  },
  {
    id: "colour-grading",
    title: "Colour Grading",
    icon: "palette",
    description:
      "Bring your footage to life with our professional video colour grading.",
  },
  {
    id: "content",
    title: "Engaging Content",
    icon: "tiktok",
    description: "Social media reels that capture your brand’s essence.",
  },
  {
    id: "sound-edit",
    title: "Sound Edit",
    icon: "headphones",
    description:
      "Production sound (the dialogue and ambient noises captured during shooting).",
  },
];

let lightbox: PhotoSwipeLightbox | null = null;

async function initializeLightbox(): Promise<void> {
  await nextTick();

  // Custom SVGs for arrows
  const leftArrowSVGString = `
   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="pswp__button--arrow--left">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 12H4m0 0l6-6m-6 6l6 6" />
</svg>`;
  const rightArrowSVGString = `
   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="pswp__button--arrow--right">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
</svg>`;

  lightbox = new PhotoSwipeLightbox({
    gallery: ".lightbox",
    children: "a",
    errorMsg: "The photo cannot be loaded",
    secondaryZoomLevel: 1.5,
    pswpModule: () => import("photoswipe"),
    wheelToZoom: true,
    padding: {
      top: 0,
      bottom: 40,
      left: 0,
      right: 0,
    },
    preload: [1, 4],
    loop: false,
    arrowPrevSVG: leftArrowSVGString,
    arrowNextSVG: rightArrowSVGString,
    mainClass: "pswp--custom-icon-colors", // Optional custom class for styling
  });
  lightbox.on("uiRegister", function () {
    lightbox.pswp.ui.registerElement({
      name: "custom-caption",
      order: 9,
      isButton: false,
      appendTo: "root",
      html: "Caption text",
      onInit: (el, pswp) => {
        lightbox.pswp.on("change", () => {
          const currSlideElement = lightbox.pswp.currSlide.data.element;
          let captionHTML = "";
          if (currSlideElement) {
            const hiddenCaption = currSlideElement.querySelector(
              ".hidden-caption-content"
            );
            if (hiddenCaption) {
              captionHTML = hiddenCaption.innerHTML;
            } else {
              captionHTML = currSlideElement
                .querySelector("img")
                .getAttribute("alt");
            }
          }
          el.innerHTML = captionHTML || "";
        });
      },
    });
  });

  lightbox.init();
}

onMounted(async () => {
  try {
    initializeLightbox();

    // Handle hash scrolling
    nextTick(() => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  } catch (error) {
    console.error("Error initializing lightbox:", error);
  }
});

onBeforeUnmount(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});
</script>

<template>
  <main style="margin-top: 120px">
    <!-- PAGE ABSTRACT START -->
    <section class="wrapper-wide">
      <div
        class="grid-container caption-container"
        v-if="!pending && !error"
        aria-busy="false"
      >
        <div class="grid-item reveal">
          <h1 class="docs" aria-label="Photo Services">
            <span class="gradient"> Photo </span>
            Services
          </h1>
        </div>
        <div class="grid-item reveal">
          <p>
            Whether it’s a dynamic performance, a powerful portrait, or the vast
            outdoors, our photography captures authentic moments, rich in colour
            and emotion, that tell your story.
          </p>
        </div>
      </div>
    </section>
    <!-- PAGE ABSTRACT END -->

    <template v-for="(gallery, galleryKey) in imgState" :key="galleryKey">
      <!-- GALLERY ABSTRACT START -->
      <article
        v-if="!pending && !error"
        aria-busy="false"
        class="wrapper-wide"
        id="photo"
        :aria-labelledby="`gallery-heading-${galleryKey}`"
      >
        <div :id="gallery._id"></div>
        <hr class="reveal" role="separator" />
        <div class="grid-container caption-container">
          <div class="grid-item reveal">
            <h2 class="docs" :id="`gallery-heading-${galleryKey}`">
              {{ gallery.title.split(" ")[0] }}
              <span class="gradient">{{ gallery.title.split(" ")[1] }}</span>
            </h2>
          </div>
          <div class="grid-item reveal">
            <p>{{ gallery.description }}</p>
            <Button
              tag="button"
              label="Request a proposal"
              icon="arrow-right"
              variant="primary"
              @click="showRequestAProposal(gallery._id)"
            />
          </div>
        </div>
        <br />
      </article>
      <!-- GALLERY ABSTRACT END -->

      <!-- GALLERY START -->
      <section
        v-if="!pending && !error"
        aria-busy="false"
        class="lightbox"
        :aria-labelledby="`gallery-heading-${galleryKey}`"
      >
        <div class="row">
          <div
            v-for="(column, columnIndex) in gallery.columns"
            :key="columnIndex"
            class="column"
          >
            <div v-for="img in column" :key="img._id" class="reveal">
              <Img
                :_id="img._id"
                :alt="img.alt"
                :title="img.title"
                :flag="img.flag"
                :originalWidth="img.originalWidth"
                :originalHeight="img.originalHeight"
                @update:originalWidth="(width) => (img.originalWidth = width)"
                @update:originalHeight="
                  (height) => (img.originalHeight = height)
                "
              />
            </div>
          </div>
        </div>
      </section>
      <!-- GALLERY END -->
    </template>

    <!-- LIGHTROOM PRESETS START -->
    <section v-if="!pending && !error" aria-busy="false">
      <LightroomPresets />
    </section>
    <!-- LIGHTROOM PRESETS END -->

    <hr class="semi" />

    <!-- FURTHER SERVICES START -->
    <section
      id="services"
      v-if="!pending && !error"
      class="wrapper-wide reveal"
      aria-labelledby="video-services-heading"
    >
      <h3 class="docs" id="video-services-heading">
        Discover our <span class="gradient">video</span> services
      </h3>
      <div class="gallery" id="cards" ref="containerRef">
        <LinkCard
          v-for="service in services"
          :key="service.id"
          :url="`/video#${service.id}`"
          :title="service.title"
          :icon="service.icon"
          :description="service.description"
        />
      </div>
      <hr class="semi" role="separator" />
    </section>
    <!-- FURTHER SERVICES END -->

    <!-- SKELETON START -->
    <div class="wrapper-wide" v-else aria-busy="true" aria-live="polite">
      <SkeletonServices />
    </div>
    <!-- SKELETON END -->
  </main>
</template>

<style lang="postcss" scoped>
h1 {
  text-transform: capitalize;
}
.lightbox {
  padding: 0 var(--homepage-padding) 0 var(--homepage-padding);
}

@media only screen and (min-width: 415px) {
  h1.docs,
  h2.docs {
    padding-bottom: unset;
    border-bottom: unset;
    margin-bottom: unset;
  }
}
@media only screen and (max-width: 415px) {
  h2.docs {
    margin-top: calc(2 * var(--grid-gap-3));
  }
  #photo hr {
    display: none;
  }
}
.gallery {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: var(--grid-gap-2);
  padding-bottom: var(--grid-gap-3);
  margin-bottom: -var(--grid-gap-3);

  @media only screen and (min-width: 690px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
