<script setup lang="ts">
import { ref } from "vue";
const isDataLoaded = ref(true);

const { data: articles } = await useAsyncData("blog", () =>
  queryCollection("blog").all()
);
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide" role="region">
      <h1 class="visually-hidden">Slavic Media Blog</h1>

      <div v-if="isDataLoaded" aria-busy="false">
        <div class="grid-container">
          <div v-for="article in articles" :key="article.slug" role="region">
            <BlogCard :article="article"></BlogCard>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
<style lang="scss" scoped>
.grid-container {
  grid-template-columns: repeat(1, 1fr);
  display: grid;
  grid-gap: var(--grid-gap-3);
  height: auto;
  border-radius: var(--border-radius-1);
  color: white;
}
.grid-container .grid-item:nth-child(odd) {
  margin-right: var(--grid-gap-2);
}
h1 {
  font-size: var(--font-size-2);
}
@media only screen and (max-width: 500px) {
  .hide {
    display: none;
  }
}
@media only screen and (min-width: 500px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (min-width: 700px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
