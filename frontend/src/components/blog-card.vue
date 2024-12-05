<script setup lang="ts">
import { defineProps } from "vue";
import galleryItem from "@/components/gallery-item.vue";

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
  <article class="card" role="article" aria-labelledby="article-title">
    <galleryItem
      :img="article.metadata.thumbnail"
      :url="`/blog/${article._id}`"
      :desc="article.metadata.desc"
      :icon="article.metadata.icon"
      targetWindow="_self"
    />
    <section class="reveal">
      <header class="metadata gap-3">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          :href="`https://www.linkedin.com/in/${article.author.linkedin}`"
          class="author"
        >
          <Avatar
            :image="`https://cdn.slavic.media/images/${article.author._id}/height=100,sharpen=100`"
            size="medium"
            shape="circle"
            :alt="`Avatar of ${article.author.name}`"
          />
        </a>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="author"
            style="font-size: var(--font-size-7)"
            :href="`https://www.linkedin.com/in/${article.author.linkedin}`"
          >
            <b>{{ article.author.name }}</b>
          </a>
          <br class="hide" />
          <span style="font-size: var(--font-size-7)">
            {{ article.metadata.formatedDate }}&nbsp;⋅&nbsp;{{
              article.metadata.length
            }}
            min read
          </span>
        </div>
      </header>
      <router-link class="title reveal" :to="`/blog/${article._id}`">
        <h3 id="article-title">{{ article.title }}</h3>
      </router-link>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.card {
  display: grid;
}
h3 {
  font-size: var(--font-size-5);
}
img {
  opacity: 1 !important;
  -webkit-animation: skeleton-loading 1s linear infinite alternate;
  animation: skeleton-loading 1s linear infinite alternate;
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
  h3 {
    font-size: var(--font-size-4);
  }
  .card {
    border-bottom: 1px solid white;
    padding-bottom: var(--grid-gap-3);
  }
}
</style>
