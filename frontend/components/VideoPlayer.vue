<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import "vidstack/bundle";
import "vidstack/player/styles/default/theme.css";

import "vidstack/player";

interface VideoPlayer {
  id: string;
}
const props = defineProps<VideoPlayer>();

const playerRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const el = playerRef.value;
  if (!el) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const player = entry.target as any;
        if (entry.isIntersecting) {
          player.play?.();
        } else {
          player.pause?.();
        }
      }
    },
    { threshold: 0.25 },
  );

  observer.observe(el);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <media-player
    ref="playerRef"
    class="player"
    :src="`https://customer-821liznl9775taxz.cloudflarestream.com/${id}/manifest/video.m3u8`"
    loop
    muted
    crossOrigin
    playsInline
    load="visible"
  >
    <media-provider> </media-provider>
  </media-player>
</template>
<style scoped lang="postcss">
.player {
  height: 100%;
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  animation: skeleton-loading 1s linear infinite alternate;
}
</style>
