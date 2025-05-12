<script setup lang="ts">
import { ref, computed } from "vue";
import { useLoadMore } from "@/composables/useLoadMore";

// Meta SEO
const description =
  "Slavic Media Blog shares behind-the-scenes insights, industry tips, and technical know-how from our industry professionals.";
const title = "Blog";

// Content hydration
const { data: documents = ref([]) } = await useAsyncData("blog", () =>
  queryCollection("blog").all()
);

// LOAD MORE
const { itemsToShow, allItemsShown, loadMore, loadLess } = useLoadMore(6, 6);
</script>

<template>
  <main style="margin-top: 120px">
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="ogTitle" :content="title" />
      <Meta name="description" :content="description" />
      <Meta name="ogDescription" :content="description" />
      <Meta
        name="ogImage"
        content="https://cdn.slavic.media/img/thumbnail/sd"
      />
    </Head>
    <section class="wrapper-wide" role="region" aria-labelledby="blog-heading">
      <h1 id="blog-heading">Slavic Media <span class="gradient">Blog</span></h1>
      <br />
      <LatestArticle class="hide" aria-busy="false"></LatestArticle>
      <hr aria-busy="false" class="hide quater reveal" />
      <section aria-labelledby="articles-heading">
        <h2 id="articles-heading" class="visually-hidden">Articles</h2>
        <div class="grid-container">
          <BlogCard
            class="hide"
            v-for="document in documents.slice(1, itemsToShow + 1)"
            :key="document.slug"
            :article="document"
          ></BlogCard>
          <BlogCard
            class="unhide"
            v-for="document in documents.slice(0, itemsToShow)"
            :key="document.slug"
            :article="document"
          ></BlogCard>
        </div>
      </section>
      <div class="flex-center">
        <Btn
          tag="button"
          v-if="!allItemsShown"
          label="Show more"
          icon="plus-circle"
          variant="secondary"
          @click="loadMore(documents.length)"
        />
        <Btn
          tag="button"
          v-else
          label="Show less"
          icon="minus-circle"
          variant="secondary"
          @click="loadLess"
        />
      </div>
    </section>
  </main>
</template>
<style lang="postcss" scoped>
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
  .unhide {
    display: none;
  }
}
@media only screen and (min-width: 700px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
