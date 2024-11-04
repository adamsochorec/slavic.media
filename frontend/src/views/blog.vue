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
          <router-link
            v-for="article in state.articles"
            :key="article.slug"
            :to="`/blog/${article.slug}`"
            :class="{ 'article-item': true }"
          >
            <Card
              style="
                box-shadow: var(--box-shadow-1);
                height: auto;
              "
              role="region"
              class="rounded border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900"
            >
              <template #header>
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
              </template>
              <template #title>
                <span>{{ truncateText(article.title, 80) }}</span>
              </template>
            

              <template #footer>
                <div class="flex items-center gap-3">
                  <Avatar
                    :image="article.author.thumbnail"
                    size="medium"
                    shape="circle"
                  />
                  <div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      style="font-size: var(--font-size-8)"
                      :href="article.author.url"
                      class="font-bold"
                      >{{ article.author.name }}</a
                    ><br />
                    <span style="font-size: var(--font-size-8)">
                      {{ article.metadata.date }}&nbsp;⋅&nbsp;{{
                        article.metadata.length
                      }}
                      min read</span
                    >
                  </div>
                </div>
              </template>
            </Card>
          </router-link>
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
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--grid-gap-3);
}
</style>
