<script setup lang="ts">
import { ref } from "vue";

// Meta SEO
const desc =
  "Slavic Media Blog shares behind-the-scenes insights, industry tips, and technical know-how from our industry professionals.";
const title = "Blog";

const { data: articles } = await useAsyncData("blog", () =>
  queryCollection("blog").all()
);

// SHOW MORE START
const ARTICLES_INCREMENT = 6;
const articlesToShow = ref(ARTICLES_INCREMENT);
const loadMoreArticles = () => {
  articlesToShow.value += ARTICLES_INCREMENT;
};
// SHOW MORE END
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="ogTitle" :content="title" />
    <Meta name="description" :content="desc" />
    <Meta name="ogDescription" :content="desc" />
    <Meta name="ogImage" content="https.//cdn.slavic.media/img/thumbnail/sd" />
  </Head>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide" role="region">
      <h1>Slavic Media <span class="gradient">Blog</span></h1>

      <LatestArticle class="hide" aria-busy="false"></LatestArticle>
      <hr aria-busy="false" class="hide quater reveal" />
      <div aria-busy="false">
        <div class="grid-container">
          <div v-for="article in articles" :key="article.slug" role="region">
            <BlogCard :article="article"></BlogCard>
          </div>
        </div>
        <br />
        <div class="flex-center">
          <button @click="loadMoreArticles" class="cta reveal">
            Show More
          </button>
        </div>
      </div>
    </section>
  </article>
</template>
<style lang="scss" scoped>
.grid-container {
  grid-template-columns: repeat(1, 1fr);
  display: grid;
  grid-gap: var(--grid-gap-3);
  height: auto;
  border-radius: var(--border-radius-1);
  color: white;
}
.grid-container .grid-item:nth-child(odd) {
  margin-right: var(--grid-gap-2);
}
h1 {
  font-size: var(--font-size-2);
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
