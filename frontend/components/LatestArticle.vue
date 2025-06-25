<script setup lang="ts">
import { ref, onMounted } from "vue";
import { truncateText } from "@/composables/useTruncateText.ts";
import { useProgressiveImg } from "@/composables/useProgressiveImg";

// Fetch the first document from the blog collection
const { data: article } = await useAsyncData("latest-article", () =>
  queryCollection("blog").order("date", "DESC").first()
);

const {
  thumbnailUrl,
  fullImageUrl,
  imgLoaded,
  updateImgSrc,
  checkIfAlreadyLoaded,
} = useProgressiveImg(article.value?.thumbnail ?? "", "/height=600");

const imgRef = ref<HTMLImageElement | null>(null);

onMounted(() => {
  checkIfAlreadyLoaded(imgRef.value);
});
</script>

<template>
  <div v-if="article">
    <figure class="grid-container reveal">
      <NuxtLink
        class="gallery-item"
        :to="`/blog/${article.slug}`"
        :aria-label="`${article.title}`"
      >
        <Icon
          v-if="article.flag"
          :name="`flag:${article.flag}-4x3`"
          class="note flag"
        />

        <div class="gallery-item-caption">
          <i aria-hidden="true" :class="`bubble pi pi-${article.icon}`"></i>
        </div>

        <img
          ref="imgRef"
          :src="thumbnailUrl"
          :data-src="fullImageUrl"
          :alt="article.title"
          @load="updateImgSrc"
        />
      </NuxtLink>

      <div>
        <NuxtLink class="title" :to="`/blog/${article.slug}`">
          <h4>
            {{ truncateText(article.title, 70) }}
          </h4>
        </NuxtLink>
        <p>
          {{ truncateText(article.description, 200)
          }}<NuxtLink
            :to="`/blog/${article.slug}`"
            aria-label="More from Slavic Media Blog"
            >continue reading</NuxtLink
          >
        </p>
        <BlogCardMetadata :article="article" />
      </div>
    </figure>
  </div>
</template>
<style scoped lang="postcss">
.gallery-item {
  position: relative;
  overflow: hidden;

  &:hover + div .title {
    text-decoration: underline;
    -webkit-text-decoration-skip-ink: auto;
    text-decoration-skip-ink: auto;
  }

  .flag,
  &-caption {
    position: absolute;
    z-index: 1;
  }

  &-caption {
    padding: var(--grid-gap-2);
  }
}
@media only screen and (min-width: 700px) {
  img:hover {
    filter: saturate(0);
    transition: var(--transition-1);
  }
}
.latest a,
.latest a:hover {
  box-shadow: none;
}

a > :hover,
.title:hover {
  text-decoration: underline;
  -webkit-text-decoration-skip-ink: auto;
  text-decoration-skip-ink: auto;
}

.grid-container {
  display: grid;
  grid-template-columns: 60% 38%;
  grid-gap: 0 var(--grid-gap-2);

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

h4 {
  font-size: var(--font-size-4);
  margin: 0 0 var(--grid-gap-2) 0;

  @media only screen and (max-width: 600px) {
    font-size: var(--font-size-3);
    margin: var(--grid-gap-2) 0;
  }
}
img {
  border-radius: var(--border-radius-1);
  height: 300px;
  object-fit: cover;
  position: relative;
  display: block;
  width: 100%;
  transition: var(--transition-1);
  -webkit-animation: skeleton-loading 1s linear infinite alternate;
  animation: skeleton-loading 1s linear infinite alternate;

  @media only screen and (max-width: 600px) {
    aspect-ratio: 16 / 10;
    height: auto;
    width: 100%;
  }
}
</style>
