<script setup lang="ts">
import { truncateText } from "@/composables/useTruncateText.ts";

interface Author {
  name: string;
  id: string;
  linkedin: string;
}
interface Article {
  slug: string;
  thumbnail: string;
  icon: string;
  length: number;
  flag?: string;
  author: Author;
  title: string;
  description: string;
}
const props = defineProps<{
  article: Article;
}>();
</script>

<template>
  <article class="blog-card" aria-labelledby="blog-card-title">
    <figure>
      <GalleryCard
        :img="article.thumbnail"
        :url="`/blog/${article.slug}`"
        :description="article.description"
        :icon="article.icon"
        :flag="article.flag"
        targetWindow="_self"
        :alt="article.title"
      />
      <figcaption class="metadata">
        <BlogCardMetadata :article="article" />
      </figcaption>
    </figure>
    <header>
      <NuxtLink :to="`/blog/${article.slug}`">
        <h3 class="title" id="blog-card-title">
          {{ truncateText(article.title, 83) }}
        </h3>
      </NuxtLink>
    </header>
  </article>
</template>

<style lang="scss" scoped>
.blog-card {
  display: grid;
  @media only screen and (max-width: 499px) {
    border-bottom: 1px solid white;
    padding-bottom: var(--grid-gap-3);
  }
}
.gallery-item {
  aspect-ratio: 16/10;
  &:hover ~ .reveal .title {
    text-decoration: underline;
  }
}
.title {
  font-size: var(--font-size-5);
  &[data-v-97e7de96] {
    display: none;
  }
  @media only screen and (max-width: 400px) {
    font-size: var(--font-size-4);
  }
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
.author {
  font-size: var(--font-size-3);
  margin-top: var(--grid-gap-2);
  a {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
