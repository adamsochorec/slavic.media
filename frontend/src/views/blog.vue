<script setup>
import { ref, onMounted } from "vue";
import article from "@/modules/article";
import blogCard from "@/components/blog-card.vue";

const { state, getAllArticles } = article();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllArticles();
  isDataLoaded.value = true;
});

// Method to truncate text
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
</script>

<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-wide">
      <div v-if="isDataLoaded">
        <h1 class="reveal">The Slavic Media Blog</h1>
        <hr class="quater reveal" />
        <div class="grid-container">
          <div
            v-for="article in state.articles"
            :key="article._id"
            role="region"
          >
            <blogCard :article="article"></blogCard>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="grid-container">
          <div v-for="n in 6" :key="n" class="card">
            <Skeleton
              style="background-color: rgb(var(--dark-grey-color))"
              class="p-6"
              width="100%"
              height="130px"
            ></Skeleton>
            <div>
              <Skeleton
                width="80%"
                height="10px"
                style="background-color: rgb(var(--dark-grey-color))"
                class="mt-2"
              ></Skeleton>
              <Skeleton
                width="60%"
                style="background-color: rgb(var(--dark-grey-color))"
                class="mt-2"
                height="10px"
              ></Skeleton>
              <div class="flex mt-4">
                <Skeleton
                  style="background-color: rgb(var(--dark-grey-color))"
                  class="mr-2 skeleton-hide"
                  shape="circle"
                  size="4rem"
                ></Skeleton>
                <div>
                  <Skeleton
                    width="10rem"
                    height="10px"
                    style="background-color: rgb(var(--dark-grey-color))"
                    class="mb-2"
                  ></Skeleton>
                  <Skeleton
                    width="5rem"
                    style="background-color: rgb(var(--dark-grey-color))"
                    class="mb-2"
                    height="10px"
                  ></Skeleton>
                  <Skeleton
                    style="background-color: rgb(var(--dark-grey-color))"
                    class=""
                    height="10px"
                  ></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
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
@media only screen and (min-width: 400px) {
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
