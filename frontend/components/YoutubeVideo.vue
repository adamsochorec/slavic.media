<script setup lang="ts">
import { useVideoControlsYouTube } from "@/composables/useVideoControlsYouTube";

interface YoutubeVideoProps {
  id: string;
  title: string;
  muted?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
}

const props = withDefaults(defineProps<YoutubeVideoProps>(), {
  muted: true,
  autoplay: true,
  loop: true,
  controls: true,
});

import { onMounted } from "vue";
const { iframeRef } = useVideoControlsYouTube(props.id);

import eventBus from "@/composables/useEventBus";

onMounted(() => {
  eventBus.on("youtube:seek", (data: { id: string; seconds: number; autoscroll?: boolean }) => {
    if (data.id === props.id && data.autoscroll && iframeRef.value) {
      iframeRef.value.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});
</script>

<template>
  <iframe
    ref="iframeRef"
    :src="`https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1&mute=${muted ? 1 : 0}&autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&controls=${controls ? 1 : 0}&playlist=${id}`"
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
    class="youtube-iframe"
  ></iframe>
</template>

<style scoped lang="postcss">
.youtube-iframe {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--border-radius-1);
}
</style>
