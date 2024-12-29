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
          :src="`https://cdn.slavic.media/images/${state.article.metadata.thumbnail}/fit=contain,height=600,sharpen=100`"
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

    <div class="grid-container" v-else>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        height="200px"
        borderRadius="10px"
        class="mb-6"
        aria-hidden="true"
      ></Skeleton>
      <div>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="15px"
          width="100%"
          borderRadius="10px"
          class="mb-2"
          aria-hidden="true"
        ></Skeleton>

        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="15px"
          width="70%"
          borderRadius="10px"
          class="mb-4"
          aria-hidden="true"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="100%"
          borderRadius="10px"
          class="mb-2"
          aria-hidden="true"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="100%"
          borderRadius="10px"
          class="mb-2"
          aria-hidden="true"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="80%"
          borderRadius="10px"
          class="mb-6"
          aria-hidden="true"
        ></Skeleton>
        <div class="flex">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            shape="circle"
            size="2rem"
            class="mr-2"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            height="10px"
            width="50%"
            borderRadius="10px"
            class="mb-2"
            aria-hidden="true"
          ></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-item {
  position: relative;
  overflow: hidden;
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
.gallery-item:hover img,
.gallery-item img,
.gallery-item::before img,
.gallery-item::after img,
.gallery-item:active img,
.gallery-item:focus img,
.gallery-item img::before,
.gallery-item img::after,
.gallery-item img:active,
.gallery-item img:focus {
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
  border-radius: var(--border-radius-1);
}
.gallery-item:hover img {
  border-radius: var(--border-radius-1);
  -webkit-transform: scale(1.2);
  -ms-transform: scale(1.2);
  transform: scale(1.2);
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
