<script setup lang="ts">
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
    <div class="card">
      <span :class="`pi pi-${icon} bubble`"></span>
      <h3>{{ title }}</h3>
      <span class="description">{{ description }}</span>
    </div>
  </NuxtLink>
</template>
<style lang="scss" scoped>
.card {
  height: var(--dimension-2);
  background-color: rgb(var(--dark-grey-color));
  padding: var(--grid-gap-2);
  border-radius: var(--border-radius-1);
  border: 0.5px solid rgba(255, 255, 255, 0.4);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  cursor: pointer;
  transition: var(--transition-1);
}
.card:hover {
  box-shadow: 0 0 var(--grid-gap-3) rgba(var(--secondary-color), 0.4);
  transform: scale(1.02);
  transition: var(--transition-1);
}
h3 {
  font-size: var(--font-size-5);
  margin-bottom: var(--grid-gap-1);
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
