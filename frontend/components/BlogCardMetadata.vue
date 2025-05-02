<script setup lang="ts">
import { ddmmmyyyy } from "@/composables/useDateFormat.ts";

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
  <section class="reveal">
    <header class="metadata gap-3">
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        :href="`https://www.linkedin.com/in/${article.author.linkedin}`"
        class="author"
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
        >
          <span>{{ article.author.name }}</span>
        </a>
        <br class="hide" />
        <span style="font-size: var(--font-size-7)"
          ><span
            style="font-size: var(--font-size-7)"
            class="pi pi-calendar"
          ></span
          >&nbsp;{{ ddmmmyyyy(article.date) }}&nbsp;⋅&nbsp;<span
            style="font-size: var(--font-size-7)"
            class="pi pi-clock"
          ></span
          >&nbsp;{{ article.length }}
          min read
        </span>
        <br />
      </div>
    </header>
  </section>
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
  aspect-ratio: 1/1;
}
.metadata {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  line-height: 1.2;
  color: white;
  margin: var(--grid-gap-2) 0;
}
.grid-item:nth-child(2) {
  font-size: var(--font-size-7);
}
@media only screen and (max-width: 400px) {
  .grid-item:nth-child(2) {
    font-size: var(--font-size-8);
  }
}
</style>
