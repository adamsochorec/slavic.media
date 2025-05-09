<script setup lang="ts">
import { useVideoControls } from "@/composables/useVideoControls";

interface HeroVideo {
  id: number;
  start?: number;
  alt: string;
}
const props = defineProps<HeroVideo>();
const { iframeRef, state, muteVideo, unmuteVideo, playVideo, pauseVideo } =
  useVideoControls();
</script>

<template>
  <section class="showcase" aria-labelledby="video-description">
    <div class="video-container">
      <iframe
        ref="iframeRef"
        :src="`https://player.vimeo.com/video/${id}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;muted=1&amp;autoplay=1&amp;loop=1&amp;controls=0#t=${start}s`"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        :title="alt"
      ></iframe>
    </div>
    <p id="video-description" class="visually-hidden">
      {{ alt }}
    </p>
    <a
      class="link"
      target="_blank"
      rel="noopener noreferrer nofollow"
      :href="`https://vimeo.com/${id}?share=copy`"
      v-tooltip.left="{ value: 'Watch on Vimeo', autoHide: true }"
      aria-label="Watch on Vimeo"
    >
      <i class="pi pi-vimeo"></i>
    </a>
    <section class="controls">
      <button
        v-if="state.isPlaying"
        class="pi pi-pause-circle play"
        @click="pauseVideo"
      ></button>
      <button v-else class="pi pi-play-circle play" @click="playVideo"></button>
      <button
        v-if="state.isMuted"
        class="pi pi-volume-off volume"
        @click="unmuteVideo"
      ></button>
      <button v-else class="pi pi-volume-up volume" @click="muteVideo"></button>
    </section>
  </section>
</template>

<style scoped>
.link {
  position: absolute;
  right: var(--grid-gap-2);
}
.showcase {
  height: var(--dimension-1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
}
.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--dimension-1);
  overflow: hidden;
  background-position: center;
  background-size: cover;
  z-index: -1;
}
.video-container iframe {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 177.77777778vh;
  height: 56.25vw;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

@media only screen and (max-width: 415px) {
  .video-container,
  .showcase {
    height: 100vh;
  }
  .controls,
  .link {
    bottom: var(--grid-gap-2);
  }
}
@media only screen and (min-width: 415px) {
  .controls,
  .link {
    top: calc(var(--dimension-1) - 3 * var(--grid-gap-1));
  }
}
</style>
