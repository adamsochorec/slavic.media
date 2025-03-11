<script setup lang="ts">
import { ref, onMounted } from "vue";
import article from "@/modules/article";
import ArticleMetadata from "@/components/article-metadata.vue";
import { truncateText } from "@/functions/truncate-text.ts";

const { state, getLatestArticle } = article();
const isDataLoaded = ref(false);

onMounted(async () => {
  await getLatestArticle();
  isDataLoaded.value = true;
});

const updateImageSrc = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = target.dataset.src!;
};
</script>

<template>
  <div>
    <div class="grid-container reveal" v-if="isDataLoaded && state.article">
      <router-link class="gallery-item" :to="`/blog/${state.article._id}`">
        <country-flag
          v-if="state.article.metadata.flag"
          :country="state.article.metadata.flag"
          class="note"
          size="small"
        />
        <div class="gallery-item-caption">
          <i
            aria-hidden="true"
            :class="`bubble pi pi-${state.article.metadata.icon}`"
          ></i>
        </div>

        <img
          class=""
          :src="`https://cdn.slavic.media/img/${state.article.metadata.thumbnail}/thumbnail`"
          :data-src="`https://cdn.slavic.media/img/${state.article.metadata.thumbnail}/fit=contain,height=600`"
          @load="updateImageSrc"
        />
      </router-link>

      <div>
        <router-link class="title" :to="`/blog/${state.article._id}`">
          <h4>
            {{ truncateText(state.article.title, 70) }}
          </h4></router-link
        >
        <p class="reveal">
          {{ truncateText(state.article.metadata.desc, 200)
          }}<router-link :to="`blog/${state.article._id}`">..more</router-link>
        </p>
        <ArticleMetadata :article="state.article" />
      </div>
    </div>

    <skeletonLatestArticle v-else></skeletonLatestArticle>
  </div>
</template>

<style scoped>
.gallery-item {
  position: relative;
  overflow: hidden;
}
.gallery-item:hover + div .title {
  text-decoration: underline;
  -webkit-text-decoration-skip-ink: auto;
  text-decoration-skip-ink: auto;
}
.gallery-item .flag,
.gallery-item-caption {
  position: absolute;
  z-index: 1;
}
.gallery-item-caption {
  padding: var(--grid-gap-2);
}
.latest a,
.latest a:hover {
  -webkit-box-shadow: none;
  box-shadow: none;
}
a > :hover {
  text-decoration: underline;
  -webkit-text-decoration-skip-ink: auto;
  text-decoration-skip-ink: auto;
}
.title:hover {
  text-decoration: underline;
  -webkit-text-decoration-skip-ink: auto;
  text-decoration-skip-ink: auto;
}
.grid-container {
  display: grid;
  grid-template-columns: 60% 38%;
  grid-gap: 0 var(--grid-gap-3);
}

h4 {
  font-size: var(--font-size-4);
  margin: 0 0 var(--grid-gap-2) 0;
}
img {
  border-radius: var(--border-radius-1);
  height: 300px;
  -o-object-fit: cover;
  object-fit: cover;
  position: relative;
  display: block;
  width: 100%;
  transition: var(--transition-1);
}

@media only screen and (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  h4 {
    font-size: var(--font-size-3);
    margin: var(--grid-gap-2) 0;
  }
  img {
    height: var(--dimension-2);
  }
}
</style>
