<script setup lang="ts">
interface Img {
  _id: string;
  alt: string;
  title: string;
  flag: string;
  originalWidth?: number;
  originalHeight?: number;
}
const { _id, alt, title, flag, originalWidth, originalHeight } =
  defineProps<Img>();

const emit = defineEmits<{
  (event: "update:originalWidth", value: number): void;
  (event: "update:originalHeight", value: number): void;
}>();

const updateDimensions = (event: Event) => {
  const target = event.target as HTMLImageElement;
  emit("update:originalWidth", target.naturalWidth);
  emit("update:originalHeight", target.naturalHeight);
  target.src = target.dataset.src!;
};

const fullImageUrl = `https://cdn.slavic.media/img/${_id}/public`;
const thumbnailUrl = `https://cdn.slavic.media/img/${_id}/thumbnail`;
</script>

<template>
  <a
    :href="fullImageUrl"
    :title="title"
    :data-pswp-width="originalWidth"
    :data-pswp-height="originalHeight"
  >
    <img
      class="reveal"
      :src="thumbnailUrl"
      :data-src="fullImageUrl"
      :title="title"
      :alt="alt"
      @load="updateDimensions"
    />
    <div class="hidden-caption-content">{{ title }}</div>
    <Icon :name="`flag:${flag}-4x3`" class="note flag" />
  </a>
</template>

<style scoped lang="postcss">
img,
a {
  cursor: pointer;
}
</style>
