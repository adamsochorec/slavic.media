<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import "vidstack/bundle";
import "vidstack/player/styles/default/theme.css";

import "vidstack/player";

interface VideoPlayer {
  id: string;
}
const props = defineProps<VideoPlayer>();
</script>

<template>
  <media-player
    class="player"
    :src="`https://customer-821liznl9775taxz.cloudflarestream.com/${id}/manifest/video.m3u8`"
    loop
    muted
    autoplay
    crossOrigin
    playsInline
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
