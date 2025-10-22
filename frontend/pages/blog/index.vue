<script setup lang="ts">
import { ref, computed } from "vue";
import { useLoadMore } from "@/composables/useLoadMore";

// Meta SEO
const description =
  "Slavic Media team shares behind-the-scenes insights, industry tips, and technical know-how from our industry professionals.";
const title = "Blog";

// Content hydration
const { data: documents = ref([]) } = await useAsyncData("blog", () =>
  queryCollection("blog").order("date", "DESC").all()
);

// SEO META
useSeoMeta(
  {
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    ogImage: "https://cdn.slavic.media/img/thumbnail/SD",
    ogUrl: "https://slavic.media/blog",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: "https://cdn.slavic.media/img/thumbnail/SD",
    twitterCard: "summary",
  },
  { priority: 1 }
);

// LOAD MORE
const { itemsToShow, allItemsShown, loadMore, loadLess } = useLoadMore(6, 6);
</script>

<template>
  <main style="margin-top: 120px">
    <section class="wrapper-wide" role="region" aria-labelledby="blog-heading">
      <h1 id="blog-heading">Slavic Media <span class="gradient">Blog</span></h1>
      <LatestArticle
        class="hide"
        aria-busy="false"
        style="margin: var(--grid-gap-3) 0"
      ></LatestArticle>
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
        <Button
          tag="button"
          v-if="!allItemsShown"
          label="Show more"
          icon="plus-circle"
          variant="secondary"
          @click="loadMore(documents.length)"
        />
        <Button
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
  color: oklch(1 0 0);

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
