<script setup lang="ts">
import { ref, onMounted, nextTick, watch, onBeforeUnmount } from "vue";
import img from "@/composables/modules/img";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { showRequestAProposal } from "@/composables/useRequestProposal";

// Meta SEO
const description =
  "Whether it’s a dynamic performance, a powerful portrait, or the vast outdoors, our photography captures authentic moments, rich in colour and emotion, that tell your story.";
const title = "Photo";

const isDataLoaded = ref<boolean>(false);
const { state: imgState, getAllImgs } = img;

// Further services matrix
const videoServices = [
  { id: "commercial", title: "Commercial" },
  { id: "colour-grading", title: "colour grading" },
  { id: "content", title: "content" },
  { id: "sound-edit", title: "sound edit" },
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
    await getAllImgs();
    isDataLoaded.value = true;

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
    console.error("Error loading images:", error);
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
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="ogTitle" :content="title" />
    <Meta name="description" :content="description" />
    <Meta name="ogDescription" :content="description" />
    <Meta name="ogImage" content="https.//cdn.slavic.media/img/photo/sd" />
  </Head>
  <main style="margin-top: 120px">
    <!-- PAGE ABSTRACT START-->
    <section class="wrapper-wide">
      <div
        class="grid-container caption-container"
        v-if="isDataLoaded"
        aria-busy="false"
      >
        <div class="grid-item">
          <h1 class="reveal" aria-label="Photo Services">
            <span class="gradient"> Photo </span>
            Services
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            Whether it’s a dynamic performance, a powerful portrait, or the vast
            outdoors, our photography captures authentic moments, rich in colour
            and emotion, that tell your story.
          </p>
        </div>
      </div>
    </section>
    <!-- PAGE ABSTRACT START-->
    <template v-for="(gallery, galleryKey) in imgState.img" :key="galleryKey">
      <!-- GALLERY ABSTRACT START -->
      <article
        v-if="isDataLoaded"
        aria-busy="false"
        class="wrapper-wide"
        id="photo"
        :aria-labelledby="`gallery-heading-${galleryKey}`"
      >
        <div :id="gallery._id"></div>
        <hr class="reveal" role="separator" />
        <div class="grid-container caption-container">
          <div class="grid-item reveal">
            <h2 :id="`gallery-heading-${galleryKey}`">
              {{ gallery.title.split(" ")[0] }}
              <span class="gradient">{{ gallery.title.split(" ")[1] }}</span>
            </h2>
          </div>
          <div class="grid-item">
            <p class="reveal">{{ gallery.description }}</p>
            <Btn
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
        v-if="isDataLoaded"
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
    <section v-if="isDataLoaded" aria-busy="false">
      <LightroomPresets />
    </section>
    <!-- LIGHTROOM PRESETS END -->
    <hr class="semi" />
    <!-- FURTHER SERVICES START -->
    <section
      id="services"
      v-if="isDataLoaded"
      class="wrapper-wide"
      aria-labelledby="video-services-heading"
    >
      <h3 id="video-services-heading">
        Discover our <span class="gradient">video</span> services
      </h3>
      <hr class="quater reveal" />
      <FurtherServices :services="videoServices" swiperClass="video" />
    </section>
    <!-- FURTHER SERVICES END -->
    <!-- SKELETON START -->
    <div class="wrapper-wide" v-else aria-busy="true" aria-live="polite">
      <SkeletonServices />
    </div>
    <!-- SKELETON END -->
  </main>
</template>

<style lang="scss" scoped>
h1 {
  text-transform: capitalize;
}
.lightbox {
  padding: 0 var(--homepage-padding) 0 var(--homepage-padding);
}
</style>
