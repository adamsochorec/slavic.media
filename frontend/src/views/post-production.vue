<script setup lang="ts">
import { onMounted, ref } from "vue";
import $ from "jquery";
import eventBus, { EventBus } from "@/eventBus";
import requestAProposal from "@/components/request-a-proposal.vue";
import swiperColourGrading from "@/components/swiper-colour-grading.vue";
import services from "@/modules/services";
import video from "@/modules/video";
import { useRouter, useRoute } from "vue-router";

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
      <hr class="semi" role="separator" />
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
      <hr class="semi" role="separator" />
      <div style="padding: 56.25% 0 0 0; position: relative">
        <iframe
          src="https://player.vimeo.com/video/987964137?h=870f308e79&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
          title="Showreel 2024 | Slavic Media"
        ></iframe>
      </div>
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
      <hr class="semi" role="separator" />
      <video controls src="https://slavic.media/img/sfx.mp4"></video>
    </section>
  </article>
</template>

<style lang="scss" scoped>
iframe {
  border-radius: var(--border-radius-1);
  aspect-ratio: 16/9;
  width: 100%;
}
video {
  width: 100%;
}
</style>
