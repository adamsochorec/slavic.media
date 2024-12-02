<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import $ from "jquery";
import video from "@/modules/video";
import eventBus, { EventBus } from "@/eventBus";
import requestAProposal from "@/components/request-a-proposal.vue";
import swiperReels from "@/components/swiper-reels.vue";
import galleryItem from "@/components/gallery-item.vue";

const { state, getAllGalleries } = video();
const isDataLoaded = ref<boolean>(false);

onMounted(async () => {
  await getAllGalleries();
  isDataLoaded.value = true;

  nextTick(() => {
    document.querySelectorAll<HTMLElement>(".gallery").forEach((gallery) => {
      $(gallery).magnificPopup({
        delegate: "a",
        type: "iframe",
        gallery: {
          enabled: "true",
          navigateByImgClick: "false",
          fixedContentPos: "false",
          overflowY: "scroll",
          preload: [0, 1],
          arrowMarkup:
            '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
          tPrev: "Previous",
          tNext: "Next",
        },
        zoom: {
          enabled: "true",
          duration: 300,
        },
      });
    });
  });
});

const showRequestAProposal = (data: Gallery): void => {
  (eventBus as EventBus).emit("showRequestAProposal", data);
};
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide">
      <!-- PAGE INTRO -->
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            <span class="gradient">Video</span>
            Services
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision.
          </p>
        </div>
      </div>

      <div v-if="isDataLoaded">
        <!-- GALLERY -->
        <div v-for="gallery in state.galleries" :key="gallery._id">
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
            <hr class="reveal semi" role="separator" />
          </div>

          <!-- GALLERY ITEMS -->
          <div class="gallery" aria-label="Video Gallery">
            <galleryItem
              v-for="video in gallery.videos"
              :key="video._id"
              :img="video._id"
              icon="video"
              :url="`https://vimeo.com/slavicmedia/${video.url}`"
              :title="video.title"
              :desc="`${video.year} | ${video.client}`"
            />
          </div>
        </div>
        <hr class="reveal" role="separator" />

        <!-- SWIPER GALLERY -->
        <div class="grid-container caption-container">
          <div class="grid-item reveal">
            <h2 class="reveal" aria-label="Engaging Content">
              Engaging <span class="gradient">Content</span>
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
              <div class="cta">
                Request a Proposal<i class="pi pi-arrow-right"></i>
              </div>
            </button>
          </div>
          <div id="content"></div>
        </div>
        <hr class="semi" role="separator" />
        <swiperReels></swiperReels>
      </div>
      <div v-else>
        <hr class="reveal" role="separator" />

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
    </section>
  </article>
</template>

<style lang="scss" scoped></style>
