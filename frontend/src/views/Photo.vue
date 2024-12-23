<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import image from "@/modules/images";
import services from "@/modules/services";
import $ from "jquery";
import "magnific-popup";
import eventBus from "@/functions/eventBus";

declare global {
  interface JQueryStatic {
    magnificPopup: any;
  }
}
declare global {
  interface JQuery {
    magnificPopup: any;
  }
}

const isDataLoaded = ref<boolean>(false);
const { state: imageState, getAllImages } = image;
const { state: serviceState, getSpecificService } = services();
const router = useRouter();
// SHOW MORE START
const PHOTOS_INCREMENT = 4;
const photosToShow = ref(PHOTOS_INCREMENT);
const loadMorePhotos = () => {
  photosToShow.value += PHOTOS_INCREMENT;
};
// REQUEST A PROPOSAL ID
const showRequestAProposal = (identifier: string) => {
  eventBus.emit("showRequestAProposal", identifier);
};

async function initializeLightbox(): Promise<void> {
  await nextTick();
  $(".popup-gallery").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: "true",
      fixedContentPos: "false",
      overflowY: "scroll",
      navigateByImgClick: "true",
      preload: [0, 1],
    },
    zoom: {
      enabled: "true",
      duration: 300,
    },
    image: {
      tError: "Error",
      titleSrc: function (item: any) {
        return item.el.attr("title");
      },
    },
    callbacks: {
      elementParse: function (item: any) {
        item.src = item.el.attr("href");
      },
    },
    fixedContentPos: "false",
  });
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

router.beforeEach((to, from, next) => {
  if ($.magnificPopup.instance.isOpen) {
    $.magnificPopup.close();
  }
  next();
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
                :title="image.title"
              >
                <img
                  :src="`https://cdn.slavic.media/images/${image._id}/fit=contain,width=1280,sharpen=100`"
                  :alt="image.alt"
                />
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
      <!-- GALLERY START -->
    </template>
    <!-- LIGHTROOM PRESETS CTA START -->
    <section v-if="isDataLoaded" aria-busy="false">
      <bannerLightroomPresets></bannerLightroomPresets>
    </section>
    <!-- LIGHTROOM PRESETS CTA END -->
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
