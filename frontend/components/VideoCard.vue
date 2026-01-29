<script setup lang="ts">
import { ref, computed } from "vue";
import Lightgallery from "lightgallery/vue";
import lgVideo from "lightgallery/plugins/video";
import { useLoadMore } from "@/composables/useLoadMore";

interface Video {
  _id: string;
  url: string;
  title: string;
  category: string;
  year: number;
  client?: {
    name: string;
  };
}

interface Props {
  videos?: Video[];
  pending?: boolean;
  error?: Error | null;
}

const props = withDefaults(defineProps<Props>(), {
  videos: () => [],
  pending: false,
  error: null,
});

// Load more functionality
const { itemsToShow, allItemsShown, loadMore, loadLess } = useLoadMore(4, 4);

// Lightgallery plugin
const plugins = [lgVideo];
</script>

<template>
  <lightgallery
    id="video-gallery"
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
    }"
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
</template>

<style lang="postcss" scoped>
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lightgallery.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-zoom.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-video.css");

.video-card {
  display: grid;
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
  color: oklch(1 0 0);

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
