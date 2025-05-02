<script setup lang="ts">
import { ddmmmyyyy } from "@/functions/date-format.ts";

interface Author {
  name: string;
  url: string;
  department: string;
  thumbnail: string;
}
interface Metadata {
  date: string;
  length: number;
  thumbnail: string;
  description: string;
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
console.log(props.article);
const updateImageSrc = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = target.dataset.src!;
};
</script>

<template>
  <section class="reveal">
    <header class="metadata gap-3">
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        :href="`https://www.linkedin.com/in/${article.author.linkedin}`"
        class="author"
        v-tooltip.top="{
          value: article.author.department,
          autoHide: true,
        }"
      >
        <img
          class="avatar"
          :src="`https://cdn.slavic.media/img/${article.author._id}/thumbnail`"
          :data-src="`https://cdn.slavic.media/img/${article.author._id}/avatar`"
          :alt="`${article.author.name}'s profile picture`"
          @load="updateImageSrc"
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
          >&nbsp;{{ ddmmmyyyy(article.metadata.date) }}&nbsp;⋅&nbsp;<span
            style="font-size: var(--font-size-7)"
            class="pi pi-book"
          ></span
          >&nbsp;{{ article.metadata.length }}
          min read
        </span>
        <br />
        <span>{{ department }}</span>
        <!-- Add this line to display the department -->
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
