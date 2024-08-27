<script setup>
import { defineProps } from "vue";
import Card from "primevue/card";

defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <Card class="card" role="region">
    <template #header>
      <img :alt="article.title" :src="article.thumbnail" />
    </template>
    <template #title
      ><h6>{{ article.title }}</h6></template
    >
    <template #subtitle
      ><p>{{ article.subtitle }}</p></template
    >
  </Card>
</template>
<style lang="scss" scoped>
.card {
  border-radius: var(--border-radius-1);
  width: var(--dimension-2);
  overflow: hidden;
  height: 300px;
  box-shadow: var(--box-shadow-1);
}
</style>
