<script setup lang="ts">
import { ref, watch } from "vue";
import { useShowMore } from "@/functions/show-more";

const props = defineProps({
  isDataLoaded: Boolean,
  state: Object,
  articlesToShow: Number,
  loadMoreArticles: Function,
});

const { itemsToShow, allItemsShown, loadMoreItems, showLessItems } =
  useShowMore(4);

watch(
  () => props.articlesToShow,
  (newVal) => {
    itemsToShow.value = newVal;
  }
);
</script>

<template>
  <section
    class="wrapper-standard"
    role="region"
    aria-labelledby="further-reading-title"
  >
    <div v-if="isDataLoaded" aria-busy="false">
      <hr class="semi" />
      <h2 id="further-reading-title" class="reveal">
        More from
        <router-link to="/blog" class="gradient"
          >Slavic&nbsp;Media&nbsp;</router-link
        >Blog
      </h2>
      <hr class="quater reveal" />
      <div class="grid-container">
        <div
          v-for="article in props.state.furtherReading.slice(0, itemsToShow)"
          :key="article._id"
          role="article"
          aria-labelledby="article-{{ article._id }}-title"
        >
          <blogCard
            :article="article"
            id="article-{{ article._id }}-title"
          ></blogCard>
        </div>
      </div>
    </div>
    <div class="flex-center">
      <button
        v-if="!allItemsShown"
        @click="loadMoreItems(props.state.furtherReading.length)"
        class="cta reveal"
      >
        Show More
      </button>
      <button v-else @click="showLessItems" class="cta reveal">
        Show Less
      </button>
    </div>
  </section>
</template>

<style scoped>
a,
a:hover {
  -webkit-box-shadow: none;
  box-shadow: none;
}
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
@media only screen and (min-width: 400px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
