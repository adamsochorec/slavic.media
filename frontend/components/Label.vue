<script setup lang="ts">
interface Label {
  icon?: string;
  label: string;
}
const props = defineProps<Label>();
</script>
<template>
  <div class="chip">
    <span :class="icon"></span>
    <span>
      {{ label }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.chip {
  font-size: var(--font-size-8);
  background-color: rgba(var(--dark-grey-color), 0.3);
  border-radius: var(--border-radius-2);
  backdrop-filter: var(--blur-1);
  padding: 1px var(--grid-gap-1);
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-1);
  box-shadow: var(--box-shadow-1);

  .pi {
    font-size: var(--font-size-6);
    margin-right: var(--grid-gap-1);
  }
}
</style>
