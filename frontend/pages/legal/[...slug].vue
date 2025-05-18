<script setup lang="ts">
import { watchEffect } from "vue";
import { ddmmmyyyy } from "@/composables/useDateFormat";
import { useProgressiveImg } from "@/composables/useProgressiveImg";

// Content hydration
const slug = useRoute().params.slug;
const { data: document } = await useAsyncData(`legal-${slug}`, () => {
  return queryCollection("legal").path(`/legal/${slug}`).first();
});

// SEO META (reactive)
watchEffect(() => {
  useSeoMeta(
    {
      title: document.value?.title,
      description: document.value?.description,
      ogTitle: document.value?.title,
      ogDescription: document.value?.description,
      ogImage: "https://cdn.slavic.media/img/2024-12-08-01324-2/sd",
      ogUrl: `https://slavic.media/legal/${document.value?.slug}`,
      twitterTitle: document.value?.title,
      twitterDescription: document.value?.description,
      twitterImage: "https://cdn.slavic.media/img/2024-12-08-01324-2/sd",
      twitterCard: "summary",
    },
    { priority: 1 }
  );
});

// Progressive cover image
const { thumbnailUrl, fullImageUrl, updateImgSrc } = useProgressiveImg(
  "2024-12-08-01324-2",
  "/public"
);
</script>
<template>
  <main>
    <section class="cover">
      <div class="filter"></div>
      <img
        :src="thumbnailUrl"
        :data-src="fullImageUrl"
        @load="updateImgSrc"
        alt="Legal cover"
      />
      <div class="title flex-center reveal">
        <h1
          class="reveal"
          role="heading"
          aria-level="1"
          style="margin-bottom: var(--grid-gap-1)"
        >
          {{ document?.title }}
        </h1>
        <Label icon="pi pi-replay" :label="ddmmmyyyy(document.date)"></Label>
      </div>
    </section>
    <section
      class="wrapper-wide content"
      role="region"
      aria-label="Main Article Content"
    >
      <hr class="semi" />
      <ContentRenderer :value="document" class="rendered-content reveal" />
    </section>
  </main>
</template>
