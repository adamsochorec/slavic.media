<script setup lang="ts">
import { useVideoControls } from "@/composables/useVideoControls";

const { iframeRef, state, muteVideo, unmuteVideo, playVideo, pauseVideo } =
  useVideoControls();
</script>

<template>
  <section class="video-container">
    <iframe
      ref="iframeRef"
      src="https://player.vimeo.com/video/1036355079?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;muted=1&amp;autoplay=1&amp;loop=1&amp;controls=0&amp;app_id=58479"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      title="Sound Design | Slavic Media"
    ></iframe>
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

<style scoped lang="scss">
.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--border-radius-1);
  overflow: hidden;
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.controls {
  bottom: var(--grid-gap-2);
}
</style>
