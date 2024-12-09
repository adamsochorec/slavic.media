<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import requestAProposal from "@/components/request-a-proposal.vue";
import eventBus from "@/eventBus";
import bannerLightroomPresets from "@/components/banner-lightroom-presets.vue";
import skeletonServices from "@/components/skeleton-services.vue";
import $ from "jquery";
import "magnific-popup";
import flags from "@/components/flags.vue";
import image from "@/modules/images";
import services from "@/modules/services";

const isDataLoaded = ref<boolean>(false);
const { state: imageState, getAllImages } = image;
const { state: serviceState, getSpecificService } = services();
const router = useRouter();

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
    await Promise.all([getSpecificService("photo"), getAllImages()]);
    isDataLoaded.value = false;
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
    <section class="wrapper-wide">
      <!-- PAGE INTRO -->
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
    <!-- GALLERIES -->
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
              <div class="cta">
                Request a Proposal<i class="pi pi-arrow-right"></i>
              </div>
            </button>
          </div>
        </div>
        <br />
      </section>

      <section v-if="isDataLoaded" aria-busy="false" class="popup-gallery">
        <div class="row">
          <div
            v-for="(column, columnIndex) in gallery.columns"
            :key="columnIndex"
            class="column"
          >
            <div v-for="image in column" :key="image._id" class="reveal">
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
      </section>
    </template>
    <section v-if="isDataLoaded" aria-busy="false">
      <bannerLightroomPresets></bannerLightroomPresets>
    </section>
    <div class="wrapper-wide" v-else aria-busy="true" aria-live="polite">
      <skeletonServices></skeletonServices>
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
  background-color: rgb(var(--dark-grey-color));
  border-radius: var(--border-radius-1);
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
