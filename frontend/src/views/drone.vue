<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import eventBus from "@/functions/eventBus";
import image from "@/modules/images";
import services from "@/modules/services";

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
// SHOW MORE END

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
    await Promise.all([getSpecificService("drone"), getAllImages("drone")]);
    isDataLoaded.value = true;
  } catch (error) {}
});

watch(isDataLoaded, (loaded) => {
  if (loaded) initializeLightbox();
});

const showRequestAProposal = (data: any) => {
  eventBus.emit("showRequestAProposal", data);
};

router.beforeEach((to, from, next) => {
  if ($.magnificPopup.instance.isOpen) {
    $.magnificPopup.close();
  }
  next();
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
            <button
              @click="showRequestAProposal(gallery)"
              class="popup-with-form reveal"
              id="request-a-proposal-button"
            >
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
                <svg class="flag note">
                  <use :xlink:href="`#${flag}`"></use>
                </svg>
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
          <button
            @click="showRequestAProposal(gallery)"
            class="popup-with-form reveal"
            id="request-a-proposal-button"
          >
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
          <button
            @click="showRequestAProposal(gallery)"
            class="popup-with-form reveal"
            id="request-a-proposal-button"
          >
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
  </article>
</template>
