<script setup lang="ts">
import { truncateText } from "@/composables/useTruncateText.ts";

interface Author {
  name: string;
  id: string;
  linkedin: string;
}
interface Seo {
  title: string;
  description: string;
}
interface Article {
  slug: string;
  thumbnail: string;
  description: string;
  icon: string;
  length: number;
  flag?: string;
  author: Author;
  seo: Seo;
}
const props = defineProps<{
  article: Article;
}>();
</script>

<template>
  <article class="card" aria-labelledby="article-title">
    <GalleryItem
      :img="article.thumbnail"
      :url="`/blog/${article.slug}`"
      :description="article.seo.description"
      :icon="article.icon"
      :flag="article.flag"
      targetWindow="_self"
      :alt="article.seo.title"
    />
    <section class="reveal">
      <BlogCardMetadata :article="article" />

      <NuxtLink class="title reveal" :to="`/blog/${article.slug}`">
        <h2 id="article-title">{{ truncateText(article.seo.title, 83) }}</h2>
      </NuxtLink>
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
.author {
  font-size: var(--font-size-3);
  margin-top: var(--grid-gap-2);
}
.author a {
  color: var(--color-primary);
  text-decoration: none;
}
.author a:hover {
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
