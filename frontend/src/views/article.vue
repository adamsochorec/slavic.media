<script setup>
import { ref, onMounted } from "vue";
import todocrud from "../modules/todocrud";

// Destructure methods and state from todocrud
const { getSpecificDocument, article, documentID } = todocrud();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getSpecificDocument(documentID.value);
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="wrapper-standard">
    <div v-if="isDataLoaded">
      <img
        :src="article.metadata.thumbnail"
        style="
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: var(--border-radius-1);
        "
      />
      <h1>{{ article.title }}</h1>
      <Card class="card" role="region">
        <template #content>
          <div class="flex items-center justify-between gap-2">
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
            <div class="flex items-center gap-3">
              <a :href="article.metadata.linkedin" class="pi pi-linkedin"></a>
              <a href="article.metadata.facebook" class="pi pi-facebook"></a>
              <Button
                class="cta"
                type="button"
                label="Share"
                icon="pi pi-share-alt"
              />
            </div>
          </div>
        </template>
      </Card>

      <p class="article reveal">{{ article.content.text[0] }}</p>
      <img :src="article.content.img[0]" />
      <p class="img-desc">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>
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

<style lang="scss" scoped>
p.article {
  margin: var(--grid-gap-3) 0;
}
p.img-desc {
  font-size: var(--font-size-8);
  text-align: center;
  margin: var(--grid-gap-1) 0;
}
</style>
