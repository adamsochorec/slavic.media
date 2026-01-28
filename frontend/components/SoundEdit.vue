<script setup lang="ts">
import { useVideoControlsYouTube } from "@/composables/useVideoControlsYouTube";

const { iframeRef, state } = useVideoControlsYouTube();
</script>

<template>
  <iframe
    ref="iframeRef"
    src="https://www.youtube-nocookie.com/embed/u3PwDCmAH_k?enablejsapi=1&mute=1&loop=1&playlist=u3PwDCmAH_k&autoplay=1"
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
</template>

<style scoped lang="postcss">
iframe {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--border-radius-1);
  overflow: hidden;
  height: 100%;
}
</style>
