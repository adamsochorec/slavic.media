<script lang="ts" setup>
interface SocialIcon {
  url: string;
  label: string;
  id: string;
}
const props = defineProps<SocialIcon>();
</script>

<template>
  <a
    :href="`https://${url}`"
    target="_blank"
    rel="noopener noreferrer nofollow"
    :aria-label="label"
    v-tooltip.top="{ value: label, autoHide: true }"
  >
    <i :class="`pi pi-${id}`"></i>
  </a>
</template>
