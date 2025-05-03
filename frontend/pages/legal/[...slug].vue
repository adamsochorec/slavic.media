<script setup lang="ts">
import { ddmmmyyyy } from "@/composables/useDateFormat";

// Content hydration
const slug = useRoute().params.slug;
const { data: document } = await useAsyncData(`legal-${slug}`, () => {
  return queryCollection("legal").path(`/legal/${slug}`).first();
});
</script>
<template>
  <Head>
    <Title>{{ document?.title }}</Title>
    <Meta name="ogTitle" :content="document?.title" />
    <Meta name="description" :content="document?.description" />
    <Meta name="ogDescription" :content="document?.description" />
    <Meta
      name="ogImage"
      content="https://cdn.slavic.media/img/2024-12-08-01324-2/sd"
    />
  </Head>
  <main>
    <section class="cover">
      <div class="filter"></div>
      <img :src="`https://cdn.slavic.media/img/2024-12-08-01324-2/public`" />
      <div class="title reveal">
        <h1 class="reveal" role="heading" aria-level="1">
          {{ document?.title }}
        </h1>
        <Label icon="pi pi-replay" :label="ddmmmyyyy(document.date)"></Label>
      </div>
    </section>
    <section
      class="wrapper-standard"
      role="region"
      aria-label="Main Article Content"
    >
      <hr class="semi" />
      <p class="reveal">{{ document?.description }}</p>
      <hr class="reveal" />
      <ContentRenderer :value="document" class="article-content reveal" />
    </section>
  </main>
</template>
