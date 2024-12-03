<script setup lang="ts">
import { onMounted, ref } from "vue";
import $ from "jquery";
import eventBus, { EventBus } from "@/eventBus";
import requestAProposal from "@/components/request-a-proposal.vue";
import galleryItem from "@/components/gallery-item.vue";
import swiperColourGrading from "@/components/swiper-colour-grading.vue";

import { useRouter } from "vue-router";

const router = useRouter();

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
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            <span class="gradient">Post</span>
            Production
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            With rich colour grading, dynamic editing, and a cinematic style, we
            transform your footage into a polished masterpiece that tells your
            story powerfully.
          </p>
        </div>
      </div>
      <div id="colour-grade"></div>
      <hr class="reveal" role="separator" />
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            Rich <span class="gradient">Colour Grade</span>
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision.
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
      <hr class="semi" role="separator" />
      <swiperColourGrading></swiperColourGrading>
      <div id="video-edit"></div>
      <hr class="reveal" role="separator" />
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            Dynamic <span class="gradient">Video Edit</span>
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision.
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
    </section>
  </article>
</template>
<style lang="scss" scoped>
iframe {
  border-radius: var(--border-radius-1);
  aspect-ratio: 16/9;
  width: 100%;
}
</style>
