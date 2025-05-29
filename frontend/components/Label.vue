<script setup lang="ts">
interface Label {
  icon?: string;
  label: string;
}
const props = defineProps<Label>();
</script>
<template>
  <figure class="chip">
    <span>
      {{ label }}
    </span>
    <span v-if="icon" :class="`pi pi-${icon}`"></span>
  </figure>
</template>

<style scoped lang="postcss">
.chip {
  font-size: var(--font-size-8);
  background-color: rgba(var(--dark-grey-color), 0.3);
  border-radius: var(--border-radius-2);
  backdrop-filter: var(--blur-1);
  padding: 1px var(--grid-gap-1);
  width: fit-content;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  border: var(--border-1);

  .pi {
    font-size: var(--font-size-);
    margin-left: var(--grid-gap-1);
  }
}
</style>
