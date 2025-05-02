<script setup lang="ts">
interface Props {
  icon?: string;
  label: string;
}
const props = defineProps<Props>();
</script>
<template>
  <div class="chip">
    <span :class="icon"></span>
    <span>
      {{ label }}
    </span>
  </div>
</template>

<style scoped>
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
  border: 1px solid white;
  box-shadow: var(--box-shadow-1);
}
.chip .pi {
  font-size: var(--font-size-6);
  margin-right: var(--grid-gap-1);
}
</style>
