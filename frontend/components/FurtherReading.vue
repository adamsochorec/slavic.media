<script setup lang="ts">
import { ref, computed } from "vue";
import { useLoadMore } from "@/composables/useLoadMore";

// Props
const { excludeSlug } = defineProps({
  excludeSlug: {
    type: String,
    required: true,
  },
});

// Content hydration
const { data: documents = ref([]) } = await useAsyncData("blog", () =>
  queryCollection("blog").order("date", "DESC").all()
);

// Filter out the current article
const filteredDocuments = computed(() =>
  documents.value.filter((article) => article.slug !== excludeSlug)
);

// LOAD MORE
const { itemsToShow, allItemsShown, loadMore, loadLess } = useLoadMore(2, 4);
</script>

<template>
  <section
    class="wrapper-standard"
    role="region"
    aria-labelledby="further-reading-title"
  >
    <div v-if="filteredDocuments.length" aria-busy="false">
      <hr class="semi" />
      <h2 id="further-reading-title" class="docs reveal">
        More from
        <NuxtLink to="/blog" class="gradient">Slavic&nbsp;Media&nbsp;</NuxtLink
        >Blog
      </h2>
      <div class="grid-container">
        <figure
          v-for="article in filteredDocuments.slice(0, itemsToShow)"
          :key="article.slug"
          role="article"
          aria-labelledby="article-{{ article.slug }}-title"
        >
          <BlogCard
            :article="article"
            id="article-{{ article.slug }}-title"
          ></BlogCard>
        </figure>
      </div>
      <div class="flex-center">
        <Button
          tag="button"
          v-if="!allItemsShown"
          label="Show more"
          icon="plus-circle"
          variant="secondary"
          @click="loadMore(filteredDocuments.length)"
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
    </div>
  </section>
</template>

<style scoped lang="postcss">
a,
a:hover {
  box-shadow: none;
}
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

  @media only screen and (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
