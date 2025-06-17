<script setup lang="ts">
import { watchEffect } from "vue";
import { ddmmmyyyy } from "@/composables/useDateFormat";
import { useProgressiveImg } from "@/composables/useProgressiveImg";

// Content hydration
const slug = useRoute().params.slug;
const { data: document } = await useAsyncData(`legal-${slug}`, () => {
  return queryCollection("legal").path(`/legal/${slug}`).first();
});

const { data } = await useAsyncData("surround", () => {
  return queryCollectionItemSurroundings("legal", `/legal/${slug}`, {
    fields: ["title", "path", "description"],
  }).order("date", "DESC");
});
// SEO META (reactive)
watchEffect(() => {
  useSeoMeta(
    {
      title: document.value?.title,
      description: document.value?.description,
      ogTitle: document.value?.title,
      ogDescription: document.value?.description,
      ogImage: "https://cdn.slavic.media/img/2024-12-08-01324-2/SD",
      ogUrl: `https://slavic.media/legal/${document.value?.slug}`,
      twitterTitle: document.value?.title,
      twitterDescription: document.value?.description,
      twitterImage: "https://cdn.slavic.media/img/2024-12-08-01324-2/SD",
      twitterCard: "summary",
    },
    { priority: 1 }
  );
});

// Progressive cover image
const { thumbnailUrl, fullImageUrl, updateImgSrc } = useProgressiveImg(
  "2024-12-08-01324-2",
  "/4K"
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
        <Label icon="replay" :label="ddmmmyyyy(document.date)"></Label>
      </div>
    </section>
    <section
      class="wrapper-wide content"
      role="region"
      aria-label="Main Article Content"
    >
      <hr class="semi" />
      <ContentRenderer :value="document" class="rendered-content reveal" />
      <hr />

      <div class="gallery">
        <LinkCard
          v-if="data?.[0]"
          :url="data[0].path"
          :title="data[0].title"
          icon="arrow-left"
          :description="data[0].description"
        />
        <LinkCard
          style="text-align: right"
          v-if="data?.[1]"
          :url="data[1].path"
          :title="data[1].title"
          :description="data[1].description"
          icon="arrow-right"
        />
      </div>
    </section>
  </main>
</template>
<style lang="postcss" scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: var(--grid-gap-2);
  padding-bottom: var(--grid-gap-3);
  margin-bottom: -var(--grid-gap-3);

  @media only screen and (min-width: 690px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
