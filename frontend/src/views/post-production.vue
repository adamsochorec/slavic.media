<script setup lang="ts">
import { onMounted, ref } from "vue";
import $ from "jquery";
import eventBus, { EventBus } from "@/eventBus";
import requestAProposal from "@/components/request-a-proposal.vue";
import swiperColourGrading from "@/components/swiper-colour-grading.vue";
import services from "@/modules/services";
import video from "@/modules/video";
import { useRouter, useRoute } from "vue-router";
import "https://cdn.jsdelivr.net/npm/lite-vimeo-embed/+esm";

const router = useRouter();
const route = useRoute();
const { getSpecificService, state: serviceState } = services();
const { getAllGalleries, state: videoState } = video();
const isDataLoaded = ref<boolean>(false);

const showRequestAProposal = (data: any): void => {
  (eventBus as EventBus).emit("showRequestAProposal", data);
};

onMounted(async () => {
  await Promise.all([getSpecificService("post-production"), getAllGalleries()]);
  isDataLoaded.value = true;
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
    <section class="wrapper-wide">
      <!-- PAGE INTRO -->
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            <span class="gradient">{{ serviceState.service?._id }}</span>
            Services
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            {{ serviceState.service?.desc }}
          </p>
        </div>
      </div>
      <div id="colour-grade"></div>
      <hr class="reveal" role="separator" />
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h2 class="reveal" aria-label="Video Services">
            Rich <span class="gradient">Colour Grade</span>
          </h2>
        </div>
        <div class="grid-item">
          <p class="reveal">
            From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision.
          </p>
          <requestAProposal />
          <button
            @click="showRequestAProposal(serviceState.service)"
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
      <swiperColourGrading></swiperColourGrading>
      <div id="video-edit"></div>
      <hr class="reveal" role="separator" />

      <div class="grid-container caption-container">
        <div class="grid-item">
          <h2 class="reveal" aria-label="Video Services">
            Dynamic <span class="gradient">Video Edit</span>
          </h2>
        </div>
        <div class="grid-item">
          <p class="reveal">
            From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision.
          </p>
          <requestAProposal />
          <button
            @click="showRequestAProposal(serviceState.service)"
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
      <lite-vimeo
        style="
          background-image: url(&quot;https://cdn.slavic.media/images/post-production/fit=contain,height=700,sharpen=100&quot;);
        "
        videoid="1037071233"
      ></lite-vimeo>
      <div id="sound-design"></div>
      <hr class="reveal" role="separator" />
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h2 class="reveal" aria-label="Video Services">
            Spatial <span class="gradient">Sound Design</span>
          </h2>
        </div>
        <div class="grid-item">
          <p class="reveal">
            From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision.
          </p>
          <requestAProposal />
          <button
            @click="showRequestAProposal(serviceState.service)"
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
      <lite-vimeo
        style="
          background-image: url(&quot;https://cdn.slavic.media/images/sound-design/fit=contain,height=700,sharpen=100&quot;);
        "
        videoid="1036355079"
      ></lite-vimeo>
    </section>
  </article>
</template>

<style lang="scss" scoped>
iframe,
lite-vimeo {
  border-radius: var(--border-radius-1);
  aspect-ratio: 16/9;
  width: 100%;
}
video {
  width: 100%;
}
</style>
