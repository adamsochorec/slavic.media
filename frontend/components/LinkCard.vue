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
  <NuxtLink :to="url">
    <figure class="card">
      <span :class="`pi pi-${icon} bubble`"></span>
      <h3>{{ title }}</h3>
      <div class="description">{{ truncateText(description, 83) }}</div>
    </figure>
  </NuxtLink>
</template>
<style lang="postcss" scoped>
.card {
  height: 160px;
  background-color: rgb(var(--dark-grey-color));
  padding: var(--grid-gap-2);
  border-radius: var(--border-radius-1);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  cursor: pointer;
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}

h3 {
  font-size: var(--font-size-5);

  @media only screen and (min-width: 600px) {
    margin-bottom: var(--grid-gap-1);
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
