<script lang="ts" setup>
import { defineProps } from "vue";

interface LegalArticle {
  _id: string;
  title: string;
}

const props = defineProps<{
  legals: LegalArticle[];
  currentId: string;
}>();
</script>

<template>
  <div class="articles reveal">
    <span
      v-for="legal in props.legals"
      :key="legal._id"
      :class="{ current: legal._id === props.currentId }"
    >
      <router-link :to="`/legal/${legal._id}`">{{ legal.title }}</router-link>
    </span>
  </div>
</template>

<style scoped>
.articles {
  display: flex;
}
.articles span:not(.articles span:last-child) {
  margin-right: var(--grid-gap-3);
}
.articles span {
  line-height: 1;
  text-align: center;
  opacity: 30%;
}
.current {
  border-bottom: 2px solid rgba(var(--primary-color), 0.8);
  opacity: 100% !important;
}
.articles span:hover {
  opacity: 100%;
  transition: var(--transition-1);
}
.articles span,
.articles span:hover {
  transition: var(--transition-1);
}
@media only screen and (max-width: 500px) {
  .articles a {
    font-size: var(--font-size-8);
  }
  .articles span:not(.articles span:last-child) {
    margin-right: var(--grid-gap-1);
  }
}
@media only screen and (min-width: 500px) {
  .articles a {
    font-size: var(--font-size-6);
  }
  .articles span:not(.articles span:last-child) {
    margin-right: var(--grid-gap-2);
  }
}
</style>
