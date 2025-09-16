<script setup lang="ts">
import { useProgressiveImg } from "@/composables/useProgressiveImg";

// Meta SEO
const title = "Legal";
const description =
  "Before using Slavic Media services or digital products, you may review the terms and conditions of end user software license agreements.";

// Content hydration
const { data: documents } = await useAsyncData("legal", () =>
  queryCollection("legal").all()
);

// SEO META
useSeoMeta(
  {
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    ogImage: "https://cdn.slavic.media/img/20250711_SLAVIC-MEDIA3231/SD",
    ogUrl: "https://slavic.media/legal",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: "https://cdn.slavic.media/img/20250711_SLAVIC-MEDIA3231/SD",
    twitterCard: "summary",
  },
  { priority: 1 }
);

// Progressive cover image
const { thumbnailUrl, fullImageUrl, updateImgSrc } = useProgressiveImg(
  "20250711_SLAVIC-MEDIA3231",
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
      <div class="title reveal">
        <h1 class="reveal" role="heading" aria-level="1">Legal</h1>
      </div>
    </section>
    <section
      class="wrapper-standard"
      role="region"
      aria-label="Main Article Content"
    >
      <hr class="semi" />
      <p class="reveal">
        {{ description }}
      </p>
      <br />
      <ol class="reveal">
        <li v-for="document in documents" :key="document.slug">
          <NuxtLink :href="`/legal/${document.slug}`">{{
            document.title
          }}</NuxtLink>
        </li>
      </ol>
    </section>
  </main>
</template>
