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
.card {
  display: grid;
}
.gallery-item {
  aspect-ratio: 16/10;
}
.title[data-v-97e7de96] {
  display: none;
}
h2 {
  font-size: var(--font-size-5);
}
a > :hover {
  text-decoration: underline;
  -webkit-text-decoration-skip-ink: auto;
  text-decoration-skip-ink: auto;
}
img {
  -webkit-animation: skeleton-loading 1s linear infinite alternate;
  animation: skeleton-loading 1s linear infinite alternate;
}

.gallery-item:hover ~ .reveal .title h2 {
  text-decoration: underline;
}
@media only screen and (max-width: 400px) {
  h2 {
    font-size: var(--font-size-4);
  }
  .card {
    border-bottom: 1px solid white;
    padding-bottom: var(--grid-gap-3);
  }
}
</style>
