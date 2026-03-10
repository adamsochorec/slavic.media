<script setup lang="ts">
import eventBus from "@/composables/useEventBus";

const props = defineProps<{
  seconds: number;
}>();

const seek = () => {
  eventBus.emit("youtube:seek", props.seconds);
};
</script>

<template>
  <a href="#" class="video-seek-link" @click.prevent="seek"><slot /></a>
</template>

<style scoped lang="postcss">
.video-seek-link {
  cursor: pointer;
}
</style>
