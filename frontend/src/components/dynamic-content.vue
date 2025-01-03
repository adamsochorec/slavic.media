<script setup>
import { onMounted, ref } from "vue";
import "https://cdn.jsdelivr.net/npm/lite-vimeo-embed/+esm";

const props = defineProps({
  htmlContent: {
    type: String,
    required: true,
  },
});

const content = ref(null);

onMounted(() => {
  if (content.value) {
    content.value.innerHTML = props.htmlContent;

    // Add 'reveal' class to all child elements
    const elements = content.value.querySelectorAll("*");
    elements.forEach((element) => {
      element.classList.add("reveal");
    });
  }
});
</script>

<template>
  <div ref="content"></div>
</template>
