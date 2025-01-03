<script setup>
const props = defineProps({
  alt: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <a
    :href="`https://cdn.slavic.media/images/${props.id}/fit=contain,width=1280,sharpen=100`"
    :title="props.title"
    class="reveal"
  >
    <img
      class="reveal"
      :src="`https://cdn.slavic.media/images/${props.id}/fit=contain,width=1280,sharpen=100`"
      :title="props.title"
      :alt="props.alt"
    />
  </a>
</template>
