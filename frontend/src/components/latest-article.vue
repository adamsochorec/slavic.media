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
      >Blog
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
    <div v-if="isDataLoaded && state.article" class="flex-center">
      <router-link to="/blog" class="cta reveal">Read more</router-link>
    </div>
    <div class="grid-container" v-else>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        height="200px"
        borderRadius="10px"
        class="mb-6"
        aria-hidden="true"
      ></Skeleton>
      <div>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="15px"
          width="100%"
          borderRadius="10px"
          class="mb-2"
          aria-hidden="true"
        ></Skeleton>

        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="15px"
          width="70%"
          borderRadius="10px"
          class="mb-4"
          aria-hidden="true"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="100%"
          borderRadius="10px"
          class="mb-2"
          aria-hidden="true"
        ></Skeleton>

        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="100%"
          borderRadius="10px"
          class="mb-2"
          aria-hidden="true"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="80%"
          borderRadius="10px"
          class="mb-6"
          aria-hidden="true"
        ></Skeleton>
        <div class="flex">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            shape="circle"
            size="2rem"
            class="mr-2"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            height="10px"
            width="50%"
            borderRadius="10px"
            class="mb-2"
            aria-hidden="true"
          ></Skeleton>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
a > :hover {
  text-decoration: underline;
  text-decoration-skip: ink;
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
