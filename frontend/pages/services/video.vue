<script setup lang="ts">
import { ref, onMounted } from "vue";
import eventBus from "@/composables/useEventBus";
import { useShowMore } from "@/composables/useShowMore";
import video from "@/composables/modules/video";
import Lightgallery from "lightgallery/vue";
import lgVideo from "lightgallery/plugins/video";

useSeoMeta({
  title: "Video",
  ogTitle: "Video",
  description:
    "Before using Slavic Media services or digital products, you may review the terms and conditions of end user software license agreements.",
  ogDescription:
    "Before using Slavic Media services or digital products, you may review the terms and conditions of end user software license agreements.",
  ogImage: "https://cdn.slavic.media/img/thumbnail/width=300",
  twitterCard: "summary_large_image",
});

const headerTitle = "Services";
const { state: videoState, getAllVideos } = video();
const isDataLoaded = ref<boolean>(false);
const photoServices = [
  { id: "portrait", title: "Portrait" },
  { id: "still", title: "Still" },
  { id: "drone", title: "Drone" },
  { id: "outdoor", title: "Outdoor" },
];

// SHOW MORE START
videoState.value.videos = videoState.value.videos || [];
const { itemsToShow, allItemsShown, loadMoreItems, showLessItems } =
  useShowMore(4);
// SHOW MORE END

// REQUEST A PROPOSAL ID
const showRequestAProposal = (identifier: string) => {
  eventBus.emit("showRequestAProposal", identifier);
};

// Lightgallery plugins
const plugins = [lgVideo];

onMounted(async () => {
  try {
    // Fetch all videos from the database
    await getAllVideos();

    // Set isDataLoaded to true only after videos are fetched
    isDataLoaded.value = true;
  } catch (error) {
    console.error("Error loading videos:", error);
  }
});
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <NavBar :headerTitle="headerTitle" />
    <section class="wrapper-wide">
      <!-- PAGE ABSTRACT START -->
      <div
        class="grid-container caption-container"
        v-if="isDataLoaded"
        aria-busy="false"
      >
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            <span class="gradient"> Video </span>
            Services
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision.
          </p>
          <!-- <RequestProposal /> -->
          <button @click="showRequestAProposal('video')">
            <div class="cta">Request a Proposal</div>
          </button>
        </div>
        <br />
      </div>
      <!-- PAGE ABSTRACT END -->

      <div v-if="isDataLoaded" aria-busy="false">
        <!-- VIDEO -->
        <lightgallery
          id="video-gallery"
          class="gallery"
          aria-label="Video Gallery"
          :settings="{
            speed: 500,
            plugins: plugins,
            download: false,
            autoplay: true,
          }"
          :showVimeoThumbnails="true"
          hideScrollbar="true"
        >
          <VideoItem
            v-for="video in videoState.videos.slice(0, itemsToShow)"
            :key="video._id"
            :url="video.url"
            :title="video.title"
            :desc="video.desc"
            :year="video.year"
            :img="video._id"
            :flag="video.flag"
            :alt="`${video.title} cover`"
          />
        </lightgallery>
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
            <!-- <RequestProposal /> -->
            <button @click="showRequestAProposal('colour grading')">
              <div class="cta">Request a Proposal</div>
            </button>
          </div>
        </div>
        <br />
        <ColourGrading v-if="isDataLoaded"></ColourGrading>
        <!-- COLOUR GRADING END-->
        <div id="content"></div>
        <hr class="reveal" role="separator" v-if="isDataLoaded" />
        <!-- CONTENT START -->
        <div class="grid-container caption-container" v-if="isDataLoaded">
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
            <!-- <RequestProposal /> -->
            <button @click="showRequestAProposal('content')">
              <div class="cta">Request a Proposal</div>
            </button>
          </div>
          <div id="content"></div>
        </div>
        <br />
        <Reels></Reels>
      </div>
      <!-- CONTENT END -->
      <hr v-if="isDataLoaded" class="reveal" role="separator" />
      <div id="sound-edit"></div>
      <!-- SOUND EDIT START -->
      <div class="grid-container caption-container" v-if="isDataLoaded">
        <div class="grid-item">
          <h2 class="reveal" aria-label="Video Services">
            Sound<span class="gradient"> Edit</span>
          </h2>
          <!-- <RequestProposal /> -->
          <button
            style="margin-bottom: var(--grid-gap-2) !important"
            @click="showRequestAProposal('sound design')"
          >
            <div class="cta">Request a Proposal</div>
          </button>
        </div>
        <div class="grid-item reveal">
          <ul style="list-style: circle; color: white">
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
      <SoundEdit class="reveal" v-if="isDataLoaded"></SoundEdit>
      <!-- SOUND EDIT END -->

      <!-- SKELETON START -->
      <div v-else aria-busy="true" aria-live="polite">
        <SkeletonServices></SkeletonServices>
      </div>
      <!-- SKELETON END -->
    </section>
    <!-- LIGHTROOM PRESETS CTA START -->
    <section v-if="isDataLoaded" aria-busy="false">
      <LightroomPresets></LightroomPresets>
    </section>
    <!-- LIGHTROOM PRESETS CTA END -->
    <hr class="semi" />
    <!-- FURTHER SERVICES START -->
    <div id="services" v-if="isDataLoaded" class="wrapper-wide">
      <h3>Discover our <span class="gradient">photo</span> services</h3>
      <hr class="quater reveal" />
      <SwiperFurtherServices :services="photoServices" swiperClass="photo" />
    </div>
    <!-- FURTHER SERVICES END -->
  </article>
</template>

<style lang="scss" scoped>
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lightgallery.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-zoom.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-video.css");

h1 {
  text-transform: capitalize;
}

@media only screen and (max-width: 575px) {
  .gallery {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
