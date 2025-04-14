<script setup lang="ts">
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import article from "@/composables/modules/article";

useSeoMeta({
  title: "Blog",
  ogTitle: "Blog",
  description:
    "Slavic Media Blog shares behind-the-scenes insights, industry tips, and technical know-how from our industry professionals.",
  ogDescription:
    "Slavic Media Blog shares behind-the-scenes insights, industry tips, and technical know-how from our industry professionals.",
  ogImage: "https://cdn.slavic.media/img/thumbnail/width=300",
  twitterCard: "summary_large_image",
});

interface Author {
  _id: string;
  name: string;
  department: string;
  linkedin: string;
  thumbnail: string;
}

interface Article {
  _id: string;
  title: string;
  author: Author;
  metadata: {
    date: string;
  };
  content: string[];
}

interface State {
  articles: Article[];
}

const { state, getAllArticles } = article();
const isDataLoaded = ref<boolean>(false);

// SHOW MORE START
const ARTICLES_INCREMENT = 6;
const articlesToShow = ref(ARTICLES_INCREMENT);
const loadMoreArticles = () => {
  articlesToShow.value += ARTICLES_INCREMENT;
};
// SHOW MORE END

// LATEST ARTICLE SLICE START
const screenWidth = ref<number>(0);
const filteredArticles = computed(() => {
  if (screenWidth.value > 510) {
    return state.value.articles.slice(1, articlesToShow.value + 1);
  }
  return state.value.articles.slice(0, articlesToShow.value);
});

const updateScreenWidth = () => {
  if (typeof window !== "undefined") {
    screenWidth.value = window.innerWidth;
  }
};

onMounted(async () => {
  await getAllArticles();
  isDataLoaded.value = true;
  updateScreenWidth();
  if (typeof window !== "undefined") {
    window.addEventListener("resize", updateScreenWidth);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateScreenWidth);
  }
});
// LATEST ARTICLE SLICE END
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide">
      <h1 class="visually-hidden">Slavic Media Blog</h1>

      <latestArticle
        class="hide"
        v-if="isDataLoaded"
        aria-busy="false"
      ></latestArticle>
      <hr v-if="isDataLoaded" aria-busy="false" class="hide quater reveal" />

      <div v-if="isDataLoaded" aria-busy="false">
        <div class="grid-container">
          <div
            v-for="article in filteredArticles"
            :key="article._id"
            role="region"
          >
            <blogCard :article="article"></blogCard>
          </div>
        </div>
        <br />
        <div class="flex-center">
          <button
            v-if="articlesToShow < state.articles.length"
            @click="loadMoreArticles"
            class="cta reveal"
          >
            Show More
          </button>
        </div>
      </div>
      <div v-else>
        <SkeletonLatestArticle
          aria-busy="true"
          aria-live="polite"
        ></SkeletonLatestArticle>

        <div class="grid-container" aria-busy="true" aria-live="polite">
          <div v-for="n in 3" :key="n">
            <SkeletonGalleryItem></SkeletonGalleryItem>
          </div>
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
