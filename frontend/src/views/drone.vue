<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import $ from "jquery";
import eventBus, { EventBus } from "@/eventBus";
import requestAProposal from "@/components/request-a-proposal.vue";
import swiperReels from "@/components/swiper-reels.vue";
import galleryItem from "@/components/gallery-item.vue";
import services from "@/modules/services";
import skeletonServices from "@/components/skeleton-services.vue";
import video from "@/modules/video";
import { useRouter } from "vue-router";

const { state: serviceState, getSpecificService } = services();
const { state: videoState, getAllGalleries } = video();
const isDataLoaded = ref<boolean>(false);
const router = useRouter();

onMounted(async () => {
  await Promise.all([getSpecificService("drone"), getAllGalleries()]);
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
        },
        zoom: {
          enabled: "true",
          duration: 300,
        },
      });
    });
  });
});

router.beforeEach((to, from, next) => {
  if ($.magnificPopup.instance.isOpen) {
    $.magnificPopup.close();
  }
  next();
});

const showRequestAProposal = (data: Gallery): void => {
  (eventBus as EventBus).emit("showRequestAProposal", data);
};
</script>
<template>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide">
      <!-- PAGE INTRO -->
      <div class="grid-container caption-container" v-if="isDataLoaded">
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
      <hr class="reveal" role="separator" />
      <div class="grid-container caption-container">
        <div class="grid-item reveal">
          <h2 class="reveal" aria-label="Engaging Content">
            Breathtaking <span class="gradient">Still</span>
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
      </div>
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
            <div class="cta">
              Request a Proposal<i class="pi pi-arrow-right"></i>
            </div>
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
            <div class="cta">
              Request a Proposal<i class="pi pi-arrow-right"></i>
            </div>
          </button>
        </div>
      </div>
    </section>
  </article>
</template>
