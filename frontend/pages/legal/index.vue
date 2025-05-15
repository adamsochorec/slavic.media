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

// Progressive cover image
const { thumbnailUrl, fullImageUrl, updateImgSrc } = useProgressiveImg(
  "2024-12-08-01324-2",
  "/public"
);
</script>

<template>
  <main>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="ogTitle" :content="title" />
      <Meta name="description" :content="description" />
      <Meta name="ogDescription" :content="description" />
      <Meta
        name="ogImage"
        content="https://cdn.slavic.media/img/2024-12-08-01324-2/sd"
      />
    </Head>
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
