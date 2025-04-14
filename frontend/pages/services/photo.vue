<script setup lang="ts">
import { ref, onMounted, nextTick, watch, onBeforeUnmount } from "vue";
import img from "@/composables/modules/img";
import services from "@/composables/modules/services";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import eventBus from "@/composables/useEventBus";

useSeoMeta({
  title: "Photo",
  ogTitle: "Photo",
  description:
    "Whether it’s a dynamic performance, a powerful portrait, or the vast outdoors, our photography captures authentic moments, rich in colour and emotion, that tell your story.",
  ogDescription:
    "Whether it’s a dynamic performance, a powerful portrait, or the vast outdoors, our photography captures authentic moments, rich in colour and emotion, that tell your story.",
  ogImage: "https://cdn.slavic.media/img/photo/width=300",
  twitterCard: "summary_large_image",
});

const isDataLoaded = ref<boolean>(false);
const { state: imgState, getAllImgs } = img;
const { state: serviceState, getSpecificService } = services();
const router = useRouter();
const videoServices = [
  { id: "commercial", title: "Commercial" },
  { id: "colour-grading", title: "colour grading" },
  { id: "content", title: "content" },
  { id: "sound-edit", title: "sound edit" },
];
const showRequestAProposal = (identifier: string) => {
  eventBus.emit("showRequestAProposal", identifier);
};
let lightbox: PhotoSwipeLightbox | null = null;

async function initializeLightbox(): Promise<void> {
  await nextTick();
  lightbox = new PhotoSwipeLightbox({
    gallery: ".popup-gallery",
    children: "a",
    errorMsg: "The photo cannot be loaded",
    secondaryZoomLevel: 1.5,
    pswpModule: () => import("photoswipe"),
    wheelToZoom: true,
    preload: [1, 4],
    loop: false,
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
    await Promise.all([getSpecificService("photo"), getAllImgs("photo")]);
    isDataLoaded.value = true;
  } catch (error) {}

  nextTick(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});
watch(isDataLoaded, (loaded) => {
  if (loaded) initializeLightbox();
});
onBeforeUnmount(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <!-- PAGE ABSTRACT START-->
    <section class="wrapper-wide">
      <div
        class="grid-container caption-container"
        v-if="isDataLoaded"
        aria-busy="false"
      >
        <div class="grid-item">
          <h1 class="reveal" aria-label="Photo Services">
            <span class="gradient"> {{ serviceState.service?._id }} </span>
            Services
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            {{ serviceState.service?.desc }}
          </p>
        </div>
      </div>
    </section>
    <!-- PAGE ABSTRACT START-->

    <template v-for="(gallery, galleryKey) in imgState.img" :key="galleryKey">
      <!-- GALLERY ABSTRACT START -->
      <section
        v-if="isDataLoaded"
        aria-busy="false"
        class="wrapper-wide"
        id="photo"
      >
        <div :id="gallery._id"></div>
        <hr class="reveal" role="separator" />
        <div class="grid-container caption-container">
          <div class="grid-item reveal">
            <h2>
              {{ gallery.title.split(" ")[0] }}
              <span class="gradient">{{ gallery.title.split(" ")[1] }}</span>
            </h2>
          </div>
          <div class="grid-item">
            <p class="reveal">{{ gallery.desc }}</p>
            <!-- <RequestProposal /> -->
            <button @click="showRequestAProposal(gallery._id)">
              <div class="cta">Request a Proposal</div>
            </button>
          </div>
        </div>
        <br />
      </section>
      <!-- GALLERY ABSTRACT END -->
      <!-- GALLERY START -->
      <section v-if="isDataLoaded" aria-busy="false" class="popup-gallery">
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
    <!-- LIGHTROOM PRESETS CTA START -->

    <section v-if="isDataLoaded" aria-busy="false">
      <LightroomPresets></LightroomPresets>
    </section>
    <!-- LIGHTROOM PRESETS CTA END -->
    <hr class="semi" />
    <!-- FURTHER SERVICES START -->
    <div id="services" v-if="isDataLoaded" class="wrapper-wide">
      <h3>Discover our <span class="gradient">video</span> services</h3>
      <hr class="quater reveal" />
      <SwiperFurtherServices :services="videoServices" swiperClass="video" />
    </div>

    <!-- FURTHER SERVICES END -->

    <!-- SKELETON START -->
    <div class="wrapper-wide" v-else aria-busy="true" aria-live="polite">
      <SkeletonServices></SkeletonServices>
    </div>
    <!-- SKELETON END -->
  </article>
</template>

<style lang="scss" scoped>
h1 {
  text-transform: capitalize;
}
</style>
