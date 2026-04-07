<script setup lang="ts">
import eventBus from "@/composables/useEventBus";

const props = defineProps<{
  id: string;
  seconds: number;
  autoscroll?: boolean;
}>();

const seek = () => {
  eventBus.emit("youtube:seek", { id: props.id, seconds: props.seconds, autoscroll: props.autoscroll });
};
</script>

<template>
  <a href="" class="video-seek-link" @click.prevent="seek"><slot /></a>
</template>

<style scoped lang="postcss">
.video-seek-link {
  cursor: pointer;
}
</style>
