<script setup lang="ts">
import { ref, computed } from "vue";
import Lightgallery from "lightgallery/vue";
import lgVideo from "lightgallery/plugins/video";
import { useLoadMore } from "@/composables/useLoadMore";

useHead({
  script: [
    {
      src: "https://player.vimeo.com/api/player.js",
      async: true,
    },
  ],
});

// Fetch documents
const {
  data: videos,
  pending,
  error,
} = await useFetch("https://api.slavic.media/video");

// Load more functionality
const { itemsToShow, allItemsShown, loadMore, loadLess } = useLoadMore(4, 4);

// Lightgallery plugin
const plugins = [lgVideo];
</script>

<template>
  <lightgallery
    v-if="!pending && !error"
    id="video-gallery"
    class="grid-container"
    aria-label="Video Gallery"
    :settings="{
      speed: 500,
      plugins: plugins,
      download: false,
      autoplay: false,
      videojs: true,
      videojsOptions: {
        muted: false,
      },
      youTubePlayerParams: {
        mute: 0,
        autoplay: 0,
      },
      vimeoPlayerParams: {
        muted: false,
        autoplay: false,
      },
    }"
    :showVimeoThumbnails="true"
    hideScrollbar="true"
  >
    <a
      v-for="(video, idx) in videos"
      v-show="idx < itemsToShow"
      :key="video._id"
      class="video-card reveal"
      aria-labelledby="video-card-title"
      :data-src="`//${video.url}`"
      :href="`//${video.url}`"
      :data-sub-html="`<figcaption class='gallery-desc metadata content-font'><b>${video.title}</b><br><span class='pi pi-info-circle mr-1'></span>${video.category}<i class='separator'></i><span class='pi pi-calendar mr-1'></span>${video.year}<i v-if='video.client' class='separator'></i><span v-if='video?.client'><span class='pi pi-users mr-1'></span>${video.client?.name}</span></figcaption>`"
    >
      <img
        :src="`https://cdn.slavic.media/img/${video._id}/SD`"
        :alt="video.title"
      />
      <figure class="metadata">
        <span class="pi pi-info-circle"></span>
        {{ video.category }}<i class="separator"></i>
        <span class="pi pi-calendar"></span>
        {{ video.year }}<i v-if="video.client" class="separator"></i>
        <span v-if="video.client">
          <span class="pi pi-users"></span>
          {{ video.client.name }}
        </span>
      </figure>
      <h2 class="title" id="video-card-title">{{ video.title }}</h2>
    </a>
  </lightgallery>
  <div class="flex-center" v-if="!pending && !error">
    <Btn
      tag="button"
      v-if="!allItemsShown"
      label="Show more"
      icon="plus-circle"
      variant="secondary"
      @click="loadMore(videos.length)"
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
  <SkeletonSwiper v-else aria-busy="true" />
</template>

<style lang="postcss" scoped>
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lightgallery.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-zoom.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-video.css");

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--grid-gap-3);
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
.video-card {
  display: grid;
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
  color: white;

  &:hover {
    img {
      -webkit-filter: saturate(0);
      filter: saturate(0);
      -webkit-transition: var(--transition-1);
      -o-transition: var(--transition-1);
      transition: var(--transition-1);
    }
    .title {
      text-decoration: underline;
      -webkit-transition: var(--transition-1);
      -o-transition: var(--transition-1);
      transition: var(--transition-1);
    }
  }
  @media only screen and (max-width: 600px) {
    padding-bottom: var(--grid-gap-1);
    &:not(:last-child) {
      border-bottom: var(--border-1);
    }
  }
}
img {
  border-radius: var(--border-radius-1);
  -o-object-fit: cover;
  object-fit: cover;
  aspect-ratio: 16/9;
  height: auto;
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}
.metadata,
.metadata .pi {
  font-size: var(--font-size-7);
}
.metadata,
.title {
  margin-top: var(--grid-gap-1);
}
.title {
  font-size: var(--font-size-5);
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}
</style>
