<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import eventBus from "@/functions/event-bus";
import { useShowMore } from "@/functions/show-more";
import services from "@/modules/services";
import video from "@/modules/video";
import { useRouter } from "vue-router";
import $ from "jquery";
import "magnific-popup";

const { state: serviceState, getSpecificService } = services();
const { state: videoState, getAllVideos } = video();
const isDataLoaded = ref<boolean>(false);
const router = useRouter();

// SHOW MORE START
videoState.videos = videoState.videos || [];
const { itemsToShow, allItemsShown, loadMoreItems, showLessItems } =
  useShowMore(4);
// SHOW MORE END

// REQUEST A PROPOSAL ID
const showRequestAProposal = (identifier: string) => {
  eventBus.emit("showRequestAProposal", identifier);
};

onMounted(async () => {
  await Promise.all([getSpecificService("video"), getAllVideos()]);
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
    // Scroll to the anchor if it exists
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
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
          <requestAProposal />
          <button @click="showRequestAProposal('video')">
            <div class="cta">Request a Proposal</div>
          </button>
        </div>
        <br />
      </div>
      <!-- PAGE ABSTRACT END -->

      <div v-if="isDataLoaded" aria-busy="false">
        <!-- VIDEO -->
        <div id="video-gallery" class="gallery" aria-label="Video Gallery">
          <galleryItem
            :value="videoState.videos.slice(0, itemsToShow)"
            v-for="video in videoState.videos.slice(0, itemsToShow)"
            :key="video._id"
            :flag="video.flag"
            :img="video._id"
            icon="video"
            :alt="`${video.title} cover`"
            :opacity="0.5"
            :url="`https://vimeo.com/${video.url}`"
            :title="video.title"
            :desc="`${video.desc} ⋅ ${video.year}`"
          />
        </div>
        <div class="flex-center">
          <button
            v-if="!allItemsShown"
            @click="loadMoreItems(videoState.videos.length)"
            class="cta reveal"
          >
            Show More
          </button>
          <button v-else @click="showLessItems" class="cta reveal">
            Show Less
          </button>
        </div>
        <div id="colour-grading"></div>
        <hr class="reveal" role="separator" />

        <!-- COLOUR GRADING START-->
        <div v-if="isDataLoaded" class="grid-container caption-container">
          <div class="grid-item">
            <h2 class="reveal" aria-label="Video Services">
              Colour <span class="gradient">Grading</span>
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
            <button @click="showRequestAProposal('colour grading')">
              <div class="cta">Request a Proposal</div>
            </button>
          </div>
        </div>
        <br />
        <swiperColourGrading v-if="isDataLoaded"></swiperColourGrading>
        <!-- COLOUR GRADING END-->
        <div id="content"></div>
        <hr class="reveal" role="separator" />
        <!-- CONTENT START -->
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
            <button @click="showRequestAProposal('content')">
              <div class="cta">Request a Proposal</div>
            </button>
          </div>
          <div id="content"></div>
        </div>
        <br />
        <swiperReels></swiperReels>
      </div>
      <!-- CONTENT END -->
      <div id="sound-edit"></div>
      <hr class="reveal" role="separator" />
      <!-- SOUND EDIT START -->
      <div class="grid-container caption-container" v-if="isDataLoaded">
        <div class="grid-item">
          <h2 class="reveal" aria-label="Video Services">
            Sound<span class="gradient"> Edit</span>
          </h2>
          <requestAProposal />
          <button
            style="margin-bottom: var(--grid-gap-2) !important"
            @click="showRequestAProposal('sound design')"
          >
            <div class="cta">Request a Proposal</div>
          </button>
        </div>
        <div class="grid-item reveal">
          <ul>
            <li>
              Production sound (the dialogue and ambient noises captured during
              shooting)
            </li>
            <li>Foley (reproduced sounds)</li>
            <li>Walla (crowd noises)</li>
            <li>SFX (sound effects)</li>
            <li>Music</li>
          </ul>
        </div>
      </div>
      <br />
      <soundEdit class="reveal" v-if="isDataLoaded"></soundEdit>
      <!-- SOUND EDIT END -->

      <!-- SKELETON START -->
      <div v-else aria-busy="true" aria-live="polite">
        <skeletonServices></skeletonServices>
      </div>
      <!-- SKELETON END -->
    </section>
    <!-- LIGHTROOM PRESETS CTA START -->
    <section v-if="isDataLoaded" aria-busy="false">
      <bannerLightroomPresets></bannerLightroomPresets>
    </section>
    <!-- LIGHTROOM PRESETS CTA END -->
    <hr class="semi" />
    <!-- FURTHER SERVICES START -->
    <div id="services" v-if="isDataLoaded" class="wrapper-wide">
      <h3>Discover our <span class="gradient">photo</span> services</h3>
      <hr class="quater reveal" />
      <swiperPhotoServices></swiperPhotoServices>
    </div>
    <!-- FURTHER SERVICES END -->
  </article>
</template>

<style lang="scss" scoped>
h1 {
  text-transform: capitalize;
}

@media only screen and (max-width: 400px) {
  .gallery-item {
    height: 120px;
  }
}
@media only screen and (max-width: 575px) {
  .gallery {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
