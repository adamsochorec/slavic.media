<script setup lang="ts">
interface Photo {
  id: string;
  alt: string;
  title: string;
  flag: string;
  originalWidth?: number;
  originalHeight?: number;
}
const props = defineProps<Photo>();

/*
const emit = defineEmits(["update:originalWidth", "update:originalHeight"]);

const updateDimensions = (event: Event) => {
  const target = event.target as HTMLImageElement;
  emit("update:originalWidth", target.naturalWidth);
  emit("update:originalHeight", target.naturalHeight);
  target.src = target.dataset.src!;
}; */
</script>

<template>
  <!--
<a
  :href="`https://cdn.slavic.media/img/${id}/public`"
  :title="title"
  :data-pswp-width="originalWidth"
  :data-pswp-height="originalHeight"
  :data-cropped="true"
  class="lightbox"
>
</a>
-->
  <img :src="`https://cdn.slavic.media/img/${id}/public`" :alt="alt" />
</template>

<style scoped lang="postcss">
/*
img,
a {
  cursor: pointer;
}*/
</style>
