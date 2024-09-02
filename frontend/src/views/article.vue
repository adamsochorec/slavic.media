<script setup>
import { ref, onMounted, watch } from "vue";
import todocrud from "../modules/todocrud";
import Chip from "primevue/chip";
import Divider from "primevue/divider";
import Breadcrumb from "primevue/breadcrumb";
import Skeleton from "primevue/skeleton";

// Destructure methods and state from todocrud
const { getSpecificDocument, article, documentID } = todocrud();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getSpecificDocument(documentID.value);
  isDataLoaded.value = true;
});

const home = ref({
  icon: "pi pi-home",
  route: "/",
});
const items = ref([{ label: article.value.title }]);

watch(
  () => article.value.title,
  (newTitle) => {
    items.value = [{ label: "Blog", route: "./" }, { label: newTitle }];
  }
);
</script>

<template>
  <article class="wrapper-standard">
    <div v-if="isDataLoaded">
      <Breadcrumb :home="home" :model="items">
        <template v-slot:default>
          <a>
            <span class="text-surface-700 dark:text-surface-0">{{
              item.label
            }}</span>
          </a>
        </template>
      </Breadcrumb>
      <h1>{{ article.title }}</h1>
      <img
        :src="article.metadata.thumbnail"
        style="
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: var(--border-radius-1);
        "
      />
      <Chip
        v-for="(keyword, index) in article.metadata.keywords"
        :key="index"
        :label="keyword"
      />

      <Chip :label="article.author.name" :image="article.author.thumbnail" />
      <Divider align="center" type="solid">
        <span
          style="color: rgb(var(--white-color)); font-size: var(--font-size-8)"
          >Date posted: {{ article.date }}</span
        >
      </Divider>
    </div>
    <div
      v-else
      class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 shadow-lg mb-4 p-8"
    >
      <div class="flex mb-4">
        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
        <div>
          <Skeleton width="10rem" class="mb-2"></Skeleton>
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height=".5rem"></Skeleton>
        </div>
      </div>
      <Skeleton width="100%" height="150px"></Skeleton>
      <div class="flex justify-between mt-4">
        <Skeleton width="4rem" height="2rem"></Skeleton>
        <Skeleton width="4rem" height="2rem"></Skeleton>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped></style>
