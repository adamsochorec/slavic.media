<script setup lang="ts">
import { ref, computed } from "vue";

// Meta SEO
const description =
  "Slavic Media Blog shares behind-the-scenes insights, industry tips, and technical know-how from our industry professionals.";
const title = "Blog";

// Content hydration
const { data: articles = ref([]) } = await useAsyncData("blog", () =>
  queryCollection("blog").all()
);

// SHOW MORE START
const ARTICLES_INCREMENT = 6;
const articlesToShow = ref(ARTICLES_INCREMENT);

const visibleArticles = computed(() => {
  return Array.isArray(articles.value)
    ? articles.value.slice(0, articlesToShow.value)
    : [];
});
const loadMoreArticles = () => {
  articlesToShow.value += ARTICLES_INCREMENT;
};
const showLessArticles = () => {
  articlesToShow.value = ARTICLES_INCREMENT;
};
// SHOW MORE END
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="ogTitle" :content="title" />
    <Meta name="description" :content="description" />
    <Meta name="ogDescription" :content="description" />
    <Meta name="ogImage" content="https://cdn.slavic.media/img/thumbnail/sd" />
  </Head>
  <main style="margin-top: 120px">
    <section class="wrapper-wide" role="region" aria-labelledby="blog-heading">
      <h1 id="blog-heading">Slavic Media <span class="gradient">Blog</span></h1>
      <br />
      <LatestArticle class="hide" aria-busy="false"></LatestArticle>
      <hr aria-busy="false" class="hide quater reveal" />
      <section aria-labelledby="articles-heading">
        <h2 id="articles-heading" class="visually-hidden">Articles</h2>
        <div class="grid-container">
          <div
            v-for="article in visibleArticles"
            :key="article.slug"
            role="article"
          >
            <BlogCard :article="article"></BlogCard>
          </div>
        </div>
      </section>
      <br />
      <div class="flex-center">
        <button
          v-if="articlesToShow < articles.length"
          @click="loadMoreArticles"
          class="cta reveal"
        >
          Show More<span class="pi pi-plus-circle ml-2"></span>
        </button>
        <button v-else @click="showLessArticles" class="cta reveal">
          Show Less<span class="pi pi-minus-circle ml-2"></span>
        </button>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: var(--grid-gap-3);
  height: auto;
  border-radius: var(--border-radius-1);
  color: white;

  .grid-item:nth-child(odd) {
    margin-right: var(--grid-gap-2);
  }
}
h1 {
  font-size: var(--font-size-2);
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 500px) {
  .hide {
    display: none;
  }
}
@media only screen and (min-width: 500px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (min-width: 700px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
