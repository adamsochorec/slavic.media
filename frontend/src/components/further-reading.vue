<script setup>
const props = defineProps({
  isDataLoaded: Boolean,
  state: Object,
  articlesToShow: Number,
  loadMoreArticles: Function,
});
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
          v-for="article in state.furtherReading.slice(0, articlesToShow)"
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
        v-if="articlesToShow < state.furtherReading.length"
        @click="loadMoreArticles"
        class="cta reveal"
      >
        Show More
      </button>
    </div>
  </section>
</template>
<style scoped>
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
