<script setup>
import { ref, onMounted } from "vue";
import todocrud from "../modules/todocrud";
import Card from "primevue/card";
import Breadcrumb from "../components/BreadcrumbComponent.vue";
import Skeleton from "primevue/skeleton";

const { state, getAllDocuments } = todocrud();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllDocuments();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="wrapper-standard">
    <div v-if="isDataLoaded">
      <Breadcrumb />
      <hr class="semi" role="separator" />

      <div class="article-container wrapper-wide">
        <router-link
          v-for="article in state.articles"
          :key="article._id"
          :to="`/blog/${article.id}`"
          :class="{ 'article-item': true }"
        >
          <Card class="card" role="region">
            <template #header>
              <img :alt="article.title" :src="article.metadata.thumbnail" />
            </template>
            <template #title>
              <h6>{{ article.title }}</h6>
            </template>
          </Card>
        </router-link>
      </div>
    </div>
    <div v-else>
      <Skeleton width="5rem" class="mb-2"></Skeleton>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.article-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: var(--grid-gap-1);
  margin-bottom: 4rem;
}
.card {
  border-radius: var(--border-radius-1);
  width: var(--dimension-2);
  overflow: hidden;
  height: auto;
  box-shadow: var(--box-shadow-1);
}
</style>
