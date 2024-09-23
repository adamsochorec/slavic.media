<script setup>
import { ref, onMounted } from "vue";
import todocrud from "../modules/todocrud";
const { state, getAllDocuments } = todocrud();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllDocuments();
  isDataLoaded.value = true;
});

const home = ref({
  icon: "pi pi-home",
});
const items = ref([
  { label: "Electronics" },
  { label: "Computer" },
  { label: "Accessories" },
  { label: "Keyboard" },
  { label: "Wireless" },
]);
</script>

<template>
  <article class="wrapper-wide">
    <div v-if="isDataLoaded">
      <template>
        <div class="card flex justify-center">
          <Breadcrumb :home="home" :model="items" />
        </div>
      </template>

      <hr class="semi" role="separator" />

      <div
        class="wrapper-wide"
        style="
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: var(--grid-gap-3);
          margin-bottom: 4rem;
        "
      >
        <router-link
          v-for="article in state.articles"
          :key="article._id"
          :to="`/blog/${article.id}`"
          :class="{ 'article-item': true }"
        >
          <Card class="card" role="region">
            <template #header>
              <img :alt="article.title" :src="article.metadata.thumbnail" />
            </template>
            <template #title>
              <span class="p-0">{{ article.title }}</span>
            </template>
            <template #content>
              <div class="flex items-center gap-2">
                <Avatar
                  :image="article.author.thumbnail"
                  size="large"
                  shape="circle"
                />
                <div>
                  <a :href="article.author.url" class="font-bold">{{
                    article.author.name
                  }}</a
                  ><br />
                  <span style="font-size: var(--font-size-7)">
                    {{ article.metadata.date }}&nbsp;⋅&nbsp;{{
                      article.metadata.lenght
                    }}
                    min read</span
                  >
                </div>
              </div>
            </template>
          </Card>
        </router-link>
      </div>
    </div>
    <div v-else>
      <Skeleton width="5rem" class="mb-2"></Skeleton>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card {
  border-radius: var(--border-radius-1);
  width: 100%;
  overflow: hidden;
  height: auto;
  box-shadow: var(--box-shadow-1);
}
.card img {
  aspect-ratio: 3/4;
  height: 200px;
  object-fit: cover;
}
</style>
