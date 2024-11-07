<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import contactForm from "@/components/contact-form.vue";
import $ from "jquery";
import "magnific-popup";
import useImgCrud from "@/modules/imgCrud";

const isDataLoaded = ref(false);
const { state, getAllImg } = useImgCrud();

async function initializeLightbox() {
  await nextTick();
  $(".popup-gallery").magnificPopup({
    delegate: "a", // Targets <a> elements directly
    type: "image",
    tLoading: "Loading", // Loading spinner HTML
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      fixedContentPos: "false",
      overflowY: "scroll",
      navigateByImgClick: true,
      preload: [0, 1], // Preloads adjacent images
    },
    zoom: {
      enabled: true,
      duration: 300, // Duration of the zoom animation
    },
    image: {
      tError: "Error", // Error message HTML
      titleSrc: function (item) {
        // Gets the URL of the image for the popup
        return item.el.attr("title");
      },
    },
    callbacks: {
      elementParse: function (item) {
        // Function to handle each image source
        item.src = item.el.attr("href");
      },
    },
    fixedContentPos: "false",
    overflowY: "scroll",
  });
}

onMounted(async () => {
  await getAllImg();
  isDataLoaded.value = true;
});

watch(isDataLoaded, (loaded) => {
  if (loaded) initializeLightbox();
});
</script>

<template>
  <div class="main" style="margin-top: 120px">
    <article v-if="isDataLoaded" class="wrapper-wide">
      <contactForm />

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
          <a class="popup-with-form reveal" href="#request-a-proposal">
            <div class="cta">
              Request a Proposal <i class="pi pi-arrow-right"></i>
            </div>
          </a>
        </div>
      </div>
    </article>
    <!-- GALLERIES -->
    <template
      v-if="isDataLoaded"
      v-for="(gallery, galleryKey) in state.img"
      :key="galleryKey"
    >
      <article v-if="isDataLoaded" class="wrapper-wide" id="photo">
        <hr class="reveal" role="separator" />
        <div class="grid-container caption-container">
          <div class="grid-item reveal">
            <h2>{{ gallery.title }}</h2>
          </div>
          <div class="grid-item">
            <p class="reveal">{{ gallery.desc }}</p>
          </div>
        </div>
        <hr class="semi" role="separator" />
      </article>

      <article v-if="isDataLoaded" class="popup-gallery">
        <div class="row">
          <div
            v-for="(column, columnIndex) in gallery.columns"
            :key="columnIndex"
            class="column"
          >
            <div v-for="image in column" :key="image._id" class="reveal">
              <a
                :href="`https://slavic.media/img/${image._id}.jpg`"
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
      </article>
    </template>
    <div class="wrapper-wide" v-else>
      <div class="flex flex-wrap">
        <div class="w-full xl:w-6/12 p-4">
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
        <div class="w-full xl:w-6/12 p-4">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            height="4rem"
            class="mb-2"
          ></Skeleton>

          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            width="10rem"
            class="mb-10"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            width="10rem"
            height="2rem"
            borderRadius="16px"
          ></Skeleton>
        </div>
      </div>
      <div class="flex justify-between mt-4">
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
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          width="24%"
          height="200px"
        ></Skeleton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
small a {
  color: rgb(var(--white-color)) !important;
}
.row img {
  height: unset;
  width: unset;
}
.row {
  display: -ms-flexbox; /* IE10 */
  display: -webkit-box;
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
}
.columns {
  display: flex;
  flex-wrap: wrap;
}
.column {
  -ms-flex: 100%; /* IE10 */
  -webkit-box-flex: 100%;
  flex: 100%;
  max-width: 100%;
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
@media only screen and (min-width: 538px) {
  .column {
    -ms-flex: 50%;
    -webkit-box-flex: 50%;
    flex: 50%;
    max-width: 50%;
  }
}
@media only screen and (min-width: 850px) {
  .column {
    -ms-flex: 25%;
    -webkit-box-flex: 25%;
    flex: 25%;
    max-width: 25%;
  }
}
</style>
