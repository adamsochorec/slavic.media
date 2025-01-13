<script setup lang="ts">
import { truncateText } from "@/functions/truncate-text.ts";

interface Author {
  name: string;
  url: string;
  thumbnail: string;
}
interface Metadata {
  formatedDate: string;
  length: number;
  thumbnail: string;
  desc: string;
  icon: string;
}
interface Article {
  _id: string;
  title: string;
  author: Author;
  metadata: Metadata;
}
const props = defineProps<{
  article: Article;
}>();
</script>

<template>
  <article class="card" aria-labelledby="article-title">
    <galleryItem
      :img="article.metadata.thumbnail"
      :url="`/blog/${article._id}`"
      :desc="article.metadata.desc"
      :icon="article.metadata.icon"
      :flag="article.metadata.flag"
      targetWindow="_self"
      :alt="article.title"
    />
    <section class="reveal">
      <ArticleMetadata :article="article" />

      <router-link class="title reveal" :to="`/blog/${article._id}`">
        <h2 id="article-title">{{ truncateText(article.title, 83) }}</h2>
      </router-link>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.card {
  display: grid;
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
