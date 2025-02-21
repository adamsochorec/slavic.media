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
};
</script>

<template>
  <a
    :href="`https://cdn.slavic.media/images/${props._id}/fit=contain,width=1280,sharpen=100`"
    :title="props.title"
    :data-pswp-width="props.originalWidth"
    :data-pswp-height="props.originalHeight"
  >
    <img
      class="reveal"
      :src="`https://cdn.slavic.media/images/${props._id}/fit=contain,width=1280,sharpen=100`"
      :title="props.title"
      :alt="props.alt"
      @load="updateDimensions"
    />
    <div class="hidden-caption-content">{{ props.title }}</div>
    <country-flag :country="props.flag" class="note" size="small" />
  </a>
</template>
<style scoped>
.note {
  left: var(--grid-gap-1) !important;
}

img,
a {
  cursor: pointer;
  cursor: pointer;
  cursor: pointer;
}
</style>
