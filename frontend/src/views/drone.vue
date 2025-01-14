<script setup lang="ts">
import { ref, onMounted, nextTick, watch, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import eventBus from "@/functions/eventBus";
import image from "@/modules/images";
import services from "@/modules/services";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const isDataLoaded = ref<boolean>(false);
const { state: imageState, getAllImages } = image;
const { state: serviceState, getSpecificService } = services();
const router = useRouter();

// REQUEST A PROPOSAL ID
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
    await Promise.all([getSpecificService("drone"), getAllImages("drone")]);
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
    <!-- PAGE ABSTRACT START -->
    <section class="wrapper-wide">
      <!-- PAGE ABSTRACT START -->
      <div
        class="grid-container caption-container"
        v-if="isDataLoaded"
        aria-busy="false"
      >
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
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
    <!-- PAGE ABSTRACT END -->

    <!-- IMAGES GALLERY START -->
    <template
      v-for="(gallery, galleryKey) in imageState.image"
      :key="galleryKey"
    >
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
      <!-- VIDEO GALLERY -->
      <section v-if="isDataLoaded" aria-busy="false" class="popup-gallery">
        <div class="row">
           <div
            v-for="(column, columnIndex) in gallery.columns"
            :key="columnIndex"
            class="column"
          >
            <div
              v-for="image in column"
              :key="image._id"
              class="reveal"
            >
              <Image
                :_id="image._id"
                :alt="image.alt"
                :title="image.title"
                :flag="image.flag"
                :originalWidth="image.originalWidth"
                :originalHeight="image.originalHeight"
                @update:originalWidth="(width) => image.originalWidth = width"
                @update:originalHeight="(height) => image.originalHeight = height"
              />
            </div>
          </div>
        </div>
       
      </section>
    </template>
    <!-- IMAGES GALLERY END -->
    <section class="wrapper-wide">
      <hr class="reveal" role="separator" />

      <div class="grid-container caption-container">
        <div class="grid-item reveal">
          <h2 class="reveal" aria-label="Engaging Content">
            Future <span class="gradient">Video</span>
          </h2>
        </div>
        <div class="grid-item">
          <p class="reveal">
            Social media reels that capture your brand’s essence—engaging,
            genuine, and designed to resonate with your audience.
          </p>
          <requestAProposal />
          <button @click="showRequestAProposal('drone video')">
            <div class="cta">Request a Proposal</div>
          </button>
        </div>
      </div>
      <hr class="reveal" role="separator" />
      <div class="grid-container caption-container">
        <div class="grid-item reveal">
          <h2 class="reveal" aria-label="Engaging Content">
            Terrain <span class="gradient">Mapping</span>
          </h2>
        </div>
        <div class="grid-item">
          <p class="reveal">
            Social media reels that capture your brand’s essence—engaging,
            genuine, and designed to resonate with your audience.
          </p>
          <requestAProposal />
          <button @click="showRequestAProposal('terrain mapping')">
            <div class="cta">Request a Proposal</div>
          </button>
        </div>
      </div>
    </section>
    <!-- LIGHTROOM PRESETS CTA START -->
    <section v-if="isDataLoaded" aria-busy="false">
      <bannerLightroomPresets></bannerLightroomPresets>
    </section>
    <!-- LIGHTROOM PRESETS CTA END -->
    <hr class="semi" />

    <!-- FURTHER SERVICES START -->
    <div v-if="isDataLoaded" class="wrapper-wide">
      <h3>More of Our <span class="gradient">Services</span></h3>
      <hr class="quater reveal" />
      <swiperServices></swiperServices>
    </div>
    <!-- FURTHER SERVICES END -->
  </article>
</template>

<style lang="scss" scoped>
h1 {
  text-transform: capitalize;
}
</style>
