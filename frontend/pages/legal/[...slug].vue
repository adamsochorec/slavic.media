<script setup lang="ts">
import { ddmmmyyyy } from "@/composables/useDateFormat";

// Content hydration
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`legal-${slug}`, () => {
  return queryCollection("legal").path(`/legal/${slug}`).first();
});
</script>
<template>
  <Head>
    <Title>{{ post?.title }}</Title>
    <Meta name="ogTitle" :content="post?.title" />
    <Meta name="description" :content="post?.description" />
    <Meta name="ogDescription" :content="post?.description" />
    <Meta
      name="ogImage"
      content="https://cdn.slavic.media/img/2024-12-08-01324-2/sd"
    />
  </Head>
  <article class="main">
    <section class="cover">
      <div class="filter"></div>
      <img :src="`https://cdn.slavic.media/img/2024-12-08-01324-2/public`" />
      <div class="title reveal">
        <h1 class="reveal" role="heading" aria-level="1">
          {{ post?.title }}
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
      <p class="reveal">{{ post?.description }}</p>
      <hr class="reveal" />
      <ContentRenderer :value="post" class="article-content reveal" />
    </section>
  </article>
</template>
