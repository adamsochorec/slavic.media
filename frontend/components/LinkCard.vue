<script setup lang="ts">
import { truncateText } from "@/composables/useTruncateText.ts";

interface LinkCard {
  url: string;
  icon: string;
  title: string;
  description?: string;
}
const props = defineProps<LinkCard>();
</script>
<template>
  <NuxtLink :to="url" class="card">
    <figure class="card-content">
      <span :class="`pi pi-${icon} bubble`"></span>
      <h3>{{ title }}</h3>
      <div class="description">{{ truncateText(description, 100) }}</div>
    </figure>
  </NuxtLink>
</template>
<style lang="postcss" scoped>
.card {
  height: 160px;
}
.card.right > .card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}
h3 {
  font-size: var(--font-size-5);
  margin-bottom: var(--grid-gap-1);

  @media only screen and (min-width: 400px) {
  }
}
.description {
  font-size: var(--font-size-7);
}
.icon {
  background: rgb(var(--grey-color));
  padding: 10px;
  border: 0.5px solid rgba(255, 255, 255, 0.4);
  border-radius: var(--border-radius-2);
}
</style>
