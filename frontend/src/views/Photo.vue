<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import requestAProposal from "@/components/request-a-proposal.vue";
import eventBus from "@/eventBus";

import bannerLightroomPresets from "@/components/banner-lightroom-presets.vue";
import $ from "jquery";
import "magnific-popup";
import img from "@/modules/img";

const isDataLoaded = ref(false);
const { state, getAllImg } = img();

async function initializeLightbox() {
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
      titleSrc: function (item) {
        return item.el.attr("title");
      },
    },
    callbacks: {
      elementParse: function (item) {
        item.src = item.el.attr("href");
      },
    },
    fixedContentPos: "false",
  });
}

onMounted(async () => {
  await getAllImg();
  isDataLoaded.value = true;
});

watch(isDataLoaded, (loaded) => {
  if (loaded) initializeLightbox();
});
const showRequestAProposal = (data) => {
  eventBus.emit("showRequestAProposal", data);
};
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide">
      <!-- PAGE INTRO -->
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            <span class="highlited">Photo</span> Services
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            Whether it’s a dynamic performance, a powerful portrait, or the vast
            outdoors, our photography captures authentic moments, rich in detail
            and emotion, that tell your story.
          </p>
        </div>
      </div>
    </section>
    <!-- GALLERIES -->
    <template v-for="(gallery, galleryKey) in state.img" :key="galleryKey">
      <section v-if="isDataLoaded" class="wrapper-wide" id="photo">
        <div :id="gallery._id"></div>
        <hr class="reveal" role="separator" />

        <div class="grid-container caption-container">
          <div class="grid-item reveal">
            <h2>{{ gallery.title }}</h2>
          </div>
          <div class="grid-item">
            <p class="reveal">{{ gallery.desc }}</p>

            <requestAProposal />
            <button
              @click="showRequestAProposal(gallery)"
              class="popup-with-form reveal"
              id="request-a-proposal-button"
            >
              <div class="cta">
                Request a Proposal<i class="pi pi-arrow-right"></i>
              </div>
            </button>
          </div>
        </div>
        <hr class="semi" role="separator" />
      </section>

      <section v-if="isDataLoaded" class="popup-gallery">
        <div class="row">
          <div
            v-for="(column, columnIndex) in gallery.columns"
            :key="columnIndex"
            class="column"
          >
            <div v-for="image in column" :key="image._id" class="reveal">
              <a
                :href="`https://slavic.media/img/hd/${image._id}.jpg`"
                :title="image.title"
              >
                <img
                  :src="`https://slavic.media/img/${image._id}.jpg`"
                  :alt="image.alt"
                />
                <svg class="flag note" :title="'Flag of ' + image.flag">
                  <use :href="'#flag-' + image.flag"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </template>
    <section v-if="isDataLoaded">
      <bannerLightroomPresets></bannerLightroomPresets>
    </section>
    <div class="wrapper-wide" v-else>
      <hr class="reveal" />

      <div class="flex flex-wrap">
        <div class="w-full xl:w-6/12">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            height="2rem"
            class="mb-2"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            height="2rem"
            width="10rem"
            class="mb-2"
          ></Skeleton>
        </div>
        <div class="w-full xl:w-6/12 pl-6">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            height="4rem"
            class="mb-2"
          ></Skeleton>

          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            width="14rem"
            class="mb-6"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            width="10rem"
            height="2rem"
            borderRadius="10px"
          ></Skeleton>
        </div>
      </div>
      <div class="flex justify-between mt-10">
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          width="24%"
          height="200px"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          width="48%"
          height="200px"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          width="24%"
          height="200px"
        ></Skeleton>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
small a {
  color: rgb(var(--white-color)) !important;
}
.row img {
  height: unset;
  width: unset;
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
}
.row {
  display: -ms-flexbox; /* IE10 */
  display: -webkit-box;
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
}
.columns {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.column {
  -ms-flex: 50%;
  -webkit-box-flex: 50%;
  flex: 50%;
  max-width: 50%;
}
.column img {
  margin-top: var(--grid-gap-1);
  vertical-align: middle;
  width: 100%;
}
.column:nth-child(2) {
  padding-left: var(--grid-gap-1);
  padding-right: calc(var(--grid-gap-1) / 2);
}
.column:nth-child(3) {
  padding-right: var(--grid-gap-1);
  padding-left: calc(var(--grid-gap-1) / 2);
}

@media only screen and (min-width: 600px) {
  .column {
    -ms-flex: 25%;
    -webkit-box-flex: 25%;
    flex: 25%;
    max-width: 25%;
  }
}
</style>
