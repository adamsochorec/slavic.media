<script setup lang="ts">
interface Img {
  _id: string;
  alt: string;
  title: string;
  flag: string;
  originalWidth?: number;
  originalHeight?: number;
}
const props = defineProps<Img>();

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

const fullImageUrl = `https://cdn.slavic.media/img/${props._id}/public`;
const thumbnailUrl = `https://cdn.slavic.media/img/${props._id}/thumbnail`;
</script>

<template>
  <a
    :href="fullImageUrl"
    :title="props.title"
    :data-pswp-width="originalWidth"
    :data-pswp-height="props.originalHeight"
  >
    <img
      class="reveal"
      :src="thumbnailUrl"
      :data-src="fullImageUrl"
      :title="props.title"
      :alt="props.alt"
      @load="updateDimensions"
    />
    <div class="hidden-caption-content">{{ props.title }}</div>
    <Icon :name="`cif:${props.flag}`" class="note flag" />
  </a>
</template>

<style scoped lang="scss">
img,
a {
  cursor: pointer;
}
</style>
