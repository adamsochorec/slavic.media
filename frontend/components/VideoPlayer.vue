<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import "vidstack/bundle";
import "vidstack/player";

interface VideoPlayer {
  id: string;
}
const props = defineProps<VideoPlayer>();

const playerRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let canPlay = false;
let wantsPlay = false;

onMounted(() => {
  const el = playerRef.value;
  if (!el) return;

  el.addEventListener("can-play", () => {
    canPlay = true;
    (el as any).muted = true;
    if (wantsPlay) {
      (el as any).play?.();
    }
  });

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const player = entry.target as any;
        if (entry.isIntersecting) {
          wantsPlay = true;
          if (canPlay) {
            player.play?.();
          }
        } else {
          wantsPlay = false;
          if (canPlay) {
            player.pause?.();
          }
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
  box-shadow: var(--box-shadow-1);
  animation: skeleton-loading 1s linear infinite alternate;
}
</style>
