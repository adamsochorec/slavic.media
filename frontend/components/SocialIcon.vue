<template>
  <a
    :href="`https://${href}`"
    target="_blank"
    rel="noopener noreferrer nofollow"
    :aria-label="label"
    v-tooltip.top="{ value: label, autoHide: true }"
  >
    <i :class="`pi pi-${id}`"></i>
  </a>
</template>

<script setup>
defineProps({
  href: String,
  label: String,
  id: String,
});
</script>
