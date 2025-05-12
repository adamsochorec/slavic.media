<script setup lang="ts">
import { ref, computed } from "vue";

// Content hydration
const { data: documents = ref([]) } = await useAsyncData("blog", () =>
  queryCollection("blog").all()
);

// Bind the first document to the `article` property
const article = computed(() =>
  documents.value.length > 0 ? documents.value[0] : null
);
</script>

<template>
  <div>
    <figure class="grid-container reveal">
      <NuxtLink class="gallery-item" :to="`/blog/${article.slug}`">
        <Icon
          v-if="article.flag"
          :name="`flag:${article.flag}-4x3`"
          class="note flag"
        />

        <div class="gallery-item-caption">
          <i aria-hidden="true" :class="`bubble pi pi-${article.icon}`"></i>
        </div>

        <img
          :src="`https://cdn.slavic.media/img/${article.thumbnail}/fit=contain,height=600`"
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
          }}<NuxtLink :to="`/blog/${article.slug}`">more</NuxtLink>
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
img:hover {
  filter: saturate(0);
  transition: var(--transition-1);
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

  @media only screen and (max-width: 600px) {
    aspect-ratio: 16 / 10;
    height: auto;
    width: 100%;
  }
}
</style>
