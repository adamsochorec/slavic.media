<script setup lang="ts">
import { ref, onMounted, nextTick, watch, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import image from "@/modules/images";
import services from "@/modules/services";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import eventBus from "@/functions/eventBus";

const isDataLoaded = ref<boolean>(false);
const { state: imageState, getAllImages } = image;
const { state: serviceState, getSpecificService } = services();
const router = useRouter();

const PHOTOS_INCREMENT = 4;
const photosToShow = ref(PHOTOS_INCREMENT);
const loadMorePhotos = () => {
  photosToShow.value += PHOTOS_INCREMENT;
};

const showRequestAProposal = (identifier: string) => {
  eventBus.emit("showRequestAProposal", identifier);
};

let lightbox;

async function initializeLightbox(): Promise<void> {
  await nextTick();
  lightbox = new PhotoSwipeLightbox({
    gallery: ".popup-gallery",
    children: "a",
    errorMsg: "The photo cannot be loaded",
    pswpModule: () => import("photoswipe"),
    preload: [1, 4],
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
    await Promise.all([getSpecificService("photo"), getAllImages("photo")]);
    isDataLoaded.value = true;
  } catch (error) {}
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

    <template
      v-for="(gallery, galleryKey) in imageState.image"
      :key="galleryKey"
    >
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

            <requestAProposal />
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
            <div
              v-for="image in column.slice(0, photosToShow)"
              :key="image._id"
              class="reveal"
            >
              <a
                :href="`https://cdn.slavic.media/images/${image._id}/fit=contain,width=1280w,sharpen=100`"
                :data-pswp-width="image.originalWidth"
                :data-pswp-height="image.originalHeight"
                :title="image.title"
              >
                <img
                  :src="`https://cdn.slavic.media/images/${image._id}/fit=contain,width=400w,sharpen=100`"
                  :alt="image.alt"
                  @load="
                    (event) => {
                      image.originalWidth = event.target.naturalWidth;
                      image.originalHeight = event.target.naturalHeight;
                    }
                  "
                />
                <div class="hidden-caption-content">{{ image.title }}</div>
                <country-flag :country="image.flag" class="note" size="small" />
              </a>
            </div>
          </div>
        </div>
        <div class="flex-center">
          <button
            v-if="
              photosToShow <
              Math.max(...gallery.columns.map((column) => column.length))
            "
            @click="loadMorePhotos"
            class="cta reveal"
          >
            Show More
          </button>
        </div>
      </section>
      <!-- GALLERY END -->
    </template>
    <!-- LIGHTROOM PRESETS CTA START -->

    <section v-if="isDataLoaded" aria-busy="false">
      <bannerLightroomPresets></bannerLightroomPresets>
    </section>
    <!-- LIGHTROOM PRESETS CTA END -->
    <!-- FURTHER SERVICES START -->
    <furtherServices
      v-if="isDataLoaded"
      :excludeServiceId="serviceState.service?._id"
    />
    <!-- FURTHER SERVICES END -->
    <!-- SKELETON START -->
    <div class="wrapper-wide" v-else aria-busy="true" aria-live="polite">
      <skeletonServices></skeletonServices>
    </div>
    <!-- SKELETON END -->
  </article>
</template>

<style lang="scss" scoped>
h1 {
  text-transform: capitalize;
}
</style>
