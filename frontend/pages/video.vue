<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useLoadMore } from "~/composables/useLoadMore";
import video from "@/composables/modules/video";
import Lightgallery from "lightgallery/vue";
import lgVideo from "lightgallery/plugins/video";
import { showRequestAProposal } from "@/composables/useRequestProposal";

interface Client {
  name: string;
  url: string;
}

interface Video {
  _id: string;
  index: number;
  flag: string;
  title: string;
  url: string;
  year: string;
  client: Client;
  description?: string;
  category?: string;
}

// Meta SEO
const description =
  "Before using Slavic Media services or digital products, you may review the terms and conditions of end user software license agreements.";
const title = "Video";

const { state: videoState, getAllVideos } = video();
const isDataLoaded = ref<boolean>(false);

// Further services matrix
const photoServices = [
  { id: "portrait", title: "Portrait" },
  { id: "still", title: "Still" },
  { id: "drone", title: "Drone" },
  { id: "outdoor", title: "Outdoor" },
];

// LOAD MORE START
const { itemsToShow, allItemsShown, loadMore, loadLess } = useLoadMore(4, 4);
// LOAD MORE END

// Lightgallery plugins
const plugins = [lgVideo];

onMounted(async () => {
  try {
    await getAllVideos();
    isDataLoaded.value = true;
  } catch (error) {
    console.error("Error loading videos:", error);
  }
});
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="ogTitle" :content="title" />
    <Meta name="description" :content="description" />
    <Meta name="ogDescription" :content="description" />
    <Meta name="ogImage" content="https.//cdn.slavic.media/img/video/sd" />
  </Head>
  <main style="margin-top: 120px">
    <section class="wrapper-wide" aria-labelledby="video-services-heading">
      <!-- PAGE ABSTRACT START -->
      <div
        class="grid-container caption-container"
        v-if="isDataLoaded"
        aria-busy="false"
      >
        <div class="grid-item">
          <h1 id="video-services-heading" class="reveal">
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
          <Btn
            tag="button"
            label="Request a proposal"
            icon="arrow-right"
            variant="primary"
            @click="showRequestAProposal('video')"
          />
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
          <VideoCard
            v-for="video in videoState.videos.slice(0, itemsToShow)"
            :key="video._id"
            :video="video"
          />
        </lightgallery>
        <div class="flex-center">
          <Btn
            tag="button"
            v-if="!allItemsShown"
            label="Show more"
            icon="plus-circle"
            variant="secondary"
            @click="loadMore(videoState.videos.length)"
          />
          <Btn
            tag="button"
            v-else
            label="Show less"
            icon="minus-circle"
            variant="secondary"
            @click="loadLess"
          />
        </div>
        <section aria-labelledby="colougrading-services-heading">
          <div id="colour-grading"></div>
          <hr class="reveal" role="separator" />
          <!-- COLOUR GRADING START-->
          <div v-if="isDataLoaded" class="grid-container caption-container">
            <div class="grid-item">
              <h2 id="colougrading-services-heading" class="reveal">
                Colour <span class="gradient">Grading</span>
              </h2>
            </div>
            <div class="grid-item">
              <p class="reveal">
                Bring your footage to life with our professional video colour
                grading. Using DaVinci Resolve, we grade boring log footage to
                unlock its full potential, delivering rich, vibrant colours
                across the depth spectrum and natural skin tones.
              </p>
              <Btn
                tag="button"
                label="Request a proposal"
                icon="arrow-right"
                variant="primary"
                @click="showRequestAProposal('colour grading')"
              />
            </div>
          </div>
          <br />
          <ColourGrading v-if="isDataLoaded"></ColourGrading>
        </section>
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
            <Btn
              tag="button"
              label="Request a proposal"
              icon="arrow-right"
              variant="primary"
              @click="showRequestAProposal('content')"
            />
          </div>
          <div id="content"></div>
        </div>
        <br />
        <Reels />
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
          <Btn
            tag="button"
            label="Request a proposal"
            icon="arrow-right"
            variant="primary"
            @click="showRequestAProposal('sound design')"
          />
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
    <!-- LIGHTROOM PRESETS START -->
    <section v-if="isDataLoaded" aria-busy="false">
      <LightroomPresets />
    </section>
    <!-- LIGHTROOM PRESETS END -->
    <hr class="semi" />
    <!-- FURTHER SERVICES START -->
    <div id="services" v-if="isDataLoaded" class="wrapper-wide">
      <h3>Discover our <span class="gradient">photo</span> services</h3>
      <hr class="quater reveal" />
      <FurtherServices :services="photoServices" swiperClass="photo" />
    </div>
    <!-- FURTHER SERVICES END -->
  </main>
</template>

<style lang="scss" scoped>
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lightgallery.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-zoom.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-video.css");

h1 {
  text-transform: capitalize;
}
.gallery {
  grid-template-columns: repeat(1, 1fr);
  display: grid;
  grid-gap: var(--grid-gap-3);
  height: auto;
  border-radius: var(--border-radius-1);
  color: white;
}

@media only screen and (min-width: 600px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 600px) {
  .video-card {
    border-bottom: 1px solid white;
    padding-bottom: var(--grid-gap-3);
  }
}
</style>
