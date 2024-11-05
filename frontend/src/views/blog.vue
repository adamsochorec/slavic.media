<script setup>
import { ref, onMounted } from "vue";
import articleCrud from "../modules/articleCrud";
const { state, getAllArticles } = articleCrud();

const isDataLoaded = ref(false);

onMounted(async () => {
  console.log("Fetching all articles");
  await getAllArticles();
  isDataLoaded.value = true;
});

// Method to truncate text
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
</script>

<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-wide">
      <h1 style="font-size: var(--font-size-1)" class="mb-5">Blog</h1>
      <div v-if="isDataLoaded">
        <div class="container">
          <div v-for="article in state.articles" :key="article.slug">
            <div class="card" role="region">
              <router-link :to="`/blog/${article.slug}`">
                <img
                  style="
                    height: 170px;
                    width: 100%;
                    object-fit: cover;
                    border-top-left-radius: var(--p-card-border-radius);
                    border-top-right-radius: var(--p-card-border-radius);
                  "
                  :alt="article.title"
                  :src="article.metadata.thumbnail"
                />
                <h2>{{ truncateText(article.title, 80) }}</h2>
              </router-link>
              <div class="metadata gap-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  :href="article.author.url"
                >
                  <Avatar
                    :image="article.author.thumbnail"
                    size="medium"
                    shape="circle"
                /></a>
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    class="author"
                    style="font-size: var(--font-size-8)"
                    :href="article.author.url"
                    ><b>{{ article.author.name }}</b></a
                  ><br />
                  <span style="font-size: var(--font-size-8)">
                    {{ article.metadata.date }}&nbsp;⋅&nbsp;{{
                      article.metadata.length
                    }}
                    min read</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-else>
        <div
          style="box-shadow: var(--box-shadow-1)"
          class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900"
        >
          <div class="flex mb-4">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
              <Skeleton width="10rem" class="mb-2"></Skeleton>
              <Skeleton width="5rem" class="mb-2"></Skeleton>
              <Skeleton height=".5rem"></Skeleton>
            </div>
          </div>
          <Skeleton width="100%" height="150px"></Skeleton>
          <div class="flex justify-between mt-4">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
          </div>
        </div>
        <div
          style="box-shadow: var(--box-shadow-1)"
          class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900"
        >
          <div class="flex mb-4">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
              <Skeleton width="10rem" class="mb-2"></Skeleton>
              <Skeleton width="5rem" class="mb-2"></Skeleton>
              <Skeleton height=".5rem"></Skeleton>
            </div>
          </div>
          <Skeleton width="100%" height="150px"></Skeleton>
          <div class="flex justify-between mt-4">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
          </div>
        </div>
        <div
          style="box-shadow: var(--box-shadow-1)"
          class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900"
        >
          <div class="flex mb-4">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
              <Skeleton width="10rem" class="mb-2"></Skeleton>
              <Skeleton width="5rem" class="mb-2"></Skeleton>
              <Skeleton height=".5rem"></Skeleton>
            </div>
          </div>
          <Skeleton width="100%" height="150px"></Skeleton>
          <div class="flex justify-between mt-4">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
          </div>
        </div>
      </div>
      <hr class="semi" />
    </article>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-size: var(--font-size-5);
  padding: var(--grid-gap-2) 0;
}
a.author:hover {
  text-decoration: underline;
}
.container {
  display: grid;
  grid-gap: var(--grid-gap-3);
}
.metadata {
  display: flex;
  align-items: center;
  line-height: 1;
}
.card {
  height: 340px;
  border-radius: var(--border-radius-1);
  color: white;
}

@media only screen and (max-width: 900px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (min-width: 900px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
