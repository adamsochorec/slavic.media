<script setup>
const props = defineProps({
  _id: { type: String, required: true, maxlength: 50 },
  alt: { type: String, required: true, maxlength: 200 },
  title: { type: String, required: true, maxlength: 200 },
  flag: { type: String, required: true, maxlength: 2 },
  originalWidth: { type: Number, required: false },
  originalHeight: { type: Number, required: false },
});

const emit = defineEmits(["update:originalWidth", "update:originalHeight"]);

const updateDimensions = (event) => {
  emit("update:originalWidth", event.target.naturalWidth);
  emit("update:originalHeight", event.target.naturalHeight);
  event.target.src = event.target.dataset.src;
};

const fullImageUrl = `https://cdn.slavic.media/img/${props._id}/public`;
const thumbnailUrl = `https://cdn.slavic.media/img/${props._id}/thumbnail`;
</script>

<template>
  <a
    :href="fullImageUrl"
    :title="props.title"
    :data-pswp-width="props.originalWidth"
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
    <Icon :name="`circle-flags:${props.flag}`" class="note" />
  </a>
</template>

<style scoped>
.note {
  left: var(--grid-gap-1) !important;
}
img,
a {
  cursor: pointer;
}
</style>
