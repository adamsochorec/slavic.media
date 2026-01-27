<script setup lang="ts">
import { useVideoControlsYouTube } from "@/composables/useVideoControlsYouTube";

interface HeroVideo {
  youtube: string;
  title: string;
  start?: string;
}
const props = defineProps<HeroVideo>();
const { iframeRef, state, muteVideo, unmuteVideo, playVideo, pauseVideo } =
  useVideoControlsYouTube();
</script>

<template>
  <section class="showcase" aria-labelledby="video-description">
    <div class="video-container">
      <iframe
        ref="iframeRef"
        id="youtube-player"
        :src="`https://www.youtube-nocookie.com/embed/${youtube}?enablejsapi=1&autoplay=1&controls=0&disablekb=1&start=${
          start ?? 0
        }&loop=1&playlist=${youtube}`"
        :title="title"
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
    </div>
    <p id="video-description" class="visually-hidden">
      {{ title }}
    </p>
    <a
      class="link"
      target="_blank"
      rel="noopener noreferrer nofollow"
      :href="`https://www.youtube.com/watch?v=${youtube}`"
      v-tooltip.left="{ value: 'Watch on YouTube', autoHide: true }"
      aria-label="Watch on Youtube"
    >
      <i class="pi pi-youtube"></i>
    </a>
    <section class="controls">
      <button
        aria-label="Volume up"
        v-if="state.isMuted"
        class="pi pi-volume-off volume"
        @click="unmuteVideo"
      ></button>
      <button
        v-else
        aria-label="Volume down"
        class="pi pi-volume-up volume"
        @click="muteVideo"
      ></button>
    </section>
  </section>
</template>

<style lang="postcss" scoped>
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

  iframe {
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
}
@media only screen and (max-width: 415px) {
  .video-container,
  .showcase {
    height: 100vh;
    height: 100svh;
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
