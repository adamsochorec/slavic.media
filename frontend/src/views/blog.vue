<script setup>
import { ref, onMounted } from "vue";
import todocrud from "../modules/todocrud";
const { state, getAllDocuments } = todocrud();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllDocuments();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="wrapper-wide">
    <h1 style="font-size: var(--font-size-1)" class="mb-5">Blog</h1>
    <div v-if="isDataLoaded">
      <div class="container">
        <router-link
          v-for="article in state.articles"
          :key="article._id"
          :to="`/blog/${article.id}`"
          :class="{ 'article-item': true }"
        >
          <Card
            style="box-shadow: var(--box-shadow-1); height: auto"
            role="region"
            class="card rounded border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900"
          >
            <template #header>
              <img
                style="
                  aspect-ratio: 9/16;
                  height: 200px;
                  width: 100%;
                  object-fit: cover;
                "
                class="rounded"
                :alt="article.title"
                :src="article.metadata.thumbnail"
              />
            </template>
            <template #title>
              <span class="p-0">{{ article.title }}</span>
            </template>
            <template #content>
              <div class="flex items-center gap-2">
                <Avatar
                  :image="article.author.thumbnail"
                  size="large"
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
                      article.metadata.lenght
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
  </article>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--grid-gap-3);
  margin-bottom: 4rem;
}
</style>
