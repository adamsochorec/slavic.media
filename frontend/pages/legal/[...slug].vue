<script setup lang="ts">
import { ddmmmyyyy } from "@/composables/useDateFormat";

// Content hydration from blog colletion
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`legal-${slug}`, () => {
  return queryCollection("legal").path(`/legal/${slug}`).first();
});
</script>
<template>
  <article class="main">
    <section class="cover">
      <div class="filter"></div>
      <img :src="`https://cdn.slavic.media/img/2024-12-08-01324-2/public`" />
      <div class="title reveal">
        <h1 class="reveal" role="heading" aria-level="1">
          {{ post.title }}
        </h1>
        <Label icon="pi pi-replay" :label="ddmmmyyyy(post.date)"></Label>
      </div>
    </section>
    <section
      class="wrapper-standard"
      role="region"
      aria-label="Main Article Content"
    >
      <hr class="semi" />
      <ContentRenderer :value="post" class="article-content legal reveal" />
    </section>
  </article>
</template>
<style lang="scss" scoped>
@media only screen and (max-width: 400px) {
  .cover,
  .filter {
    height: 400px;
  }
}
</style>
