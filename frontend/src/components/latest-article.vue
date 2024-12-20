<script setup lang="ts">
import { ref, onMounted } from "vue";
import article from "@/modules/article";
import ArticleMetadata from "@/components/article-metadata.vue";
import { truncateText } from "@/functions/truncate-text.ts";

const { state, getLatestArticle } = article();
const isDataLoaded = ref(false);

onMounted(async () => {
  await getLatestArticle();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="wrapper-wide">
    <hr class="reveal" />
    <h3 class="reveal">
      Latest in
      <router-link to="/blog" class="gradient"
        >Slavic&nbsp;Media&nbsp;</router-link
      >
    </h3>
    <br />
    <div class="grid-container" v-if="isDataLoaded && state.article">
      <router-link :to="`/blog/${state.article._id}`">
        <img
          class="reveal"
          :src="`https://cdn.slavic.media/images/${state.article.metadata.thumbnail}/public`"
      /></router-link>
      <div>
        <router-link :to="`/blog/${state.article._id}`">
          <h4 class="reveal">
            {{ truncateText(state.article.title, 70) }}
          </h4></router-link
        >
        <p class="reveal">
          {{ truncateText(state.article.metadata.desc, 200) }}
        </p>
        <ArticleMetadata :article="state.article" />
      </div>
    </div>
    <div v-else>Loading...</div>
    <div class="flex-center">
      <router-link to="/blog" class="cta reveal">Read more</router-link>
    </div>
  </article>
</template>

<style scoped>
a > :hover {
  text-decoration: underline;
}
.grid-container {
  display: grid;
  grid-template-columns: 60% 38%;
  grid-gap: 0 var(--grid-gap-3);
}
h4 {
  font-size: var(--font-size-4);
  margin: 0 0 var(--grid-gap-2) 0;
}
img {
  border-radius: var(--border-radius-1);
  height: 300px;
  object-fit: cover;
}
@media only screen and (max-width: 600px) {
  .grid-container {
    display: block;
  }
  h4 {
    font-size: var(--font-size-3);
    margin: var(--grid-gap-2) 0;
  }
  img {
    height: var(--dimension-2);
  }
}
</style>
