<script lang="ts" setup>
interface LegalArticle {
  _id: string;
  title: string;
}

const props = defineProps<{
  legals: LegalArticle[];
  currentId?: string;
  highlightCurrent?: boolean;
}>();
</script>

<template>
  <div class="articles reveal">
    <span
      v-for="legal in props.legals"
      :key="legal._id"
      :class="{
        current: props.highlightCurrent && legal._id === props.currentId,
      }"
    >
      <router-link :to="`/legal/${legal._id}`">{{ legal.title }}</router-link>
    </span>
  </div>
</template>

<style scoped>
.articles {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.articles span:not(.articles span:last-child) {
  margin-right: var(--grid-gap-3);
}
.articles span {
  line-height: 1;
  text-align: center;
}
.current {
  opacity: 100% !important;
}

.articles span,
.articles span:hover {
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
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
