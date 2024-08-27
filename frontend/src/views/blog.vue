<script setup>
import { onMounted } from "vue";
import todocrud from "../modules/todocrud";
import ArticleCard from "../components/ArticleCard.vue";
import Breadcrumb from "../components/BreadcrumbComponent.vue";

const { state, getAllDocuments } = todocrud();

onMounted(() => {
  getAllDocuments();
});
</script>

<template>
  <article>
    <Breadcrumb />
    <hr class="semi" role="separator" />

    <div class="article-container wrapper-wide">
      <router-link
        v-for="article in state.articles"
        :key="article._id"
        :to="`/blog/${article.id}`"
        class="pizza-link"
        :class="{ 'article-item': true }"
      >
        <ArticleCard :article="article" />
      </router-link>
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
</style>
