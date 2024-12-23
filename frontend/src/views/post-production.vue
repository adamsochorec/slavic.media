<script setup lang="ts">
import { onMounted, ref } from "vue";
import eventBus, { EventBus } from "@/functions/eventBus";
import services from "@/modules/services";
import video from "@/modules/video";
import { useRouter, useRoute } from "vue-router";
import "https://cdn.jsdelivr.net/npm/lite-vimeo-embed/+esm";
import $ from "jquery";

const router = useRouter();
const route = useRoute();
const { getSpecificService, state: serviceState } = services();
const { getAllGalleries, state: videoState } = video();
const isDataLoaded = ref<boolean>(false);
// REQUEST A PROPOSAL ID
const showRequestAProposal = (identifier: string) => {
  eventBus.emit("showRequestAProposal", identifier);
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
            Bring your footage to life with our professional video colour
            grading. Using DaVinci Resolve, we grade boring log footage to
            unlock its full potential, delivering rich, vibrant colours across
            the depth spectrum and natural skin tones.
          </p>
          <requestAProposal />
          <button @click="showRequestAProposal('colour grade')">
            <div class="cta">Request a Proposal</div>
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
            Elevate your content with our dynamic video editing. From seamless
            hyper lapses, image stabilisation, and speed ramps to multicam cuts,
            subtitles, and personalised motion graphics. Complete with
            professional intros, outros, and precise cuts, your video will stand
            out from start to finish.
          </p>
          <requestAProposal />
          <button @click="showRequestAProposal('video edit')">
            <div class="cta">Request a Proposal</div>
          </button>
        </div>
      </div>
      <br />
      <lite-vimeo
        class="reveal"
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
            Immerse your audience with our spatial sound design. We specialize
            in creating dynamic soundscapes with high-quality SFX, smooth
            dialogue correction, digital denoising, and strong atmospheres.
            Whether it’s subtle accents or intense action, we bring every
            element of your audio to life.
          </p>
          <requestAProposal />
          <button @click="showRequestAProposal('sound design')">
            <div class="cta">Request a Proposal</div>
          </button>
        </div>
      </div>
      <br />
      <lite-vimeo
        class="reveal"
        style="
          background-image: url(&quot;https://cdn.slavic.media/images/sound-design/fit=contain,height=700,sharpen=100&quot;);
        "
        videoid="1036355079"
      ></lite-vimeo>
    </section>
    <!-- LIGHTROOM PRESETS CTA START -->
    <section aria-busy="false">
      <bannerLightroomPresets></bannerLightroomPresets>
    </section>
    <!-- LIGHTROOM PRESETS CTA END -->
    <!-- FURTHER SERVICES START -->
    <furtherServices
      v-if="isDataLoaded"
      :excludeServiceId="serviceState.service?._id"
    />
    <!-- FURTHER SERVICES END -->
  </article>
</template>

<style lang="scss" scoped>
h1 {
  text-transform: capitalize;
}
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
