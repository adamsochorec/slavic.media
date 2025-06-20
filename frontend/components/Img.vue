<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProgressiveImg } from "@/composables/useProgressiveImg";

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

const {
  thumbnailUrl,
  fullImageUrl,
  imgLoaded,
  updateImgSrc,
  checkIfAlreadyLoaded,
} = useProgressiveImg(_id, "/4K");

const imgRef = ref<HTMLImageElement | null>(null);

const updateDimensions = (event: Event) => {
  const target = event.target as HTMLImageElement;
  emit("update:originalWidth", target.naturalWidth);
  emit("update:originalHeight", target.naturalHeight);
  updateImgSrc(event);
};

onMounted(() => {
  checkIfAlreadyLoaded(imgRef.value);
});
</script>

<template>
  <a
    :href="fullImageUrl"
    :title="title"
    :data-pswp-width="originalWidth"
    :data-pswp-height="originalHeight"
  >
    <img
      ref="imgRef"
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
