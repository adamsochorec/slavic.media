<script setup lang="ts">
import { ddmmmyyyy } from "@/composables/useDateFormat.ts";

interface Author {
  name: string;
  id: string;
  linkedin: string;
}
interface Article {
  slug: string;
  thumbnail: string;
  title: string;
  description: string;
  icon: string;
  length: number;
  flag?: string;
  author: Author;
}
const props = defineProps<{
  article: Article;
}>();
</script>

<template>
  <figcaption class="reveal">
    <header class="metadata gap-3">
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        :href="`https://www.linkedin.com/in/${article.author.linkedin}`"
        class="author"
        aria-label="Visit {{ article.author.name }}'s LinkedIn profile"
      >
        <img
          class="avatar"
          :src="`https://cdn.slavic.media/img/${article.author.id}/height=90`"
          :alt="`${article.author.name}'s profile picture`"
        />
      </a>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="author"
          :href="`https://www.linkedin.com/in/${article.author.linkedin}`"
          aria-label="Visit {{ article.author.name }}'s LinkedIn profile"
        >
          <span>{{ article.author.name }}</span>
        </a>
        <br class="hide" />
        <figure class="submetadata">
          <span class="pi pi-calendar"></span>
          {{ ddmmmyyyy(article.date) }}<i class="separator"></i>
          <span class="pi pi-clock"></span>
          {{ article.length }} min read
        </figure>

        <br />
      </div>
    </header>
  </figcaption>
</template>

<style lang="scss" scoped>
img {
  -webkit-animation: skeleton-loading 1s linear infinite alternate;
  animation: skeleton-loading 1s linear infinite alternate;
}
.author {
  font-size: var(--font-size-7);
}
.avatar {
  height: 30px;
  width: auto;
  object-fit: cover;
  aspect-ratio: 1 / 1;
}
.metadata {
  display: flex;
  align-items: center;
  line-height: 1.2;
  color: white;
  margin-top: var(--grid-gap-1);
}
.submetadata,
.submetadata .pi {
  font-size: var(--font-size-7);
}
.grid-item:nth-child(2) {
  font-size: var(--font-size-7);
  @media only screen and (max-width: 400px) {
    font-size: var(--font-size-8);
  }
}
</style>
