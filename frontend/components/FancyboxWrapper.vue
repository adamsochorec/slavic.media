<script setup lang="ts">
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { onMounted, onUpdated, onUnmounted, ref } from "vue";

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  if (container.value) {
    Fancybox.bind(container.value, "[data-fancybox]");
  }
});

onUpdated(() => {
  if (container.value) {
    Fancybox.unbind(container.value);
    Fancybox.close();
    Fancybox.bind(container.value, "[data-fancybox]");
  }
});

onUnmounted(() => {
  Fancybox.destroy();
});
</script>

<template>
  <div ref="container">
    <slot></slot>
  </div>
</template>
