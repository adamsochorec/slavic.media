<script setup lang="ts">
import { useVideoControlsYouTube } from "@/composables/useVideoControlsYouTube";

const { iframeRef, state, muteVideo, unmuteVideo, playVideo, pauseVideo } =
  useVideoControlsYouTube();
</script>

<template>
  <section class="video-container">
    <iframe
      ref="iframeRef"
      id="sound-edit"
      src="https://www.youtube-nocookie.com/embed/eDV49Sz2lMI?mute=1&loop=1&playlist=eDV49Sz2lMI&autoplay=1"
      title="Sound Design"
      frameborder="0"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
        web-share;
      "
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
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

<style scoped lang="postcss">
.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--border-radius-1);
  overflow: hidden;

  iframe {
    height: 100%;
    width: 100%;
    border: none;
    border-radius: var(--border-radius-1);
    aspect-ratio: 16/9;
  }
  .controls {
    bottom: var(--grid-gap-2);
  }
}
</style>
