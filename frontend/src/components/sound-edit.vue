<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";

interface Props {
  id: number;
  start?: number;
  ariaLabel: string;
}
const props = defineProps<Props>();
const iframeRef = ref<HTMLIFrameElement | null>(null);
const state = reactive({
  isPlaying: false,
  isMuted: true,
});

// VIDEO CONTROLS
const muteVideo = () => {
  sendMessageToVimeo("setVolume", 0);
  state.isMuted = true;
};
const unmuteVideo = () => {
  sendMessageToVimeo("setVolume", 1);
  state.isMuted = false;
};
const playVideo = () => {
  sendMessageToVimeo("play", 0);
  state.isPlaying = true;
};
const pauseVideo = () => {
  sendMessageToVimeo("pause", 0);
  state.isPlaying = false;
};
const sendMessageToVimeo = (method: string, value: number) => {
  if (iframeRef.value) {
    iframeRef.value.contentWindow?.postMessage(
      JSON.stringify({ method, value }),
      "*"
    );
  }
};
// VIDEO OFFLOAD
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (iframeRef.value) {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            pauseVideo();
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  if (iframeRef.value) {
    observer.observe(iframeRef.value);
  }
});
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
        class="pi pi-volume-up volume"
        @click="unmuteVideo"
      ></button>
      <button
        v-else
        class="pi pi-volume-off volume"
        @click="muteVideo"
      ></button>
    </section>
  </section>
</template>

<style scoped>
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
  bottom: var(--grid-gap-1);
}
</style>
